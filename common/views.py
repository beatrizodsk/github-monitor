from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from rest_framework.views import APIView

from services.github import GithubService
from django.shortcuts import redirect
from django.contrib.auth import logout as django_logout
from social_django.utils import psa


class LoginView(generic.TemplateView):
    template_name = "common/login.html"


class HomeView(LoginRequiredMixin, generic.TemplateView):
    template_name = "common/index.html"