import os
from langchain.agents import load_tools
from langchain.chat_models import ChatOpenAI
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.agents import initialize_agent

google_cse_id = os.environ.get("GOOGLE_CSE_ID")
google_api_id = os.environ.get("GOOGLE_API_KEY")

tools = load_tools(
    tool_names = ["google-search"],
    llm = ChatOpenAI(
            model = "gpt-3.5-turbo",
            temperature = 0
        )
    )

memory = ConversationBufferMemory(
    memory_key = "chat_history",
    return_messages = True,
)

agent = initialize_agent(
    agent = "zero-shot-react-description",
    llm = ChatOpenAI(
        model = "gpt-3.5-turbo",
        temperature = 0
    ),
    tools = tools,
    verbose = True,
    memory = memory
)

print(agent.run("좋은 아침입니다."))
print('-' * 50)

print(agent.run("우리집 반려견 이름은 보리입니다."))
print('-' * 50)

print(agent.run("오늘 한국 서울의 날씨를 웹 검색으로 확인하세요."))
print('-' * 50)