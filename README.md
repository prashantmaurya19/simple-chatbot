# simple-chatbot
### like gemini and chatgpt
-------------

# demo

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
