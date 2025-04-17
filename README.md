# Hydroprocess DB

## Quick Start

### Clone the repo, checkout this branch
```console
git clone https://github.com/CUAHSI/hydroprocess-db.git
cd hydroprocess-db
git checkout develop
```

### API running locally
```console
cp env.template .env
make build
make up
```
The API will be available at http://0.0.0.0:8001

If you want to load some test data, you can run
```console
make loaddb
```

To reload the database (destructive, returns to original dump state):
```console
make reloaddb
```

### Frontend for local development
```console
cp .env.template .env  #if you haven't already. Replace `https://localhost` with `http://localhost:5173` (or whatever port is used by Vite)
cd frontend
npm install
npm run dev
```
The frontend will be available at http://localhost:5173
More detailed info is available in the [frontend readme](frontend/README.md)

## Formatting
```console
make format
```
Formatting and linting is run with a git pre-commit hook using Husky.
It requires the Docker daemon to be running.
If you are having trouble with the formatting and linting, you can see here how to skip the git hook:
https://typicode.github.io/husky/how-to.html#skipping-git-hooks
However note that this is not recommended -- let's keep our code clean!

## Contributing guidelines
We would love for you to contibute!
Pull requests should be submitted against our [develop branch](https://github.com/CUAHSI/hydroprocess-db/tree/develop)
PRs will receive at least one approval before being merged into `develop`.
Review at this stage should include a code review as well as a functional review.
After any necessary revisions/comments are addressed, the Reviewer(s) will approve the PR in Github, after which the developer/contributor is free to merge (assuming they have adequate priveleges on the repo--if not, then the Reviewer will complete the merge).
Once a set of features are ready for release, a PR will be opened up by an administrator, for `develop` -> `main`.

## More info
[CI/CD info](https://develop.cuahsi.io/hydroprocess-db/ci_cd/)