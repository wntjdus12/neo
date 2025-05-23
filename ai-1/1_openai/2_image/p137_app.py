import openai

image_file = open('image.png', 'rb')
mask_file = open('image.png', 'rb')

image = image_file.read()
mask = mask_file.read()

response = openai.Image.create_edit(
    image=("image.png", image_file, "image/png"),
    mask=("mask.png", mask_file, "image/png"),
    prompt='many apples in cardboard box',
    n=1,
    size="512x512",
)

image_url = response['data'][0]['url']
print(image_url)