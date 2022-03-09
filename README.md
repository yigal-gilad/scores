# Users and scores api
## Main url
Send requests to this url:
https://users-and-scores.herokuapp.com
## Features
- Create new users
- Get specific user
- Update users usernames
- Update users score
- Update users device id
- 
## Tech used
- Node.js
- Express
- MongoDB
- Mongoose
- Joi and Celebrate for request valdations

## Endpints
#### Create new user
---
```http
POST /createuser
```
#### Request
body:
| Key | Type | Reqiered | Description |
| ------ | ------ | ------ | ------ |
| username | string | true | name for the new user |
### Response
```javascript
{
    "_id": "62288da600ecc9137860551e",
    "name": "john doe",
    "score": 0,
    "device_id": "62288da600ecc9137860551d",
    "__v": 0
}
```
#### Get user
---
```http
GET /getuser
```
#### Request
parameters:
| Key | Type | Reqiered | Description |
| ------ | ------ | ------ | ------ |
| username | string | true | current name of new user |
| device_id | string | true | current name of new user |
### Response
```javascript
{
    "_id": "62288da600ecc9137860551e",
    "name": "john doe",
    "score": 0,
    "device_id": "62288da600ecc9137860551d",
    "__v": 0
}
```
#### Update user
---
```http
POST /updateuser
```
#### Request
body:
| Key | Type | Reqiered | Description |
| ------ | ------ | ------ | ------ |
| username | string | true | current name of the user |
| device_id | string | true | current user device id |
| newusername | string | flase | new name for the user to update |
| newscore | number | false | new score for the user to update |
| new_device_id | string | false | new device id for the user to update |
### Response
```javascript
{
    "_id": "62288da600ecc9137860551e",
    "name": "john doe",
    "score": 0,
    "device_id": "62288da600ecc9137860551d",
    "__v": 0
}
```
