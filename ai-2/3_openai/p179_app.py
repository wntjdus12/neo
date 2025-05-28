## p179_app.py

import openai 
from IPython.display import Image, display

response = openai.Image.create(
    prompt="Happy robtos playing in the playground",
    n=2,
    size="512x512"
)

for data in response['data']:
    image_url = data['url']
    print(image_url)
    display(Image(url=image_url))
    print('-' * 50)

    print(image_url.split("?")[0].split("/")[-1])
    print('-' * 50)