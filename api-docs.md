# Tetangga API Documentation
Berikut adalah step by step penggunaan API

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Models :

_User_
```
- email : string, required, unique
- password : string, required
```

_Profiles_
```
- UserId : integer, required​
- namaLengkap : varchar, required,
- imageUrl: varchar,
- alamat : text
- rtRw : varhcar
- kelurahan : varchar
- kecamatan : varchar
- kotaKab : varchar
- provinsi : varchar
- lat : varchar
- long : varchar
```

_Posts_
```
- UserId : integer, required
- description : text, required
- imageUrl : varchar
- tag : varchar
- status : string
```

_Organization_
```
- UserId: integer, required
- name : varchar, required​
- description : text, required​
- isPaid : boolean, required​
- price : integer
```

_PaymentsStatus (Conjuntion)_
```
- UserId : integer, required​
- OrganizationId : integer, required​
- status : string
```

## Endpoints :
List of available endpoints: 

- `POST/Register` 
- `POST/login`
- `GET/profile`
- `GET/posts`
- `POST/post`
- `PUT/post/:id`
- `DELETE/post/:id`
- `POST/organization`
- `GETT/organization`
- `PUT/organization/update/:id`
- `DELETE/organization/delete/:id`
- `POST/payment/post`
- `GET/payment/:UserId`
- `POST/payment/stripe-checkout-session`
- `POST/payment/success`

## 1. POST /register

Request:

- body:
```json
{
  "email": "string, required",
  "password": "string, required"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```
## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /profiles

Request:

- body:
```json
{
  "namaLengkap": string,
  "alamat": text ,
  "rtRw" : string,
  "kelurahan": string,
  "kecamatan": string,
  "kotaKab": string,
  "provinsi" : string,
  "lat": integer,
  "long": integer
}
```

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
{
  "message": "Your profile is created",
  "data": {
      "id": 1,
      "UserId": 1,
      "namaLengkap": "Arie Sastra Hadiprawira",
      "imageUrl": "https://ik.imagekit.io/kkupfm0agcc/ganteng-jepang_Kfvn7RlXqd.jpg",
      "alamat": "Jl. Watubela 2 No. RF-3A",
      "rtRw": "-",
      "kecamatan": "Serpong",
      "kotaKab": "Tangerang Selatan",
      "provinsi": "Banten",
      "lat": "",
      "long": ""
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "You already have a profile"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

## 4. GET /profile

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "UserId": 1,
    "namaLengkap": "Arie Sastra Hadiprawira",
    "imageUrl": "https://ik.imagekit.io/kkupfm0agcc/ganteng-jepang_Kfvn7RlXqd.jpg",
    "alamat": "Jl. Watubela 2 No. RF-3A",
    "rtRw": "-",
    "keluarahan": null,
    "kecamatan": "Serpong",
    "kotaKab": "Tangerang Selatan",
    "provinsi": "Banten",
    "lat": "",
    "long": "",
    "User": {
        "email": "ariesastrah@gmail.com"
    }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```


## 5. GET /posts

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
{

}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```


## 6. POST /posts/post

Request:

- headers:
```json
{
  "access_token": string
}
```

- body:
```json
{
  "description": string,
  "imageUrl": file ,
  "tag" : string,
}
```

_Response (200 - OK)_
```json
{
  "message": "Success post",
  "post": {
      "id": 2,
      "description": "post pertama saya",
      "tag": null,
      "imageUrl": "https://ik.imagekit.io/kkupfm0agcc/ganteng-jepang_UK881RQglZ.jpg",
      "UserId": 1,
      "updatedAt": "2021-12-15T01:20:13.502Z",
      "createdAt": "2021-12-15T01:20:13.502Z",
      "status": "active"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

## 7. PUT /posts/post/:id

Request:

- headers:
```json
{
  "access_token": string
}
```

- body:
```json
{
  "description": string,
  "imageUrl": file ,
  "tag" : string,
  "status" string
}
```

_Response (200 - OK)_
```json
{
  "message": "Success update post id 3",
  "data": [
      {
          "id": 3,
          "UserId": 1,
          "description": "post pertama saya",
          "imageUrl": "https://ik.imagekit.io/kkupfm0agcc/ganteng-jepang_zAsKFja2V.jpg",
          "tag": null,
          "status": "deactive",
          "createdAt": "2021-12-15T01:48:32.337Z",
          "updatedAt": "2021-12-15T01:53:29.393Z"
      }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 8. DELETE /posts/delete/:id

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
{
  "message": "Post data with id 3 has deleted !"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 9. POST /organization

Request:

- headers:
```json
{
  "access_token": string
}
```

- body:
```json
{
  "name": string,
  "description": text ,
  "isPaid": boolean,
  "price": integer
}

_Response (200 - OK)_
```json
{
  "message": "Your organization already created",
  "organization": {
      "id": 1,
      "name": "Komplek Nusa Loka",
      "description": "Forum Keluarga Tetangga Nusa Loka BSD",
      "isPaid": false,
      "price": 90000,
      "UserId": 1,
      "updatedAt": "2021-12-15T02:32:06.340Z",
      "createdAt": "2021-12-15T02:32:06.340Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

## 10. GET /organization

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
[
  {
      "id": 1,
      "UserId": 1,
      "name": "Komplek Nusa Loka",
      "description": "Forum Keluarga Tetangga Nusa Loka BSD",
      "isPaid": false,
      "price": 90000,
      "createdAt": "2021-12-15T02:32:06.340Z",
      "updatedAt": "2021-12-15T02:32:06.340Z"
  }
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

## 11. PUT /organization/update/:id

Request:

- headers:
```json
{
  "access_token": string
}
```

- body:
```json
{
  "name": string,
  "description": text ,
  "isPaid": boolean,
  "price": integer
}

_Response (200 - OK)_
```json
{
  "message": "Organization undefined has updated !",
  "organization": [
    {
      "id": 1,
      "UserId": 1,
      "name": "Komplek Nusa Loka",
      "description": "Forum Keluarga Tetangga Nusa Loka BSD",
      "isPaid": true,
      "price": 90000,
      "createdAt": "2021-12-15T02:32:06.340Z",
      "updatedAt": "2021-12-15T02:42:21.578Z"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 11. DELETE /organization/delete/:id

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (200 - OK)_
```json
{
  "message": "Organization has deleted !"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 12. POST /payment/post

Request:

- headers:
```json
{
  "access_token": string
}
```

- Body:
```json
{
  "email": string,
  "organization": string
}
```

_Response (201 - CREATED)_
```json
{
  "message": "tiakharisma@gmail.com already assign to Komplek Nusa Loka",
  "data": {
    "id": 2,
    "UserId": 2,
    "OrganizationId": 1,
    "updatedAt": "2021-12-15T07:37:43.900Z",
    "createdAt": "2021-12-15T07:37:43.900Z",
    "status": "pending"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 13. GET /payment/:UserId

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (201 - CREATED)_
```json
{
    "id": 1,
    "UserId": 2,
    "OrganizationId": 1,
    "status": "pending",
    "createdAt": "2021-12-15T07:35:59.021Z",
    "updatedAt": "2021-12-15T07:35:59.021Z"
    ...,
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```

## 14. POST /payment/xendit

Request:

- headers:
```json
{
  "access_token": string
}
```

_Response (201 - CREATED)_
```json
{
    "id": 1,
    "UserId": 2,
    "OrganizationId": 1,
    "status": "pending",
    "createdAt": "2021-12-15T07:35:59.021Z",
    "updatedAt": "2021-12-15T07:35:59.021Z"
    ...,
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Not Authorize !"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Forbidden Access !"
}
```