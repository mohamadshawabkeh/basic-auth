# basic-auth
## Routes

The code provides the following routes:

### POST /signup

This route is used for user registration.

#### Request

- Method: POST
- Endpoint: /signup
- Body Parameters:
  - username (string): The username of the user.
  - password (string): The password of the user.

#### Response

- Status: 201 (Created)
- Body: JSON object representing the created user record.

### GET /signin

This route is used for user login.

#### Request

- Method: GET
- Endpoint: /signin
- Headers:
  - Authorization: Basic authentication with the format "username:password" encoded in Base64.

#### Response

- Status: 200 (OK) - If the username and password are valid.
- Body: JSON object representing the user.

- Status: 500 (Internal Server Error) - If the username or password is incorrect or missing.


## Tests

[Test1](./testslab061.jpg)
[Test2](./testslab062.jpg)
[Test3](./testsclass063.jpg)