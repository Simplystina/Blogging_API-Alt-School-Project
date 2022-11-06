# Blog App
This is an api for a blog app
This is my submission for my alt school exam project for the backend school of engineering. The whole assignment question can be found here.

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get blogs
5. Users should be able to create blogs
6. Users should be able to update and delete blogs
7. Test application
8. More specific requirements can be found in the document here
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- somehostsite.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |

|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  required |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  state | number  |  required,default:1|
|  state |  string |  required, default: user, enum: ['draft', 'published'] |
|  created_at |  date |  required |
|  updated_at |  date |  required |




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
  "username": 'jon_doe",
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
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create Order

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---
### Get Order

- Route: /orders/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

### Get Orders

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

...

## Contributor
- Nwatu Chidinma 