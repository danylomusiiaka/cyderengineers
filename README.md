# Cyder Engineers

### Перше розгортання

> **Вся конфігурація контейнерів відбувається в файлі `.env`**

> **NOTE**: Для того щоб перевести додаток в продакшин - значення в файлі .env `NODE_ENV=dev` на `NODE_ENV=prod`

Для того щоб розгорнути додаток в Docker:

```bash
docker network create traefik
docker-compose build
docker-compose up -d
```

Всі наступні запуски 

```bash
docker-compose up -d
```

> **NOTE**: після закінчення `docker-compose down`

Після запуску `docker-compose up -d` 

```
http://localhost:8080/
```

Апі 

```
http://localhost:8080/api
```

`mongo express` 

```
http://localhost:8080/express
```
