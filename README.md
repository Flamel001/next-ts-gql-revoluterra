# Next TypeScript and GraphQL Github Issues Tracker

With this application you will have a possibility to enter required `Repository owner` and `Repository name`
To get a `list of issues`, assosiated with this repository. After getting `list of issues` you can check their
`Title`, `text` and `number of comments`. You can even leave your own comment!

## How to use

1. Clone the project
2. Create `.env` file in the root
3. Create or use one of your tokens from [Here](https://github.com/settings/tokens) Minimal "Select scopes" are `public_repo, user` and `write:discussion`
4. Paste `GITHUB_AUTH_TOKEN=YOUR_TOKEN_FROM_POINT_3` in `.env`
5. Run

```bash
npm -i
npm run-script dev
# or
yarn
yarn dev
```

6. ???
7. PROFIT
