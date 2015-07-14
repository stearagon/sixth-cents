# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
name   | string    | not null
password_digest | string    | not null
session_token   | string    | not null, unique


## institutions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name       | string    | not null, unique
api_identifier      | string    | not null, unique

## accounts
column name | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
owner_id         | integer   | not null, foreign key (references users)
institution_id | integer    | not null, foreign key (references institutions)
type | string    | not null
amount | integer    | not null


## transactions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
account_id     | integer   | not null, foreign key (references accounts)
amount | integer   | not null
type | string   | not null, possibly store future bills here
description | string   | not null
category | string   | not null
date | date   | not null
notes| text   | not null

## budgets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id   | integer   | not null, foreign key (references users)
name      | string    | not null
occurrence_type        | string    | not null
amount      | integer    | not null

## log_in_credentials
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
institution_id    | integer   | not null, foreign key (references institutions)
user_name    | string   | not null
password_digest    | string   | not null
