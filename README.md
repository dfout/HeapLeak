# HeapLeak

Welcome to the HeapLeak README! HeapLeak is a humble clone of the legendary StackOverflow, built and maintained by Kyle Flores, Drew Fout, Syed Zaidi, and Zach Gold

## Tech Stack

### Frameworks and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Wiki Articles

[Feature List](<https://github.com/dfout/HeapLeak/wiki/Features-and-Minimum-Viable-Product-(WIP)>) | [Database Schema](https://github.com/dfout/HeapLeak/wiki/DB-SCHEMA) | [User Stories](https://github.com/dfout/HeapLeak/wiki/User-Stories)

# Homepage
<img  width='800px'  src='https://github.com/user-attachments/assets/5cb98808-920f-410e-9cec-8195823bc9f5'/>

# Filters
<img  width='800px'  src='https://github.com/user-attachments/assets/1ca1b994-1d33-4907-b8c3-7c03497971ec'/>

# Question Page
<img  width='800px'  src='https://github.com/user-attachments/assets/d5b0f319-a61b-43aa-886e-11761fdec03f'/>

# API Documentation

## AUTH

## Endpoint: `GET /`

**Description**: Authenticates a user. Returns user information if authenticated, otherwise returns an unauthorized error.

**Response**:
**200 OK**: Returns the current user's information if authenticated.

```json
{
  "id": 1,
  "username": "exampleUser",
  "email": "user@example.com"
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Unauthorized"
}
```

## Endpoint: `POST /login`

**Description**: Logs a user in. Requires email and password. If authentication is successful, the user is logged in and their information is returned.

**Request**:

**Body**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response**:
**200 OK**: Returns the logged in user's information if credentials are correct.
**Body**

```json
{
  "id": 1,
  "username": "exampleUser",
  "email": "user@example.com"
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "email": ["Invalid email address"],
  "password": ["Incorrect password"]
}
```

## Endpoint: `GET /logout`

**Description**: Logs the current user out and returns a confirmation message.

**Response**:
**200 OK**: Returns a message indicating the user has been logged out.

```json
{
  "message": "User logged out"
}
```

## Endpoint: `POST /signup`

**Description**: Creates a new user and logs them in. Requires username, email, and password.

**Request**:

**Body (JSON)**:

```json
{
  "username": "newUser",
  "email": "newuser@example.com",
  "password": "newpassword"
}
```

**Response**:
**200 OK**: Returns the newly created user's information.

```json
{
  "id": 2,
  "username": "newUser",
  "email": "newuser@example.com"
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "username": ["Username already taken"],
  "email": ["Email already in use"],
  "password": ["Password is too short"]
}
```

## Endpoint: `GET /unauthorized`

**Description**: Returns unauthorized JSON when Flask Login authentication fails.

**Response**:

**401 Unauthorized**: Returns an error message indicating unauthorized access.

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```

## USERS

## Endpoint: `GET /users`

**Description:**
Query for all users and return them in a list of user dictionaries.

**Authentication:** Required (logged in)

**Parameters:**

- None

**Response:**

**Success (200 OK):**

```json
{
  "users": [
    {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com"
      // Other user fields...
    },
    {
      "id": 2,
      "username": "user2",
      "email": "user2@example.com"
      // Other user fields...
    }
    // More users...
  ]
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

## Endpoint: `GET /users/<int:id>`

**Description:**
Query for a user by ID and return that user in a dictionary.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (integer, path parameter): The ID of the user to retrieve.

**Response:**

**Success (200 OK):**

```json
{
  "id": 1,
  "username": "user1",
  "email": "user1@example.com"
  // Other user fields...
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

**Error (404 NOT FOUND):**

```json
{
  "message": "User could not be found"
}
```

## Endpoint: `GET /saves`

**Description:**
Retrieve all saved questions for the current logged in user. Returns an empty array if there are no saved questions or if the questions no longer exist.

**Authentication:** Required (logged in)

**Parameters:**

- None

**Response:**
**Success (200 OK):**

```json
{
  "SavedQuestions": [
    {
      "id": 1,
      "post": {
        "id": 1,
        "title": "Question Title",
        "body": "Question Body",
        "author": "Author Username",
        "Tags": [{ "id": 1, "tag": "Tag1" }],
        "Answers": [
          {
            "id": 1,
            "body": "Answer Body",
            "author": { "id": 1, "username": "Answer Author" }
          }
        ]
      }
    }
  ]
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

## Endpoint: `GET /answers`

**Description:**
Retrieve all answers made by the currently logged in user. Returns an empty array if there are no answers or if the related questions no longer exist.

**Authentication:** Required (logged in)

**Parameters:**

- None

**Response:**
**Success (200 OK):**

```json
{
  "Answers": [
    {
      "id": 1,
      "body": "This is an answer.",
      "question_id": 1,
      "user_id": 1,
      "is_primary": false,
      "mainPost": {
        "id": 1,
        "title": "Sample Question",
        "body": "This is a sample question.",
        "ownerId": 2,
        "Tags": [
          {
            "id": 1,
            "tag": "SampleTag"
          }
        ],
        "Answers": [
          {
            "id": 1,
            "body": "This is an answer.",
            "user_id": 1,
            "is_primary": false
          }
        ],
        "author": {
          "id": 2,
          "username": "author_username"
        }
      }
    }
  ]
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

## QUESTIONS

## Endpoint: `GET /questions`

**Description:**
Retrieve all questions from the database, including each question's tags, author information, answers, and the number of saves.

**Response:**

**Success (200 OK):**

```json
{
  "Questions": [
    {
      "id": 1,
      "title": "Question Title",
      "body": "Question Body",
      "ownerId": 1,
      "author": "Author Username",
      "Tags": [
        {
          "id": 1,
          "tag": "Tag Value",
          "question_id": 1
        }
      ],
      "Answers": [
        {
          "id": 1,
          "body": "Answer Body",
          "ownerId": 2,
          "author": {
            "id": 2,
            "username": "Answer Author Username"
          }
        }
      ],
      "numSaves": 5
    }
  ]
}
```

## Endpoint: `GET /questions/<int:id>`

**Description:**
Retrieve a specific question from the database by its ID, including the question's tags, author information, and answers.

**Parameters:**

- `id` (int): ID of the question to retrieve.

**Response:**

**Success (200 OK):**

```json
{
  "Question": {
    "id": 1,
    "title": "Question Title",
    "body": "Question Body",
    "ownerId": 1,
    "author": "Author Username",
    "Tags": [
      {
        "id": 1,
        "tag": "Tag Value",
        "question_id": 1
      }
    ],
    "Answers": [
      {
        "id": 1,
        "body": "Answer Body",
        "ownerId": 2,
        "author": {
          "id": 2,
          "username": "Answer Author Username"
        }
      }
    ]
  }
}
```

**Error (404 NOT FOUND):**

```json
{
  "message": "Question could not be found"
}
```

## Endpoint: `POST /questions`

**Description:**
Create a new question and add it to the database along with any tags provided in the request. The user must be logged in for this operation.

**Authentication:** Required (logged in)

**Request Body:**

```json
{
  "title": "Question Title",
  "body": "Question Body",
  "tags": ["Tag1"]
}
```

**Response:**

**Success (201 CREATED):**

```json
{
  "Question": {
    "id": 1,
    "title": "Question Title",
    "body": "Question Body",
    "author": "Current User",
    "Tags": [
      {
        "id": 1,
        "tag": "Tag1",
        "question_id": 1
      }
    ]
  }
}
```

**Error (400 BAD REQUEST):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

## Endpoint: `PUT /questions/<int:id>`

**Description:**
Update a specific question in the database. The user must be logged in and be the owner of the question to make updates.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the question to update.

**Request Body:**

```json
{
  "title": "Updated Question Title",
  "body": "Updated Question Body",
  "tags": ["NewTag1"]
}
```

**Response:**

**Success (200 OK):**

```json
{
  "Question": {
    "id": 1,
    "title": "Updated Question Title",
    "body": "Updated Question Body",
    "author": "Current User",
    "Tags": [
      {
        "id": 1,
        "tag": "NewTag1",
        "question_id": 1
      }
    ],
    "Answers": [
      {
        "id": 1,
        "body": "Answer Body",
        "ownerId": 2,
        "author": {
          "id": 2,
          "username": "Answer Author Username"
        }
      }
    ]
  }
}
```

**Error (400 BAD REQEST):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

## Endpoint: `GET /questions/<int:id>/answers`

**Description:**
Retrieve all answers associated with a specific question from the database.

**Parameters:**

- `id` (int): ID of the question for which answers are to be retrieved.

**Response:**

**Success (200 OK):**

```json
{
  "Answers": [
    {
      "id": 1,
      "body": "Answer Body",
      "ownerId": 2,
      "author": "Answer Author Username"
    },
    {
      "id": 2,
      "body": "Another Answer Body",
      "ownerId": 3,
      "author": "Another Answer Author Username"
    }
  ]
}
```

**Error (404 NOT FOUND):**

```json
{
  "message": "Question could not be found"
}
```

## Endpoint: `POST /questions/<int:id>/answers`

**Description:**
Create a new answer for a specific question and add it to the database. The answer is created as a non-primary answer by default. The user must be logged in to perform this operation.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the question to which the answer is being added.

**Request Body:**

```json
{
  "body": "Answer Body"
}
```

**Response:**

**Success (201 CREATED):**

```json
{
  "Answer": {
    "id": 1,
    "body": "Answer Body",
    "ownerId": 2,
    "mainPost": {
      "id": 1,
      "title": "Question Title",
      "body": "Question Body",
      "owner": {
        "id": 1,
        "username": "Question Author Username"
      }
    }
  }
}
```

**Error (400 BAD REQUEST):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

## Endpoint: `POST /questions/<int:id>/tags`

**Description:**
Add new tags to an existing question in the database. The user must be logged in to perform this operation.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the question to which tags are being added.

**Request Body:**

```json
{
  "tags": ["Tag1", "Tag2"]
}
```

**Response:**

**Success (200 OK):**

```json
{
  "Tags": [
    {
      "id": 1,
      "tag": "Tag1",
      "question_id": 1
    },
    {
      "id": 2,
      "tag": "Tag2",
      "question_id": 1
    }
  ]
}
```

**Error (400 BAD REQUEST):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

## Endpoint: `POST /questions/<int:id>/saves`

**Description:**
Create a relationship to save the specified question for the currently logged in user.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the question to be saved.

**Response:**

**Success (201 Created):**

```json
{
  "Save": {
    "id": 1,
    "question_id": 1,
    "user_id": 2,
    "post": {
      "id": 1,
      "title": "Question Title",
      "body": "Question Body",
      "author": "Question Author Username",
      "Tags": [
        {
          "id": 1,
          "tag": "Tag1",
          "question_id": 1
        }
      ]
    }
  }
}
```

**Error (404 NOT FOUND):**

```json
{
  "message": "Question could not be found"
}
```

## Endpoint: `DELETE /saves/<int:id>`

**Description:**
Remove the relationship indicating that the user has saved a specific question.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the save relationship to be removed.

**Response:**

**Success (200 OK):**

```json
{
  "Id": 1
}
```

**Error (404 NOT FOUND):**

```json
{
  "message": "Relation could not be found"
}
```

## Endpoint: `DELETE /questions/<int:id>`

**Description:**
Delete a specific question from the database if the user is logged in and is the owner of the question.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the question to be deleted.

**Response:**

**Success (200 OK):**

```json
{
  "id": 1
}
```

**Error (404 NOT FOUND):**

```json
{
  "id": null
}
```

## ANSWERS

## Endpoint: `PUT /answers/<int:id>`

**Description:**
Update the body of an answer if the user is logged in and is the owner of the answer.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the answer to be updated.

**Request Body:**

`body` (string): The new body of the answer.

**Response:**

**Success (200 OK):**

```json
{
  "Answer": {
    "id": 1,
    "body": "Updated answer body",
    "question_id": 1,
    "user_id": 2,
    "mainPost": {
      "id": 1,
      "title": "Question Title",
      "body": "Question Body",
      "owner": {
        "id": 2,
        "username": "Owner Username",
        "email": "owner@example.com"
      }
    }
  }
}
```

**Error (400 BAD REQEST):**

```json
{
  "message": "Bad Request",
  "errors": {
    "field": ["error message"]
  }
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Not the owner of this Answer"
}
```

## Endpoint: `PUT /answers/<int:id>/mark_primary`

**Description:**
Update an answer to be the primary answer for the linked question if the user is logged in and is the owner of the question. This will demote any existing primary answer.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the answer to be promoted to primary.

**Response:**

**Success (200 OK):**

```json
{
  "Answer": {
    "id": 1,
    "body": "Answer body",
    "question_id": 1,
    "user_id": 2,
    "is_primary": true,
    "mainPost": {
      "id": 1,
      "title": "Question Title",
      "body": "Question Body",
      "owner": {
        "id": 2,
        "username": "Owner Username",
        "email": "owner@example.com"
      }
    }
  }
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Not the owner of this Answer"
}
```

## Endpoint: `DELETE /answers/<int:id>`

**Description:**
Delete an answer if the user is logged in and is the owner of the answer.

**Authentication:** Required (logged in)

**Parameters:**

- `id` (int): ID of the answer to be deleted.

**Response:**

**Success (200 OK):**

```json
{
  "id": 1
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "id": null
}
```

## TAGS

## Endpoint: `GET /tags`

**Description:**
Retrieve a list of all available tags.

**Authentication:** Required (logged in)

**Parameters:**

- None

**Response:**
**Success (200 OK):**

```json
{
  "Tags": ["Tag1", "Tag2", "Tag3"]
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

## Endpoint: `DELETE /tags/<int:id>`

**Description:**
Remove a tag from a question. The tag is deleted only if the current user is the owner of the question associated with the tag.

**Authentication:** Required (logged in)

**Parameters:**

- **id** (path parameter): The ID of the tag to be removed.

**Response:**
**Success (200 OK):**

```json
{
  "id": 123
}
```

**Error (401 UNAUTHORIZED):**

```json
{
  "message": "Login required"
}
```

**Error (404 NOT FOUND):**

```json
{
  "id": null
}
```
