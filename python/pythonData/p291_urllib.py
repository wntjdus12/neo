import urllib.request

url = "https://shared-comic.pstatic.net/thumb/webtoon/626907/thumbnail/title_thumbnail_20150407141027_t83x90.jpg"

savename = 'p291_urldownload.jpg'

urllib.request.urlretrieve(url, savename)

print('web image : ' + url )
print(savename + ' saved')

print('-' * 50)