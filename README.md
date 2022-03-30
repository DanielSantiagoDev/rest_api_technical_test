# rest_api_technical_test

## Requirements

* Node
* Git
* Docker
* Typescript

## Common setup

1 - git clone the repository
```bash
npm install
```

2 - To run the server,

```bash
npm start
```

## Docker setup 
```bash
docker build . -t daniel_santiago/rest_api_test
```
```bash
docker run -d daniel_santiago/rest_api_test
```

## TEST
Made with jest : Run the following
```bash
npm run test
```
