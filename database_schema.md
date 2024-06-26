# ** Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| username    | string    | not null,                 |
| email       | string    | not null, indexed, unique |
| password    | string    | not null                  |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |



## `questions`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| body        | text      | not null,                 |
| title       | string    | not null, indexed, unique |
| user_id     | string    | not null, foreign_key     |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |

* `user_id` references `users` table


## `saves`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| user_id     | integer   | not null, foreign_key     |
| question_id | integer   | foreign_key               |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |


* `user_id` references `users` table
* `question_id` references `questions` table

## `answers`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| body        | text      | not null                  |
| is_primary  | boolean   | not null                  |
| user_id     | integer   | not null, foreign_key     |
| question_id | integer   | foreign_key               |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |

* `user_id` references `users` table
* `question_id` references `questions` table


## `topics`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| question_id | integer   | foreign_key               |
| tag         | string    |                           |
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |

* `question_id` references `questions` table