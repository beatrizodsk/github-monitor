from django.contrib.auth.views import LogoutView
from django.urls import path

from .views import HomeView, LoginView

app_name = 'common'

urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('home', HomeView.as_view(), name='home'),
    path('home/<repo>', HomeView.as_view(), name='home'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
]