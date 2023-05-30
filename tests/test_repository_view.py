from django.test import TestCase
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

from repositories.models import Commit, Repository
from repositories.serializers import CommitSerializer, RepositorySerializer
from services.github import GithubService
from django.shortcuts import redirect
from django.contrib.auth import logout as django_logout
from social_django.utils import psa
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from django_filters import rest_framework as filters
from django.contrib.auth.models import User
from repositories.filters import CommitFilter
from rest_framework.test import APIClient
import json


class RepositoryViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', password='test_password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_all_repositories(self):
        repo = Repository.objects.create(name="test-repo")
        response = self.client.get("/api/repositories/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], "test-repo")

    def test_get_repository_by_id(self):
        repo = Repository.objects.create(name='test-repo')
        response = self.client.get(f'/api/repositories/?repository_id={repo.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data[0]['name'], 'test-repo')
