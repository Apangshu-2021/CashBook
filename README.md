# CashBook Expense Tracker Website

> An expense tracker application built with the MERN stack & Ant Design.

This is a full stack Expense Tracker Application built using MongoDB, Express.JS, React.JS, Node.JS

## Features

- Add, Edit and Delete Transactions.
- Filter transactions by Date.
- Filter transactions by Type.
- Analysis of amount earned through income as well as amount spent through expense.
- Analysis of various types of income and expense.
- User login and logout.
- All the things are updated without page reloading.

## Usage

### ES Modules in Node

I use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = Your Mongo DB URI [Mongo DB connection string]

```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run start/npm start

# Run backend only
node server.js
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku
