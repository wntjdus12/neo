from openai import OpenAI
client = OpenAI()

while(1):
    prompt = input("서연 : ")
    if prompt == 'quit' or prompt == 'q' or prompt == 'exit' or prompt == 'ㅂ':
        break
    else:
        response = client.chat.completions.create(
            model = 'gpt-3.5-turbo',
            messages = [
                {'role': 'user', 'content': prompt}
            ]
        )

        print("앤톤 : " + response.choices[0].message.content.strip())
        print()