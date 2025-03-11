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
### go to https://www.microsoft.com/en-us/sql-server/sql-server-downloads

### run ![](files/public/mssql.png) `SQL2022-SSEI-Dev.exe` for install

![](files/public/mssqlBasic.png)
![](files/public/mssqlInstalling.png)

### go to https://learn.microsoft.com/zh-tw/ssms/download-sql-server-management-studio-ssms#download-ssms

![](files/public/downloadSsms.png)

### run ![](files/public/ssms.png) `SSMS-Setup-CHT.exe` for install

## type orm, gen entities
## download / upload
## swagger
## auth
## calss-validation
## transaction
## email
## websocket
## third-party
