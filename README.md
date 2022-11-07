# Blog App
This is an api for a blog app
This is my submission for my alt school exam project for the backend school of engineering. The whole assignment question can be found [here](https://docs.google.com/document/d/1JcWAqdvStGYaoKGhw7nRcGx3JAeGmCQziqzIQIF20jM/edit).

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get blogs
5. Users should be able to create blogs
6. Users should be able to update and delete blogs
7. Test application
8. More specific requirements can be found in the document [here](https://docs.google.com/document/d/1JcWAqdvStGYaoKGhw7nRcGx3JAeGmCQziqzIQIF20jM/edit)
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- https://altschool-blog-api.cyclic.app


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id        |  string |  required |
|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  required |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  state | number  |  required,default:1|
|  title |  string |  required, unique|
|  created_at |  date |  required |
|  updated_at |  date |  required |
|  author   | ObjectId  | 
|   tags  |  array  | String|
|  reading_time  |  |String |
|  body    |  String  |
|  read_count | String |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",

}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "username": 'jon_doe",
}
```

- Responses

Success
```

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "_id": "6363f44a47cce910a0f2b148",
    "email": "dinma@gmail.com",
    "firstName": "chinma",
    "lastName": "chinma",
    "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
    "createdAt": "2022-11-03T17:03:06.905Z",
    "updatedAt": "2022-11-03T17:03:06.905Z",
    "__v": 0
  }
}
```

---
### Post Blog

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Dinma at Google",
  "description": "Her Journey to google",
 
  "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
  "tags":[
    "Dinma",
    "Google",
    "started"
    
    ]
}
```

- Responses

Success
```
{
  "message": "Blog created successfully",
  "status": true,
  "userId": "6363f44a47cce910a0f2b148",
  "blog": {
    "title": "Dinma at Apple",
    "description": "Her Journey to Apple",
    "author": "6363f44a47cce910a0f2b148",
    "state": "draft",
    "read_count": 1,
    "userId": "6363f44a47cce910a0f2b148",
    "tags": [
      "Dinma",
      "Google",
      "started"
    ],
    "reading_time": "20mins",
    "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
    "_id": "6367e0cb9f90abb8957a2d3d",
    "createdAt": "2022-11-06T16:28:59.888Z",
    "updatedAt": "2022-11-06T16:28:59.888Z",
    "__v": 0
  }
}
```

---
### Get all Published Blogs
- Route: /blogs
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "message": "All data retrieved successfully",
  "status": true,
  "Blogs": [
    {
      "_id": "6367d948091d180b2c857f6a",
      "title": "Programming paradigm",
      "description": "Python extensively",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "published",
      "read_count": 2,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "python",
        "opensource",
        "dragnet"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T15:56:56.402Z",
      "updatedAt": "2022-11-06T16:06:29.083Z",
      "__v": 0
    }
  ]
}

```

---
### Get a single blog

- Route: /blog/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "message": "Record Fetched successfully",
  "status": true,
  "Blog": {
    "_id": "6367d948091d180b2c857f6a",
    "title": "Programming paradigm",
    "description": "Python extensively",
    "author": {
      "_id": "6363f44a47cce910a0f2b148",
      "email": "dinma@gmail.com",
      "firstName": "chinma",
      "lastName": "chinma",
      "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
      "createdAt": "2022-11-03T17:03:06.905Z",
      "updatedAt": "2022-11-03T17:03:06.905Z",
      "__v": 0
    },
    "state": "published",
    "read_count": 3,
    "userId": "6363f44a47cce910a0f2b148",
    "tags": [
      "python",
      "opensource",
      "dragnet"
    ],
    "reading_time": "20mins",
    "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
    "createdAt": "2022-11-06T15:56:56.402Z",
    "updatedAt": "2022-11-06T16:35:55.107Z",
    "__v": 0
  }
}
```
---

### Get each users blogs (This endpoint returns the blogs for each logged user)

- Route: /blog
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - state  (either draft or published)
- Responses

