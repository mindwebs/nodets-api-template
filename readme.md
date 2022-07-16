## Step by step understanding.

#### Step 1. 

We start by initializing a node project, which will create a default 'package.json' file. This file stores important metadata of the project, dependencies to install and scripts to run. We do this by running the following command.
```
npm init -y
```
The y flag is appended to the command `npm init` to use default values and create the project instead of using the interactive mode. Feel free to run just `npm init` without the -y flag. We will come back to this file to add scripts at a later step!

#### Step 2.

Initialize typescript in the project. Similar to the npm init command, we type
```
tsc --init
```
This creates a tsconfig.json file, which by the name you can know, stores the configuration for typescript code we use in the project. It is a well documented file which you can go through. The only change we usually do in this file is specifying a build directory, by uncommenting line 50 in the original tsconfig file and setting the variable as `outDir: ./build`.

We generally do not have to ever return to the package.json or tsconfig.json files after initial setup.

#### Step 3.

Setting up the project structure.
What I usually do after initializing node and typescript is creating empty directories for all my future files. I follow a route->controller->service architecture for my apis and create additional directories for db models, interfaces and config files. The entire codebase is under an src folder. The structure is as follows:

```
/
  ├── src/
    ├── app.ts
    ├── config/
    ├── controllers/
    ├── dtos/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    └── utils/
  └── readme.md           details and instructions about the project go here
```

Breaking the above structure:
- app.ts - this is the entry point to our backend api. The wrapper of the api you can say. This is where we initiate the server.
- config/ - this directory has files that contain configurations to mongo db, swagger documentation tool etc. As the name suggests, configurations!
- controllers/ - when there's a request to any endpoint we define, eg. `GET /users`, the route is so designed that the flow of control flows to a function that we call "controller". As its name suggests, the controller controls what to do with the request. Which service to call, what response to send, what data to prepare, what error to check for - all the non database interaction stuffs is done in a controller and this directory is the home for all files with the controller code. Controllers differ from regular functions in their input parameters and return types. 
- dtos/ - DTOs stands for data transfer object(s). Whenever you use an ORM, like we are using mongoose, you need to define the type of data to be fetched from the database, or to send as well. Since these are custom user defined data types, we use interfaces to create DTOs. Apart from creating interfaces for database models, we also create dtos for pieces of code where a large chunk of data is to transferred from one function to another. This helps grouping data and transferring from one function to another as a single variable.
- middlewares/ - remember what I wrote in controllers? flow of control goes to controllers from routes. Before going to controllers, we often have to send the request to some functions which either do some checking about the request or modify it before sending the flow to the controllers. This middle function, is called a middleware. An example of a middleware, a common one, is an auth middleware. From the headers of the request, the middleware can make out whether the request is coming from an authenticated user or not. So in case we need to protect a route from being used by unauthenticated users, we can prevent the flow to go to controller by writing the equivalent code in this auth middleware. A middleware is like controller, differs from a regular function because of its strict paramter inputs.
- models/ - this is where we define the schema of our database collections and export them as models. Schema is the structure of a collection while model is an interface we use to interact with the database collection.
- routes/ - finally the routes directory, where we define the routes, along with which middleware the flow should go(if any) and the subsequent controller.
- services/ - services are what controllers use to interact with the database. Services are regular typescript (or js) functions and can be called in other services or controllers to avoid re-writing of code.
- utils/ - optional directory for extra helper functions like generating slugs, external APIs like Google Maps etc. (May not need, based on project requirements)

#### Step 4.

Doing cool developer stuffs.
This includes defining .gitignore, .prettierrc, .prettierignore, .env.example files. You already know what a gitignore file is, prettierrc and prettierignore files are related to an npm package which I use to prettify my code and maintain same formatting and linting all across the codebase. Install this package globally by using `npm install -g prettier`. The prettierrc file has come configs for this package. Prettierignore contains directories and files this formatter shouldn't touch. The last file - .env.example is a template of the gitingored .env file which future devs working on the project should take help from to generate the .env file on their own system.

