
def get_with_default(value, default):
    if default is None:
        return value
    elif value is None:
        return default
    elif isinstance(value, int) or isinstance(value, float):
        return value
    else:
        return value or default

def filter_dict(data, keys, default_value=None):
    """filter dict"""
    if not isinstance(data, dict):
        return data
    if default_value is None:
        return dict((key, data.get(key)) for key in keys)
    return dict((key, get_with_default(data.get(key), default_value)) for key in keys)

def filter_dict_list(data_list, keys, default_value=None):
    """filter dict list"""
    return [filter_dict(data, keys, default_value) for data in data_list]