Success
```
{
  "message": "Successfully retrieved fully",
  "status": true,
  "blog": [
    {
      "_id": "6367d948091d180b2c857f6a",
      "title": "Programming paradigm",
      "description": "Python extensively",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "published",
      "read_count": 3,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "python",
        "opensource",
        "dragnet"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T15:56:56.402Z",
      "updatedAt": "2022-11-06T16:35:55.107Z",
      "__v": 0
    },
    {
      "_id": "6367da7d7487ce61a963facd",
      "title": "Programming in a whole",
      "description": "Programming topics extensively",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "draft",
      "read_count": 1,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "progra",
        "programming",
        "opensource",
        "dragnet"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T16:02:05.316Z",
      "updatedAt": "2022-11-06T16:02:05.316Z",
      "__v": 0
    },
    {
      "_id": "6367dacc7487ce61a963fad1",
      "title": "Exceptional Women in tech",
      "description": "Women in tech",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "draft",
      "read_count": 1,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "Adaora",
        "programming",
        "dinma"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T16:03:24.878Z",
      "updatedAt": "2022-11-06T16:03:24.878Z",
      "__v": 0
    },
    {
      "_id": "6367daf67487ce61a963fad3",
      "title": "Dinma at Google",
      "description": "Her Journey to google",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "draft",
      "read_count": 1,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "Dinma",
        "Google",
        "started"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T16:04:06.190Z",
      "updatedAt": "2022-11-06T16:04:06.190Z",
      "__v": 0
    },
    {
      "_id": "6367e0cb9f90abb8957a2d3d",
      "title": "Dinma at Apple",
      "description": "Her Journey to Apple",
      "author": {
        "_id": "6363f44a47cce910a0f2b148",
        "email": "dinma@gmail.com",
        "firstName": "chinma",
        "lastName": "chinma",
        "password": "$2b$10$pNsUp6Z9SQTdgrwD6NwiQuXWjrMyatwaPgAYgQX7rPPpHQvfxdyfC",
        "createdAt": "2022-11-03T17:03:06.905Z",
        "updatedAt": "2022-11-03T17:03:06.905Z",
        "__v": 0
      },
      "state": "draft",
      "read_count": 1,
      "userId": "6363f44a47cce910a0f2b148",
      "tags": [
        "Dinma",
        "Google",
        "started"
      ],
      "reading_time": "20mins",
      "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
      "createdAt": "2022-11-06T16:28:59.888Z",
      "updatedAt": "2022-11-06T16:28:59.888Z",
      "__v": 0
    }
  ]
}
```
---
### Update a blog (You can pass in any of the parameters as a body to update it.)
### Passing in the state parameter publishes the blog

- Route: /blog/:id
- Method: PUT
- Header
    - Authorization: Bearer {token}
- Responses

- Body:  (e.g if I choose to publish my blog)
```
{
  - Body: 
```
{
  "state": "published",
}
```
}
```

Success
```
{
  "message": "Data updated successfully",
  "status": true,
  "blog": {
    "_id": "6367dacc7487ce61a963fad1",
    "title": "Exceptional Women in tech",
    "description": "Women in tech",
    "author": "6363f44a47cce910a0f2b148",
    "state": "published",
    "read_count": 1,
    "userId": "6363f44a47cce910a0f2b148",
    "tags": [
      "Adaora",
      "programming",
      "dinma"
    ],
    "reading_time": "20mins",
    "body": "or Computer Science Boot Camp today! Now on sale at GigaPromo. GigaPromo is the website to compare Computer Science Boot Camp. Search and save now! Cheap Prices. Compare Simply. Large Selection. Compare Online. Always Sale. The Best Price. Save Online.",
    "createdAt": "2022-11-06T16:03:24.878Z",
    "updatedAt": "2022-11-06T16:50:13.503Z",
    "__v": 0
  }
}
```

---
### Delete a blog 

- Route: /blog/:id
- Method: Deleted
- Header
    - Authorization: Bearer {token}
- Responses


```

Success
```
{
  "message": "Blog deleted successfully",
  "status": true,
}
```
...

## Contributor
- Nwatu Chidinma 