We also add a file, named nodemon.json with the content:
```json
{
    "verbose": true,
    "ignore": [],
    "watch": ["src/**/*.ts"],
    "execMap": {
        "ts": "node --inspect=0.0.0.0:9229 --nolazy -r ts-node/register"
    }
}
```
I seriously have no idea of this code but this basically does the hot reloading for you so that you don't have to rebuild and restart the application manually.

#### Step 5.

Installing the node packages for our project!
The next thing I did was think of all packages I would need (you can always install more packages any time in the future as well). So for this template project, I installed the following packages given below:
```
npm i express cors mongoose dotenv morgan nodemailer swagger-jsdoc swagger-ui-express express-validator jsonwebtoken 
bcryptjs
```
You should do light google search what these packages are for. If you're thinking how did I decide which all packages I wanted, or rather how to know what packages you'll need, you will know only if you keep working on node projects and get accustomed to commonly used packages. You come across new packages when you meet with new requirements and when you come across the same requirement in the future, you'll already know which package to use. For example, the first time I worked on a user authentication API, I wanted something to hash the user password, it was then when I came across the package name bcryptjs. Now whenever I have to do something related to password hashing, I know which library to use.

After the packages, or rather "dependencies" installation, which you will see listed in the package.json file which gets autoupdated, we will have to install some "dev-dependencies", which are packages used only in the development and building of the project. These are mostly packages that support native js packages in typescript and few other helper packages. These are installed using -D flag:

```
npm i -D @types/bcrypts @types/cors @types/express @types/jsonwebtoken @types/node @types/morgan @types/nodemailer @types/swgger-jsdoc @types/swagger-ui-express cross-env nodemon ts-node typescript
```

#### Step 6.

Writing the src/app.ts file. Yes we begin to code. Documentation of this file in the file itself. Go check.

#### Step 7.

Editing the package.json file with scripts. We need to edit the "scripts" key in this file, which usually starts at line 6. This is itself a nested object where we put some key-value pairs. These key-value pairs are actually aliases which run when we run the command `npm run <key>`. For example, we type an entry under script as `"hello": "echo 'hello world'"`, save the file, and then run `npm run hello`, it will actually run `echo 'hello world'` in the background and display that in the console. So this is what scripts are all about. Our script key would look like this:
```json
  "scripts": {
    "build": "tsc -p .",
    "prettify": "npx prettier --write .",
    "dev": "cross-env NODE_ENV=development nodemon ./src/app.ts",
    "start": "tsc -p . && cross-env NODE_ENV=production node ./build/app.js"
  },
```

The scripts one by one:
1. "build" sript: `tsc -p .` is what compiles our typescript code to javascript code inside the build/ directory.
2. "prettify" script: runs `npx prettier --write .` which basically starts prettifying the code from the current directory (the "." at the end)
3. "dev" script: uses the nodemon.json config file to run the server in hot reload mode. If we break the script into different parts, 
a. cross-env NODE_ENV=development -> this uses the cross-env package to define a global variable named NODE_ENV with value development
b. nodemon ./src/app.ts -> this uses the nodemon package and provides the path to the starting point of the server - the app.ts file
4. "start" script: This does the same thing as dev but without nodemon.
a. tsc -p . -> compiles the code
b. cross env NODE_ENV=production -> same thing, different value this time
c. node ./build/app.js -> path to the compiled js and not ts

When to use which script?
- build -> when the project is deployed, you would just want to build whenever there is a change and the changes get auto deployed by your devops setup
- prettify -> anytime you want. I do it before pushing code to github
- dev -> when you are writing code and testing alongside, you may use `npm run dev` instead of `npm run start` as it often involves dynamically updating code, rebuilding, restarting and restarting.
- start -> when you want to just run the application

After this, we never come back to the package.json file unless there is an actual need to edit something else.

#### Step 8.

Getting into actual code - writing dtos then models then services then controllers then routes. You may browse the directories in this order for code understanding.

Contact this project author for any doubts. [singhayushh](https://github.com/singhayushh)