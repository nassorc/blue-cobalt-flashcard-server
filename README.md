# Authentication Express Template with JWT
---
> Authentication Express template that includes login, register, and JSON web token server functionlities.

## Prerequisites
Before using this template, some software must be installed on your computer:
* Node.js
* npm
* MongoDB


## Installation
To install, clone this repository and install dependencies using npm:
```
git clone
cd authentication
npm install
```

## .env file instructions
Server requires a .env file in the root directory to work. The .env should contain
the following variables:
```
DATABSE_URI=<database url>
SECRET_KEY=<secret key for the jsonwebtoken>
PORT=<server port number>
``` 

## Usage
To start start, run the following command:
```
npm start
```

## Endpoints
The following enpoints are available: