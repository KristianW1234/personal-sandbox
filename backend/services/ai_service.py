import cohere

import os

def ai_answer_question(body:dict):
    user_question = body.get("question", "")
    if not user_question:
        return {"error": "No question provided"}

    cohere_api_key = os.getenv("COHERE_API_KEY")
    if not cohere_api_key:
        return {"error":"Invalid API Key"}

    co = cohere.Client(cohere_api_key)



    try:
        response = co.generate(
            model="command-light",
            prompt=user_question,
            max_tokens=100,
            temperature=0.7
        )

        return {"answer": response.generations[0].text.strip()}

    except Exception as e:
        return {"error": str(e)}