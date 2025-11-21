# simple-chatbot
### like gemini and chatgpt
-------------

# demo
https://github.com/user-attachments/assets/eed50c0e-866e-4720-83e6-2c652ca34a60

# Installation

## With Docker 🐋

```
docker build -t chatbot:latest .
docker run -d --name chatbot:latest -p 3000:3000
```

## Without Docker

### Requirements
- node js 
- yarn 

```
# for building frontend (not required)
cd ./frontend && ./build.sh

# runing backend server
cd ./backend && yarn start

# visit http://localhost:3000 
```

### .env setup
create a .env file in backend folder.<br>
Note: you need a open router api key
```env
# backend/.env
OPEN_ROUTER_API_KEY=<API_KEY>
```

### Future Update
- support for markdowns (currently not supported)
