#!/usr/bin/env bash
npm ci

docker compose down

npx dotenv-cli -e .env -- docker compose up -d users-db

sleep 5

yarn prisma generate
yarn prisma migrate dev
