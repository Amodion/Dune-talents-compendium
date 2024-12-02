FROM python:3.12

WORKDIR /fastapi_app

COPY ./requirements.txt /fastapi_app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /fastapi_app/requirements.txt

COPY . /fastapi_app/app

CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "80"]