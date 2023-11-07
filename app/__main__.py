from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class RequestBody(BaseModel):
    a: str = 'hello'
    b: int = 5
    c: dict = {}


@app.get("/test")
async def process_get(name: str):
    return {"message": f"Hello {name}"}


@app.post("/test")
async def process_post(data: RequestBody):
    return data
