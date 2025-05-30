# CRUD SPS

## Tecnologias utilizadas

- **Frontend:** React, Typescript, MUI, React Router, Axios
- **Backend:** Node.js, Typescript, Express, Zod, JWT, Pino
- **Testes:** Jest, Supertest
- **Infra:** Docker, Docker Compose
- **Extra:** Simulação de envio de email com [SQS](https://aws.amazon.com/pt/sqs/) e [Localstack](https://www.localstack.cloud/)

---

## Acessos
| Serviço      | URL                          |
|--------------|------------------------------|
| Frontend     | http://localhost:5173         |
| API          | http://localhost:3000/api     |
| Documentação | http://localhost:3000/docs    |
| LocalStack   | http://localhost:4566         |

---

## Executando a aplicação com Docker
### Requisitos
- Ter o [**Docker Compose**](https://docs.docker.com/compose/) instalado.

### Como executar
```bash

$ cd test-sps-react
$ docker-compose up --build
```

---
##
## Executando a aplicação com Yarn
### Requisitos
Ter o Node.js na versão 18 ou superior.

## Instalação

```bash
# Frontend
$ cd test-sps-react
$ yarn install

# Backend
$ cd test-sps-server
$ yarn install

```

### Como executar

```bash
# test-sps-react (Frontend)
$ cd test-sps-react
$ yarn dev

# test-sps-server (Backend)
$ cd test-sps-server
$ yarn dev

# worker (Necessário LocalStack)
$ cd test-sps-server
$ yarn worker 
```

---


### Executando Testes

```bash

$ cd test-sps-server
$ yarn test
```