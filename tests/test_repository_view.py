# from django.test import TestCase
# from rest_framework.test import APIClient
# from rest_framework import status
# import json


# from repositories.models import Repository
# from repositories.serializers import RepositorySerializer


# class RepositoryViewTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()

#     def test_get_all_repositories(self):
#         repo = Repository.objects.create(name="test-repo")
#         response = self.client.get("/api/repositories/")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()
#         self.assertEqual(len(data), 1)
#         self.assertEqual(data[0]["name"], "test-repo")

#     def test_get_repository_by_id(self):
#         repo = Repository.objects.create(name="test-repo")
#         response = self.client.get(f"/api/repositories/{repo.id}/")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()
#         self.assertEqual(data["name"], "test-repo")

#     def test_create_repository(self):
#         data = {"name": "test-repo-2", "username": "test-username"}
#         response = self.client.post("/api/repositories/", data=data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response["content-type"], "application/json")
#         self.assertTrue(Repository.objects.filter(name=data["name"]).exists())
