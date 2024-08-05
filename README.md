# HeapLeak

## Tech Stack

### Frameworks and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

[Feature List](<https://github.com/dfout/HeapLeak/wiki/Features-and-Minimum-Viable-Product-(WIP)>) | [Database Schema](https://github.com/dfout/HeapLeak/wiki/DB-SCHEMA) | [User Stories](https://github.com/dfout/HeapLeak/wiki/User-Stories)

# API Documentation

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
  "tags": ["Tag1", "Tag2"]
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
  "tags": ["NewTag1", "NewTag2"]
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
Create a relationship to save the specified question for the currently logged-in user.

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
