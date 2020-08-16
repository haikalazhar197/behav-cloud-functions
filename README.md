# Online ToDo Cloud Functions

## Description

This is a set of cloud functions to manage users data on the behav web app
[Behav Web App](https://github.com/haikalazhar197/behav-web-app)

## Features

1. Create user in the database once a user creates an account
2. Deletes user if a user deletes their account
3. Delete user data if they delete their account

## Deploy and test

1. Create firebase project -- the same one used on the Online ToDo
2. Clone this repo

```sh
$ git clone https://github.com/haikalazhar197/behav-cloud-functions.git
```

3. Ensure firebase cli installed

```sh
$ npm install -g firebase-tools
```

4. Setup the firebase project locally

```sh
$ firebase use --add
```

5. Install dependencies

```sh
$ cd functions
$ npm install
```

6. Deplloy functions

```sh
$ firebase deploy
```
