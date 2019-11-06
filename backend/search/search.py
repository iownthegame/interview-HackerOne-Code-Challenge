import logging

from . import twitter_api
from searchengine.tools.common_tool import filter_dict_list

LOGGER = logging.getLogger(__name__)

def get_tweets(params):

    query = params.get('query')
    count = params.get('count')

    result = twitter_api.get_tweets(query, count)

    # process results
    results = result.get('statuses', [])
    # results = result.get('results', [])
    # next = result.get('next', '')

    # count hashtags
    hashtag_table = {}
    for data in results:
        entities = data.get('entities', {})
        hashtags = entities.get('hashtags', [])
        _process_hashtag(hashtags, hashtag_table)

    res = {
        'count': len(results),
        # 'next': next,
        'hashtags': sorted(hashtag_table.items(), key=lambda kv: kv[1], reverse=True)[:10],
        # 'results': filter_dict_list(results, ['text', 'source']),
        'results': results
    }

    return res


def _process_hashtag(hashtags, hashtag_table):
    for tag in hashtags:
        text = tag.get('text')
        if text in hashtag_table:
            hashtag_table[text] += 1
        else:
            hashtag_table[text] = 1
