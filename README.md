# Nestjs Tutorial

## create a git respo
### login `github` 
### go to https://github.com/new
### fill your `Repository name` (The repository name can only contain ASCII letters, digits, and the characters ., -, and _.)
### check `Add a README file`
### click the `Create respository` button
### open `vscode` -> `terminal`

### type below to clone your project
```
git clone https://github.com/your username/your respo name.git
```

### you can find it in here
![](files/public/gitclone.png)

## create a new nest project and add LOG
### use below command to install nestjs
```
npm i -g @nestjs/cli
```
### or
```
yarn add @nestjs/cli
```

### you will see below
![](files/public/nestjsinstall.png)

### 9K+ files changed in your git
![](files/public/9k+.png)

### Normally, we will not push `/node_modules` to our respo, so we need add a `.gitignore` file in root to ignore it

### add below in `.gitignore`
```
node_modules
```
![](files/public/gitignore.png)


## create DB and connect and use basic sql to get data
## type orm, gen entities
## download / upload
## swagger
## auth
## calss-validation
## transaction
## websocket
## third-party


$ npm i -g @nestjs/cli
$ nest new project-name