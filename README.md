# Foodtron

O Foodtron é uma plataforma de delivery white label para restaurantes, lanchonetes e distribuidoras.

## Instalação

Para instalar e rodar o projeto você precisará ter um banco de dados para o shadow database do Prisma e um banco de dados principal da aplicação, além disso é necessário configurar corretamente as variáveis de ambiente contidas no `.env.example`, renome-o para `.env` e adicione os tokens e chaves de cada serviço para que tudo funcione corretamente.

## Requisitos

- NodeJS v16+
- Yarn
- Mysql
- Conta na GoDaddy (para os recursos de multisite)
- Conta na Vercel (para os recursos de multisite)

## Rodando

- Rode `yarn` para instalar as dependências.
- Rode `yarn build` para gerar uma build de produção
- Rode `yarn dev` para rodar o servidor de desenvolvimento
