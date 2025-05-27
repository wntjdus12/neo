from langchain.llms import OpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

llm = OpenAI(
    model = 'gpt-3.5-turbo-instruct',
    temperature = 0,
    streaming = True,
    callbacks = [StreamingStdOutCallbackHandler()],
    verbose = True
)

res = llm("아이스바닐라라떼를 위한 노래만들어줘.")
print(res)