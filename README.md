# Random Joke Generator

This is interview project developed for UNITASK TECHNOLOGIES PVT LTD by dhruvin vaghasiya this project includes backend features like SignUp, SignIn, SignOut, GetRandomJoke, GetProfile

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Stacks](#Stacks)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Installation](#Installation)
- [Running the app](#Running-the-app)
- [Swagger](#Swagger-Documentation)

## Description

This project is a web-based platform that empowers users to create and manage their profiles, providing a personalized experience. Users can register for an account, log in securely, and access a variety of features. One of the notable features of this platform is the ability to access a collection of random jokes for free, enhancing the user experience with humor and entertainment.

## Features

`User Profile Creation`: Users can easily create their profiles by providing essential information, ensuring a personalized experience on the platform.

`Secure User Authentication`: The platform prioritizes security with robust user authentication. Users can securely log in to their accounts, safeguarding their personal data.

`Random Jokes`: Registered users have the privilege to access random jokes for free. It adds a touch of humor and entertainment to their experience.

`Logout`: Users can log out of their accounts at any time, ensuring the security of their sessions and data.

`Get Profile`: Users can view their profiles.

## Stacks

`Framework`: NestJS - A scalable and extensible Node.js framework.

`Validation`: Class Validator and Class Transformer for robust input data validation and sanitization.

`API Documentation`: Swagger for API documentation.

`Database`: MongoDB for data storage.

`Security`: JWT for token-based authentication, and Bcrypt for password hashing.

`Encryption`: Crypto for encryption and decryption of sensitive data.

## API Endpoints

| Endpoint                | Method | Description           |
| ----------------------- | ------ | --------------------- |
| `/api/`                 | GET    | Home page.            |
| `/api/users`            | POST   | Sign up a new user.   |
| `/api/me`               | GET    | Get the user profile. |
| `/api/auth/login`       | POST   | Log in a user.        |
| `/api/auth/logout`      | POST   | Log out a user.       |
| `/api/joke/random-joke` | GET    | Get a random joke.    |

## Validation

**Request Validation:**

API endpoints adhere to strict input validation rules. Only fields specified in the Swagger documentation schema are accepted, and any additional fields or missing required fields will result in an error response from the backend.

- **Swagger Schema:** The Swagger documentation provides a clear specification of the expected request structure for each API endpoint. Please refer to the Swagger documentation for details on the required fields and their data types.

- **Validation Errors:** If a request contains extra fields that are not specified in the Swagger schema, the backend will respond with an error indicating that the request is invalid. Similarly, if any required fields are missing, the backend will also respond with a validation error.

It's essential to ensure that your requests align with the Swagger documentation to ensure smooth interactions with our API endpoints.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger Documentation

- Navigate to http://localhost:port/api/doc for the swagger collection
