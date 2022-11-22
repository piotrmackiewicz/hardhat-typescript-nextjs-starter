This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a starter project for developing etherum dApps using Hardhat and NextJS. 

In order to be sure everything will work, please use node verson tagged as stable. In order to quickly manage node version you can use npx. Then you can change version using command `nvm use stable`.

## Getting Started

### 1. Change project name in root package.json (replace `<your-project-name>`)

### 2. Open terminal and execute following commands:

```bash
yarn run setup
yarn run contracts:compile
yarn run contracts:chain
```

### 3. Open new terminal tab and execute following commands:

```bash
yarn run contracts:deploy
yarn run web:dev
```

### 4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Commands

`yarn run setup` - install all dependencies

`yarn run web:dev` - run local development server

`yarn run web:build` - build frontend production build

`yarn run web:` - run local server serving production build

`yarn run web:lint` - lint frontend code

`yarn run contracts:compile` - compile contracts

`yarn run contracts:compile:reset` - remove all files create with contracts:compile

`yarn run contracts:chain` - run local blockchain

`yarn run contracts:deploy` - deploy compiled contracts to local blockchain

`yarn run contracts:test` - run contracts tests
