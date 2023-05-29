from django.urls import path

from .views import RepositoryView, CommitView

app_name = 'repositories'

COMMITS_URL = "api/commits/"
REPOSITORY_URL = "api/repositories/"

urlpatterns = [
    path(COMMITS_URL, CommitView.as_view(), name='commits-list'),
    path(REPOSITORY_URL, RepositoryView.as_view(), name='repositories-create'),
]
