"""twitter api"""
from searchengine.tools.request_tool import requests_post, requests_get

ENDPOINT = 'https://api.twitter.com/1.1/'
BEAR_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAKkOAwEAAAAAUFsf81T0aW%2BKRN1qfcHt%2Bx1NRtg%3DnTRuD2dcB83VQM2hsb4O7yUQa0RQFwc2UcSL9PU6StBQSxIjtC'

def get_tweets(query, count=100):
    """get tweets api"""
    headers = {
        'Authorization': f'Bearer {BEAR_TOKEN}'
    }

    ## premium search API
    # path = 'tweets/search/fullarchive/dev.json'
    # path = 'tweets/search/30day/dev.json'
    # params = {
    #     'query': f'{query} -is:retweet -is:reply',
    #     'maxResults': count,
    #     # 'fromDate': '',
    #     # 'toDate': ''
    # }
    # url = f'{ENDPOINT}{path}'
    # res = requests_post(url, payload=params, headers=headers, is_json=True)


    ## standard search API
    path = 'search/tweets.json'
    params = {
        'q': f'{query} -filter:retweets -filter:replies',
        'count': count,
    }

    url = f'{ENDPOINT}{path}'
    res = requests_get(url, payload=params, headers=headers)
    return validate_response(res)

def validate_response(response):
    """validate fb response"""
    # if not response:
    #     raise FacebookError(msg="None response", code=ERROR_FACEBOOK_API)
    # elif 'error' in response:
    #     raise FacebookError(
    #         msg="Facebook error %s" % response['error'],
    #         code=ERROR_FACEBOOK_API,
    #         data=response['error'])
    result = response.get('result')
    # if not result or 'error' in result:
    #     if result['error']['code'] == 190:
    #         raise FacebookError(
    #             msg="fb token invalid", code=ERROR_FB_TOKEN_INVALID,
    #             data=result['error'])
    #     elif result['error']['code'] == 613:
    #         raise FacebookError(
    #             msg="fb rate limit exceeded", code=ERROR_FB_EXCEED_RATE_LIMIT,
    #             data=result['error'])
    #     raise FacebookError(
    #         msg="fb error: %s" % result['error']['message'],
    #         code=ERROR_FACEBOOK_API,
    #         data=result['error'])
    return result
