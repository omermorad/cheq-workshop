#!/usr/bin/env bash
npm ci

docker compose down

npx dotenv-cli -e .env -- docker compose up -d users-db

sleep 5

npx prisma generate
npx prisma migrate dev
