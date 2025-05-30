import requests
import os
import textwrap

def summarize_contents(contents_url, target_lanuage):
    KAGI_API_KEY = os.environ["KAGI_API_KEY"]

    api_url = "https://kagi.com/api/v0/summarize"
    headers = {"Authorization": "Bot " + KAGI_API_KEY}
    prameters = {"url": contents_url, "target_language": target_lanuage}

    response = requests.get(api_url, headers=headers, params=prameters)

    summary = response.json()['data']['output']
    return summary

contents_url = 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc'
target_lanuage = 'KO'

try:
    summary = summarize_contents(contents_url, target_lanuage)
    print('[콘텐츠 URL] ', contents_url)
    print('- 요약 내용(축약) : ', textwrap.shorten(summary, width=150, placeholder=' [...이하 생략...] '))
except:
    print("해당 URL의 내용을 요약하지 못했습니다. 다시 시도해 주세요.")

