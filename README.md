# Blue Cobalt server
---

## Prerequisites
Before using this repo, some software must be installed on your computer:
* Node.js
* npm
* MongoDB
* git


## Installation
To install, clone this repository and install dependencies using npm:
```
git clone https://github.com/nassorc/blue-cobalt-flashcard-server
cd blue-cobalt-flashcard-server
npm install
```

## .env file instructions
Server requires a .env file in the root directory to work. The .env should contain
the following variables:
Don't include the brackets < > when replacing the placeholder.
```
DATABSE_URI=<database url>
SECRET_KEY=<secret key for the jsonwebtoken>
PORT=<server port number>
``` 
**example**
```
DATABSE_URI=mongodb://localhost:27017
SECRET_KEY=secretKey
PORT=3001
``` 
* `DATABSE_URI=mongodb://localhost:27017` will connect to your local machine. To connect with atlas, replace the uri with the one provided by atlas.

## Usage
To start server, run the following command:
```
npm start
```

## Endpoints

Endpoint documentation is located at folder /docs/index.html
Endpoints are documented using [apidoc][1]
[1]: https://apidocjs.com/

## Route Directory
Contains all endpoints.
Each route will make a call to makeCallback() and pass it a controller function.
The controller function will be called in makeCallback() body, once a
httpRequest object is created.

Function makeCallback() creates a common interface so that all controllers will
have access to the same request object.
If a controller, or if many controllers needs to receive a new property, you can add
the change to the object created in makeCallback(). Then all controllers that need the new
object can easily access it, and controllers that don't need it can ignore the property

## Controller Directory
Receives the http request from makeCallback(), validate and extracts the data needed 
to for the use cases.
Additionally, controllers creates the data needed for the response object

## UseCase Directory
Contains the business logic of the system. For example, a user can create an account, or
a user can create a deck.
Each function will access a mongodb model located at the directory **models** to query, insert
or delete data.

## Entity Layer
**Currently not being used.**
Purpose is to create objects of the entities that are in the flashcard system, for example,
user and deck.

## Models
Contains the mongodb schema and model.
Each function in this directory will export a model. A model represents a collection in the
database.