FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /code

WORKDIR /code
COPY requirements.txt /code
COPY manage.py /code

RUN python -m pip install -r requirements.txt

COPY . /code/

EXPOSE 8000

# CMD ["gunicorn", "FormulariosDjangoV5.wsgi:application" ,"--bind 0.0.0.0:8000", "--timeout 120", "--workers=3", "--threads=3", "--worker-connections=1000"]

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
