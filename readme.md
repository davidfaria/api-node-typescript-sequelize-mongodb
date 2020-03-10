# Api Node.js com Typescript (Sequelize e Mongo)  [  EM ANDAMENTO / ESTUDO ]

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/davidfaria/api-node-typescript-sequelize-mongodb/blob/master/LICENSE)
![](https://img.shields.io/github/package-json/v/davidfaria/api-node-typescript-sequelize-mongodb.svg)
![](https://img.shields.io/github/last-commit/davidfaria/api-node-typescript-sequelize-mongodb.svg?color=red)
![](https://img.shields.io/github/languages/top/davidfaria/api-node-typescript-sequelize-mongodb.svg?color=yellow)
![](https://img.shields.io/github/languages/count/davidfaria/api-node-typescript-sequelize-mongodb.svg?color=lightgrey)
![](https://img.shields.io/github/languages/code-size/davidfaria/api-node-typescript-sequelize-mongodb.svg)
![](https://img.shields.io/github/repo-size/davidfaria/api-node-typescript-sequelize-mongodb.svg?color=blueviolet)
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

## :gear: Back-end

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v12.16](https://nodejs.org/)
- Typescript [Typescript](https://www.typescriptlang.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções

```bash
# clonar o repositório
git clone https://github.com/davidfaria/api-node-typescript-sequelize-mongodb.git

# entrar na pasta do projeto
cd api-node-typescript-sequelize-mongodb

# instalar as dependências
yarn install

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# criar .env.test para ambiente de test (jest)
cp .env.test.example .env.test

# create folder docker/storage para armazenamento local
mkdir -p docker/storage

# permissão para container redis /mongodb
# se o container ficar reiniciando, aplique a permissão e reiniciei os containers
sudo chown -R 1001 docker

# subir os serviços (redis, mongodb)
docker-compose up -d

# verifique se os container estão rodando corretamente
docker ps

# obs. Se precisar reinicar os container utilize
docker-compose restart

# iniciar o servidor da aplicação
yarn dev

# inciar a fila para envio de e-mail
yarn queue


# para rodar os tests
yarn test

```

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
