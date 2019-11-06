from django.urls import path

from . import views

urlpatterns = [
    path('tweets', views.get_tweets, name='search'),
]
