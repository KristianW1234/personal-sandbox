from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.data import DOC_DESCRIPTION

from controllers import controller

import uvicorn

app = FastAPI(
    title="Kristian Application App",
    summary="For job application to InterOpera",
    description=DOC_DESCRIPTION

    ,
    version="0.0.1",
    contact={
        "name": "Kristian",
        "email": "kristian.wijaya1234@gmail.com"
    }
)

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(controller.router, prefix='/api')



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
