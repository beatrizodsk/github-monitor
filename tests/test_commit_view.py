from rest_framework import status
from rest_framework.test import APITestCase
from repositories.models import Commit, Repository
from repositories.serializers import CommitSerializer
from django.utils import timezone
from django.contrib.auth.models import User

class CommitViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', password='test_password')
        self.client.force_authenticate(user=self.user)
        self.repository = Repository.objects.create(name='test_repo')
        self.commit = Commit.objects.create(repository=self.repository, author='user1', message='Test commit', date=timezone.now())

    def test_get_commits(self):
        response = self.client.get('/api/commits/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['commits']), 1)
        expected_data = CommitSerializer(self.commit).data
        self.assertEqual(response.data['commits'][0], expected_data)

    def test_get_commits_with_filters(self):
        response = self.client.get('/api/commits/?repository=test_repo&author=user1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['commits']), 1)
        expected_data = CommitSerializer(self.commit).data
        self.assertEqual(response.data['commits'][0], expected_data)
