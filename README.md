# Hydroprocess DB

## Getting Started

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