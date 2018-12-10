# Task: [here](https://github.com/andrewroni/node-movies-api/blob/master/TASK.md).

# Requests Example

###### To start project:
1. make sure to run mongodb instance at localhost:27017
2. then run this commands:

```
npm install
npm start
```
## POST /users

###### req:
```
  {
    "name": "Andrew",
    "email": "andrew@example.com",
    "password": "password"
  }
 ```
###### res:
```
{
    "message": "User successfully created. Now you can login."
}
```
## POST /users/auth

###### req:
```
{
	"email": "andrew@example.com",
	"password": "password"
}
```
###### res:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA1NjFjYTRiOWJiYjIxZWM3MTgzNWEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzODU3MTY1LCJleHAiOjE1NDM4NjA3NjV9.xwGpP4n5JYe6SlKZlUHyztkT_lyJ9l9IdXWimVa5Uho"
}
```
## GET /users/

###### req:
*Token should be provided at Authorization header as Bearer Token, this Token was given to you @ POST /users/auth :* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA1NjFjYTRiOWJiYjIxZWM3MTgzNWEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzODU3MTY1LCJleHAiOjE1NDM4NjA3NjV9.xwGpP4n5JYe6SlKZlUHyztkT_lyJ9l9IdXWimVa5Uho

###### res:
```
[
    {
        "_id": "5c0561ca4b9bbb21ec71835a",
        "name": "Andrew",
        "email": "andrew@example.com"
    }
]
```
## GET /users/:id

###### req:
*Token should be provided at Authorization header as Bearer Token, this Token was given to you @ POST /users/auth :* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA1NjFjYTRiOWJiYjIxZWM3MTgzNWEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzODU3MTY1LCJleHAiOjE1NDM4NjA3NjV9.xwGpP4n5JYe6SlKZlUHyztkT_lyJ9l9IdXWimVa5Uho

:id *You can get **id** @ GET /users/ , or when you was creating user @ POST /users/*

###### res:
```
{
    "_id": "5c0561ca4b9bbb21ec71835a",
    "name": "Andrew",
    "email": "andrew@example.com"
}
```
## GET /genres

###### res:
```
[
    {
        "_id": "5c056a634b9bbb21ec71835d",
        "name": "Fantasy"
    }
]
```
## GET /genres/:id

###### req:

:id *You can get **id** @ GET /genres/ , or when you was creating genre @ POST /genres/*

###### res:
```
{
    "_id": "5c056a634b9bbb21ec71835d",
    "name": "Fantasy"
}
```
## POST /genres

###### req:
```
{
	"name": "Fantasy"
}
```
###### res:
```
{
    "message": "Genre Fantasy was successfully add",
    "genre": {
        "_id": "5c056a634b9bbb21ec71835d",
        "name": "Fantasy",
        "__v": 0
    }
}
```
## DELETE /genres/:id

###### req:

:id *You can get **id** @ GET /genres/ , or when you was creating genre @ POST /genres/*

###### res:
```
{
    "message": "Genre with id: 5c056a634b9bbb21ec71835d was successfully deleted"
}
```

## GET /movies

###### res:
```
[
    {
        "_id": "5c056fec4b9bbb21ec71835e",
        "name": "Star Wars: Episode VIII - The Last Jedi ",
        "year": 2017,
        "price": 12.99,
        "genre": {
          "name": "Fantasy"
        },
        "image": {
            "original": "public/img/original/image-1543860204518.jpg",
            "thumb": "public/img/thumb/thumb-image-1543860204518.jpg"
        }
    }
]
```
## GET /movies/:id

###### req:

:id *You can get **id** @ GET /movies/ , or when you was creating genre @ POST /movies/*

###### res:
```
{
    "_id": "5c056fec4b9bbb21ec71835e",
    "name": "Star Wars: Episode VIII - The Last Jedi ",
    "year": 2017,
    "price": 12.99,
    "genre": {
      "name": "Fantasy"
    },
    "image": {
        "original": "public/img/original/image-1543860204518.jpg",
        "thumb": "public/img/thumb/thumb-image-1543860204518.jpg"
    }
}
```

## POST /movies/

###### req:

**Important! Request should be _form-data_**
```
{
  "name": "Star Wars: Episode VIII - The Last Jedi",
  "year": "2017",
  "price": "12.99",
  "genre": "Fantasy",
  "image": **image should be attached as a form-data**
}
```


###### res:
```
{
    "message": "Movie: Star Wars: Episode VIII - The Last Jedi  was successfully add",
    "movie": {
        "_id": "5c056fec4b9bbb21ec71835e",
        "name": "Star Wars: Episode VIII - The Last Jedi ",
        "year": 2017,
        "price": 12.99
        "genre": {
            "_id": "5c056a634b9bbb21ec71835d",
            "name": "Fantasy",
            "__v": 0
        },
        "image": {
            "original": "public/img/original/image-1543860204518.jpg",
            "thumb": "public/img/thumb/thumb-image-1543860204518.jpg"
        },
        "__v": 0
    }
}
```
## DELETE /movies/:id

###### req:
*Token should be provided at Authorization header as Bearer Token, this Token was given to you @ POST /users/auth :* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA1NjFjYTRiOWJiYjIxZWM3MTgzNWEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzODU3MTY1LCJleHAiOjE1NDM4NjA3NjV9.xwGpP4n5JYe6SlKZlUHyztkT_lyJ9l9IdXWimVa5Uho

:id *You can get **id** @ GET /movies/ , or when you was creating genre @ POST /movies/*

###### res:
```
{
    "message": "Movie with id: 5c056fec4b9bbb21ec71835e was successfully deleted"
}
```
