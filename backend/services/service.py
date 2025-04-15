from models.SalesRepSearch import SalesRepSearch

#Public methods
def get_single_sales_rep(data:dict, fail_data:dict, id:int):
    for salesRep in data["salesReps"]:
        if salesRep.get('id') == id:
            return salesRep
    return fail_data

def get_filtered_sales_reps(data:dict, body:SalesRepSearch):
    result_array = []
    has_min = body.minValue is not None
    has_max = body.maxValue is not None
    min_only = has_min and not has_max
    max_only = has_max and not has_min
    min_max = has_min and has_max

    for salesRep in data["salesReps"]:

        # Check each conditions. If it matches, then put it in array
        if __match_exact(salesRep, body, 'region'):
            result_array.append(salesRep)
            continue

        if __match_exact(salesRep, body, 'role'):
            result_array.append(salesRep)
            continue

        if __match_contain(salesRep, body, 'name'):
            result_array.append(salesRep)
            continue

        if __check_inner_json_match(salesRep, body, 'activeClient', 'deals', 'client'):
            result_array.append(salesRep)
            continue

        if __check_inner_json_match(salesRep, body, 'pastClient', 'clients', 'name'):
            result_array.append(salesRep)
            continue

        if __check_inner_json_match(salesRep, body, 'industry', 'clients', 'industry'):
            result_array.append(salesRep)
            continue

        if (has_min or has_max) and __check_value_in_range(salesRep, body, min_only, max_only, min_max):
            result_array.append(salesRep)
            continue

    return {"salesReps": result_array}


#Private methods
def __match_exact(data, search_filter, key):
    # Get the value from search_filter based on the key
    value = getattr(search_filter, key, None)
    if value is not None:
        # Check if the value is the same with the key within the data
        return data.get(key) == value
    return False


def __match_contain(data, search_filter, key):
    # Get the value from search_filter based on the key
    filter_value = getattr(search_filter, key, None)
    data_value = data.get(key)

    if filter_value is not None and data_value is not None:
        # Check if the value in data contains the value from search_filter (case-insensitive)
        return filter_value.lower() in data_value.lower()
    return False


def __check_inner_json_match(data, search_filter, search_filter_key, data_key_1, data_key_2):
    value = getattr(search_filter, search_filter_key, None)
    if value is not None:
        for item in data.get(data_key_1):
            if item.get(data_key_2) == value:
                return True
    return False


def __check_value_in_range(data, search_filter, min_only, max_only, min_max):
    for item in data.get('deals'):
        if min_only:
            search_value = getattr(search_filter,'minValue')
            if int(item.get('value')) > int(search_value):
                return True
        elif max_only:
            search_value = getattr(search_filter, 'maxValue')
            if int(item.get('value')) > int(search_value):
                return True
        elif min_max:
            search_min_value = getattr(search_filter,'minValue')
            search_max_value = getattr(search_filter, 'maxValue')
            if int(search_min_value) < int(item.get('value')) < int(search_max_value):
                return True

    return False
