import requests, json
import pandas as pd
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import os.path

BASE_DIR = os.path.dirname(os.path.dirname(os.path.relpath('./')))
secret_file = os.path.join(BASE_DIR, '../secret.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        errorMsg = "Set the {} environment variable.".format(setting)
        return errorMsg

serviceKey = get_secret("ECOS_apiKey")

url = 'https://ecos.bok.or.kr/api/StatisticSearch/' + serviceKey + '/json/kr/1/1000/731Y004/M/202301/202403/0000001'

response = requests.get(url)
contents = response.text

dict = json.loads(contents)
items = dict['StatisticSearch']['row']

item = ['ITEM_NAME1','DATA_VALUE']

validItem = {}
for i in items:
    if i['ITEM_NAME2'] == '평균자료':
        key = i['TIME']
        filtered = {k: i[k] for k in item}
        validItem[key] = filtered

print(len(validItem))
print(validItem)


# validItem = {}
# for _ in item :
#     validItem[_] = items[_]
# print(validItem)

# items = dict['items']
# print(type(items))
# print(items)
# print('-' * 50)

# df = pd.DataFrame(items).rename(index={0:'result'}).T
# print(type(df))
# print(df)
# print('-' * 50)

# data = df.loc[['gPntCnt','hPntCnt','accExamCnt','statusDt']]
# print(type(data))
# print(data)
# print('-' * 50)