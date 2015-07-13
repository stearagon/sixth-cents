# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
zip_code  | integer    | not null, unique

## accounts
column name | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
owner_id         | integer   | not null, foreign key (references users)
institution_name | string    | not null
type | string    | not null
amount | integer    | not null


## transactions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
account_id     | integer   | not null, foreign key (references blogs)
amount | integer   | not null, foreign key (references users)
type | string   | not null, foreign key (references users)


## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null
body        | string    |

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts)
tag_id      | integer   | not null, foreign key (references tags)



