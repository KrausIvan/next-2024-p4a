# Příklady k výuce Next.js v roce 2024/25

1. [Instalace a integrace Prisma](./nxt03-prisma-install/)

## Seznam příkazů
### Základní příkazy

Založení projektu

    npx create-next-app@latest 

Instalace závislostí

    npm install

Spuštění vývojového prostředí

    npm run dev

Sestavení ostré verze

    npm run build

### Prisma

Instalace

    npm install @prisma/client sqlite3
    npm install prisma --save-dev
    npm install ts-node --save-dev

Iniciace

    npx prisma init

Přegenerování klienta

    npx prisma generate

Migrace

    npx prisma migrate dev --name init

Seed dat

    npx prisma db seed