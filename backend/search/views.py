"""views for search"""
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from searchengine.tools.request_tool import make_response
from . import search

@api_view(['GET'])
@permission_classes([])
def get_tweets(request):
    """get tweets"""
    params = {
        'query': request.GET.get('query'),
        'count': request.GET.get('count')
    }
    return_json = search.get_tweets(params)
    return JsonResponse(make_response(result=return_json))
