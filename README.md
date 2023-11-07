# Инструменты нагрузочного тестирования

## Postman

### Установка

```shell
brew install postman
```

### Запуск
[Ссылка](https://blog.postman.com/postman-api-performance-testing/)

## Artillery

### Установка

```shell
brew install artillery
```


### Запуск

```shell
artillery run ./tests/artillery/config.yaml --output ./tests/test-run.json
```

### Отчетность

```shell
artillery report ./tests/test-run.json
```

## WRK

### Установка

```shell
brew install wrk
```

### Запуск

```shell
wrk -c200 -t1 -d3s http://localhost:8000/test -s ./tests/wrk/body_req.lua
```

## K6

### Установка

```shell
brew install k6
```


### Запуск

```shell
k6 run ./tests/k6/k6.js
```
