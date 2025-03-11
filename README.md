# Nestjs Tutorial

## 1. create a new nest project and add LOG
### use below command to install nestjs
```
npm i -g @nestjs/cli
```

### create a new proejct
```
npm nest new your-project-name
```

```
✔ Installation in progress... ☕

🚀  Successfully created project my-nestjs-project
👉  Get started with the following commands:
```

### in `terminal`
```
cd your-project-name
npm run start:dev
```

### in browser open `localhost:3000`, if you see below means the server is running
![](files/public/startOK.png)

### open `src\app.service.ts`
### add function getCurrentTime in AppService

```ts
getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
```

### open `src\app.controller.ts`
### add function getCurrentTime AppController
```ts
  //@Get means use get method in restful api, there are other method: post, put ...etc, the string 'getCurrentTime' is the path
  @Get('getCurrentTime') 
  getCurrentTime(): string {
    return this.appService.getCurrentTime();
  }
```

### result
![](files/public/getCurrentTime.png)

## create DB and connect and use basic sql to get data
## type orm, gen entities
## download / upload
## swagger
## auth
## calss-validation
## transaction
## email
## websocket
## third-party
