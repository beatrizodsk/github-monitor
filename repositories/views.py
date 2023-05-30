from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from services.github import GithubService
from django.shortcuts import redirect
from django.contrib.auth import logout as django_logout
from social_django.utils import psa
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from django_filters import rest_framework as filters
from .filters import CommitFilter


class RepositoryView(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Repository.objects.all()

    def __init__(self):
        self.github_service = GithubService()

    def get(self, request, *args, **kwargs):
        repository_id = request.query_params.get('repository_id')

        if repository_id:
            repositories = Repository.objects.filter(id=repository_id)
        else:
            repositories = Repository.objects.all()

        data = []
        for repo in repositories:
            repo_data = RepositorySerializer(repo).data

            authors = Commit.objects.filter(repository=repo).values_list('author', flat=True)
            repo_data['authors'] = set(authors)

            data.append(repo_data)

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        repo_name = request.data.get("name")

        repo_name_already_exists = Repository.objects.filter(name=repo_name).exists()
        repo_does_not_exist_in_github = not self.github_service.repo_exists(request.user, repo_name)

        if repo_name_already_exists:
            return Response("Repository was already added.", status=status.HTTP_409_CONFLICT)
        if repo_does_not_exist_in_github:
            return Response("Repository does not exist in your Github.", status=status.HTTP_404_NOT_FOUND)

        user_data = {"username": str(request.user)}
        data = {**request.data, **user_data}

        serializer = RepositorySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        self.github_service.get_commits_from_repo(str(request.user), repo_name)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommitView(ListAPIView):
    permission_classes = [IsAuthenticated]
    commits_page_size = 10
    queryset = Commit.objects.all()
    filterset_class = CommitFilter
    serializer_class = CommitSerializer

    def get_repository(self):
        return self.kwargs.get('repository_id')

    def get(self, request, *args, **kwargs):
        repository_id = self.get_repository()
        repository_name = request.query_params.get('repository')
        page_num = request.query_params.get('page', 1)

        if repository_name:
            repository = Repository.objects.get(name=repository_name)
            repository_id = repository.id

        commits = self.get_queryset().filter(repository_id=repository_id) if repository_id else self.get_queryset()

        author = self.request.query_params.get('author')
        if author:
            commits = commits.filter(author=author)

        paginator = Paginator(commits, self.commits_page_size)

        try:
            page = paginator.page(page_num)
        except EmptyPage:
            page = paginator.page(1)

        serializer = CommitSerializer(page, many=True)

        previous_page = page.previous_page_number() if page.has_previous() else None
        next_page = page.next_page_number() if page.has_next() else None

        data_to_return = {
            "count": paginator.num_pages,
            "next": next_page,
            "previous": previous_page,
            "commits": serializer.data,
        }

        return Response(data_to_return, status=status.HTTP_200_OK)