import requests
import json
from repositories.serializers import GithubCommitSerializer, CommitSerializer
from repositories.models import Repository, Commit
from social_django.models import UserSocialAuth
import datetime

class GithubService:

    def __init__(self):
        self.BASE_URL = 'https://api.github.com'

    def set_access_token(self, username):
        social_user_data = UserSocialAuth.objects.get(user__username=username)

        self.headers = {
            'Authorization': f'token {social_user_data.extra_data["access_token"]}'
        }


    def get_commits_from_repo(self, user, repo_name):
        # testar tudo aqui se dá erro -> descomentar isAuthenticated nas views
        self.set_access_token(user)

        last_30_days = datetime.date.today() - datetime.timedelta(30)

        commits = requests.get(
            f"{self.BASE_URL}/repos/{user}/{repo_name}/commits?since={last_30_days.isoformat()}&until={datetime.date.today()}", headers=self.headers).json()

        repo = Repository.objects.get(name=repo_name)

        commits_to_save = []

        for commit_data in commits:
            commit_object = Commit(
                message=commit_data['commit']['message'],
                sha=commit_data['sha'],
                author=commit_data['commit']['author']['name'],
                url=commit_data['url'],
                avatar=commit_data['author']['avatar_url'],
                date=commit_data['commit']['author']['date'],
                repository=repo
            )
            commits_to_save.append(commit_object)
            commit_object.save()

        return commits_to_save

    def repo_exists(self, user, repo_name):
        
        self.set_access_token(user)

        return requests.get(f"{self.BASE_URL}/repos/{user}/{repo_name}", headers=self.headers).status_code != 404