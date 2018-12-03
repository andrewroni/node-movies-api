# node-movies-api

# Task:

Реализовать REST api для портала по прокату фильмов
используя express, mongoDB , mongoose.

Структура проекта на свое усмотрение, но  чем «красивее» и читабельнее, тем лучше.

endpoint /users:
POST /users - возможность регистрации пользователя (пароль хешировать с помощью bcrypt)
POST /users/auth - авторизация пользователя, по мейлу и паролю, в ответ мы должны получить JWT - токен.
GET /users/ - вывести всех пользователей(скрывая поле password), только для пользователя, предоставившего валидный JWT token
GET /users/:id - только с авторизацией аналогичной выше, вывести одного пользователя по id, скрывая поле password


Объект user должен иметь:
id
name  - минимальная длина 5, максимальная 25 символов
email - минимальная длина 8, максимальная 50 символов
password

При вводе неверных данных, пользователю в ответе от API в виде JSON должна выводиться информация об ошибке, к примеру «name must be at least 5 letters long»

endpoint /genres :
GET /genres (вывод всего списка жанров),
GET /genres/:id - вывод жанра по id
POST /genres - добавление нового жанра,
DELETE /movies/:id - удаление жанра по id

Объект genres должен иметь только id и name (название жанра)

endpoint /movies :
GET /movies (вывод всего списка фильмов)
GET /movies/:id - вывод фильма по id
POST - добавление нового фильма,
DELETE /movies/:id - удаление фильма по id, тоже нужно быть авторизованным

Объект movies должен иметь:

id
name   от 1 до 5 символов
year	   только 4 цифры
price - только цифры, любое количество
genre: id жанра
image: постер фильма.  после загрузки оригинала, он должен быть обрезан до размера 100x200, с сохранением оригинала на сервере. Максимальный размер загружаемого изображения - 2mb

при выводе объекта movies через api, genre должно выводить соответствующий жанр полностью обьектом, а не только его id
то есть использовать аналог JOIN из SQL

# Requests Example
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
    "message": "User succesfuly created. Now you can login."
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
    "message": "Genre Fantasy was succesfuly add",
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
    "message": "Genre with id: 5c056a634b9bbb21ec71835d was succesfuly deleted"
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
        "genre": "{ _id: 5c056a634b9bbb21ec71835d, name: 'Fantasy' }",
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
    "genre": "{ _id: 5c056a634b9bbb21ec71835d, name: 'Fantasy' }",
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
  "image": **image should be atteched as a form-data**
}
```


###### res:
```
{
    "message": "Movie: Star Wars: Episode VIII - The Last Jedi  was succesfuly add",
    "movie": {
        "_id": "5c056fec4b9bbb21ec71835e",
        "name": "Star Wars: Episode VIII - The Last Jedi ",
        "year": 2017,
        "price": 12.99,
        "genre": "5c056a634b9bbb21ec71835d",
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

:id *You can get **id** @ GET /genres/ , or when you was creating genre @ POST /genres/*

###### res:
```
{
    "message": "Movie with id: 5c056fec4b9bbb21ec71835e was succesfuly deleted"
}
```
