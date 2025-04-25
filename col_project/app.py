from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests, json
from datetime import datetime
from dateutil.relativedelta import relativedelta
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.relpath("./")))
secret_file = os.path.join(BASE_DIR, '/work/neo/python/pythonData/secret.json')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open(secret_file) as f:
    secrets = json.load(f)

def get_secret(setting):
    try:
        return secrets[setting]
    except KeyError:
        raise Exception(f"Set the {setting} environment variable.")

@app.get("/api/parties")
def get_festivals(
    search_data: str = Query(None, description="검색어"),
    category: str = Query("festivals", description="카테고리 (예: festivals, concerts 등)"),
    country: str = Query(..., description="국가코드 (예: KR,US)"),
    start_date: str = Query(..., description="시작일 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="종료일 (YYYY-MM-DD)"),
    sort: str = Query("rank", description="정렬기준 (예: rank, start, end)"),
    limit: int = Query(10, description="가져올 최대 데이터 수"),
    offset: int = Query(0, description="시작 위치 (페이징 용도)")
):
    """국가별 축제 정보를 제공하는 API입니다."""

    try:
        url = 'https://api.predicthq.com/v1/events'
        headers = {
            'Authorization': f"Bearer {get_secret('Authorization')}",
            'Accept': 'application/json'
        }

        params = {
            'category': category,
            'country': country,
            'start.date': start_date,
            'end.date': end_date,
            'sort': sort,
            'limit': limit,
            'offset': offset
        }

        if search_data:
            params['q'] = search_data

        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            return {
                "resultCode": False,
                "message": f"외부 API 요청 실패 (status code: {response.status_code})"
            }

        data = response.json()

        if 'results' not in data or not data['results']:
            return {
                "resultCode": False,
                "message": "해당 조건에 맞는 축제 정보가 없습니다."
            }

        # 날짜 필터링
        start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
        end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")

        festivals = []
        for event in data['results']:
            event_start = datetime.strptime(event.get("start", ""), "%Y-%m-%dT%H:%M:%SZ")
            if start_date_obj <= event_start <= end_date_obj:
                festivals.append({
                    "id": event.get("id", "ID 없음"),
                    "title": event.get("title", "제목 없음"),
                    "description": event.get("description", "설명 없음"),
                    "category": event.get("category", "카테고리 없음"),
                    "labels": event.get("labels", []),
                    "rank": event.get("rank", "순위 없음"),
                    "timezone": event.get("timezone", "시간대 없음"),
                    "start": event.get("start", "시작일 없음"),
                    "end": event.get("end", "종료일 없음"),
                })

        if not festivals:
            return {
                "resultCode": False,
                "message": "조건에 맞는 축제 정보가 없습니다 (필터링 후 없음)."
            }

        return {
            "resultCode": True,
            "festival_count": len(festivals),
            "festivals": festivals
        }

    except Exception as e:
        return {
            "resultCode": False,
            "message": f"서버 오류: {str(e)}"
        }


@app.get("/api/holiday")
def get_holidays(
    year: int = Query(datetime.now().year, description="조회할 연도"),
    country_code: str = Query("KR", description="국가 코드 (예: KR, US, JP)")
):
    """국가별 공휴일 정보를 제공하는 API입니다."""

    try:
        url = f"https://date.nager.at/api/v3/PublicHolidays/{year}/{country_code.upper()}"

        response = requests.get(url)

        if response.status_code != 200:
            return {
                "resultCode": False,
                "message": f"외부 API 요청 실패 (status code: {response.status_code})"
            }

        holidays = response.json()

        if not holidays:
            return {
                "resultCode": False,
                "message": "해당 조건에 맞는 공휴일 정보가 없습니다."
            }

        return {
            "resultCode": True,
            "year": year,
            "country": country_code.upper(),
            "holiday_count": len(holidays),
            "holidays": holidays
        }

    except Exception as e:
        return {
            "resultCode": False,
            "message": f"서버 오류: {str(e)}"
        }
