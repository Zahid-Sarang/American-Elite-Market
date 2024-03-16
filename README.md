# Successfully Complete the Assignment Social Networking API with MongoDB 💻

## Links

### Deploy Link : https://american-elite.up.railway.app/
### Api Documentation Link : https://american-elite-api-docs.netlify.app/

## Features

- ✅ Create user profile
- ✅ Update user profile
- ✅ View profile
- ✅ Get all users profile
- ✅ Delete users profile
- ✅ Signup
- ✅ Login
- ✅ RefreshToken rotation
- ✅ Create post
- ✅ Update post
- ✅ View posts
- ✅ Delete post
- ✅ Following Mechanism
- ✅ Integration testing using jest and supertest




### Checklist for Building a Secure and Robust Node.js Application

- [ ] **Use JWT Tokens with RefreshToken and AccessToken Mechanism:** Securely transmit data with JWT tokens, utilizing refreshToken and accessToken for enhanced security.
  
- [ ] **Utilize Jest for Writing Integration Tests:** Ensure seamless interaction between application components using Jest for comprehensive integration testing.

- [ ] **Implement Express Validator for Request Validation and Security:** Safeguard against common security threats by validating requests and ensuring data integrity with Express Validator.

- [ ] **Adhere to SOLID Principles for Writing Clean Code:** Write maintainable and scalable code following SOLID principles, and enforce consistent formatting with tools like Prettier and ESLint.

- [ ] **Incorporate Error Handling Middleware for Better Error Management:** Enhance user experience and streamline debugging by implementing error handling middleware.

- [ ] **Utilize Cloudinary for Image Storage:** Securely store and manage images efficiently with Cloudinary's services.

- [ ] **Leverage TypeScript for Writing Bug-Free Code:** Improve code quality and minimize errors by using TypeScript for static typing and bug prevention.




## Setup Guide

### 1. Clone the repository
``` git clone https://github.com/Zahid-Sarang/American-Elite-Market.git ```

``` cd American-Elite-Market ``` 


### 2. Install dependencies
``` npm install ```


### 3. Generate keys
Run the following command to generate the necessary keys:
``` node script/generateKeys.mjs```


### 4. Configuration
Copy the `.env.example` file into `.env.development` for development environment.
Create a `.env.test` file for testing environment configuration.

### 5. Start the server
To run the server, execute the following command:
``` npm run dev ```


### 6. Running tests
To run tests, use the following command:
``` npm run test:watch ```


## API Documentation

### 1. Register User

```
### Endpoint
POST http://localhost:5502/auth/register
#### Request
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Fields:**
  - `userName` (string): Username of the user
  - `email` (string): Email address of the user
  - `password` (string): Password of the user
  - `bio` (string): Biography of the user 
  - `profileImage` (file): Profile image of the user 

#### Response
- **Status Code:** 201 OK
- **Body:**
json
{
    "id": "9ef6d2ba-342d-4eed-b48f-d69686efee19"
}
```

### 2. login User

```
### Endpoint
POST http://localhost:5502/auth/login

#### Request
- **Method:** POST
- **Content-Type:** Json
- **Fields:**
 
  - `email` (string): Email address of the user
  - `password` (string): Password of the user
 

#### Response
- **Status Code:** 200 OK
- **Body:**
json
{
    "id": "9ef6d2ba-342d-4eed-b48f-d69686efee19"
}
```

### 3. Update User

```
 Endpoint
PATCH http://localhost:5502/users
 Request
- Method: PATCH
- Content-Type:** multipart/form-data
- Fields:
  - `userName` (string): Username of the user
  - `bio` (string): Biography of the user 
  - `profileImage` (file): Profile image of the user 

 Response
- Status Code: 200 OK
- Body:
json
{
	"_id": "9ef6d2ba-342d-4eed-b48f-d69686efee19",
	"userName": "virat-kholi",
	"email": "zahidsarang@gmail.com",
	"password": "$2a$10$tCXf9f6OYMVdQcJLoTPx0u8iIcNxLew8GbLje5B.9FQqJIdOQCcoC",
	"bio": "i am cricketer and i have created huge record ",
	"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710235169/qmx1bsxpwp5udmmwji3p.webp",
	"createdAt": "2024-03-12T09:06:43.911Z",
	"updatedAt": "2024-03-12T09:19:29.926Z",
	"__v": 0
}
```

### 4. Get One User
```
 Endpoint
GET http://localhost:5502/users/:usersId
 Request
- Method: GET
 Response
- Status Code: 200 OK
- Body:
json
{

		"_id": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
		"userName": "zahid",
		"email": "zahid@gmail.com",
		"password": "$2a$10$FFf2C.xnoZBG2geG2BAb9Oi3/X48TUNitdfBOJhq1tIitnRje6qF.",
		"bio": "#rider-provide",
		"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710098716/by2wxdx6ibubkkbac8pz.jpg",
		"createdAt": "2024-03-10T19:25:16.460Z",
		"updatedAt": "2024-03-10T19:25:16.460Z",
		"__v": 0
	
}
```


### 5. Get All Users
```
 Endpoint
GET http://localhost:5502/users
 Request
- Method: GET
 Response
- Status Code: 200 OK
- Body:
json
[
	{
		"_id": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
		"userName": "zahid",
		"email": "zahid@gmail.com",
		"bio": "#rider-provide",
		"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710098716/by2wxdx6ibubkkbac8pz.jpg",
		"createdAt": "2024-03-10T19:25:16.460Z",
		"updatedAt": "2024-03-10T19:25:16.460Z"
	},
	{
		"_id": "9ef6d2ba-342d-4eed-b48f-d69686efee19",
		"userName": "virat-kholi",
		"email": "zahidsarang@gmail.com",
		"bio": "i am cricketer and i have created huge record ",
		"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710235169/qmx1bsxpwp5udmmwji3p.webp",
		"createdAt": "2024-03-12T09:06:43.911Z",
		"updatedAt": "2024-03-12T09:19:29.926Z"
	}
]
```



### 6. Create Post
```
 Endpoint
POST http://localhost:5502/posts
 Request
- Method: POST
- Content-Type: Json
- Fields:
  - `content` (string): description of the post
 

 Response
- Status Code: 201 OK
- Body:
json
{
	"id": "bdedd873-ad65-42c2-af1c-cd4288e89920"
}
```

### 7. Update Post
#### 🔴 note: only the creator of the post can update the post 
```
 Endpoint
PATCH http://localhost:5502/posts
 Request
- Method: PATCH
- Content-Type: Json
- Fields:
  - `content` (string): description of the post
 

 Response
- Status Code: 200 OK
- Body:
json
{
	"_id": "bdedd873-ad65-42c2-af1c-cd4288e89920",
	"content": "updated Post",
	"user": "9ef6d2ba-342d-4eed-b48f-d69686efee19",
	"timestamp": "2024-03-12T09:24:44.239Z",
	"__v": 0
}
```


### 8. Get All Post
```
 Endpoint
GET http://localhost:5502/posts
 Request
- Method: GET
 Response
- Status Code: 200 OK
- Body:
json
[
	{
		"_id": "efcb967a-a18d-4886-877f-8fd662f3483b",
		"content": "Hello My Name is Zahid I am Lookig for Full-Stack developer job",
		"user": {
			"_id": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
			"userName": "zahid",
			"email": "zahid@gmail.com",
			"password": "$2a$10$FFf2C.xnoZBG2geG2BAb9Oi3/X48TUNitdfBOJhq1tIitnRje6qF.",
			"bio": "#rider-provide",
			"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710098716/by2wxdx6ibubkkbac8pz.jpg",
			"createdAt": "2024-03-10T19:25:16.460Z",
			"updatedAt": "2024-03-10T19:25:16.460Z",
			"__v": 0
		},
		"timestamp": "2024-03-11T06:41:37.456Z",
		"__v": 0
	},
	{
		"_id": "1aa29413-a61a-40ca-98af-6a5168e92be5",
		"content": "updated Post",
		"user": {
			"_id": "c69f0f40-ff0d-4bec-8594-1e5b4c0d4336",
			"userName": "karan",
			"email": "karan@gmail.com",
			"password": "$2a$10$j3uHs5y4o2opt5Htpb403.cDWqB3RuRygNBvuO/a6ncxsWKUa4qzO",
			"bio": "#rider-provide",
			"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710139345/e7zwq4ahxchmpjul4hg8.jpg",
			"createdAt": "2024-03-11T06:42:26.189Z",
			"updatedAt": "2024-03-11T06:42:26.189Z",
			"__v": 0
		},
		"timestamp": "2024-03-12T07:53:21.350Z",
		"__v": 0
	}
]
```
### 9. Get One Post
```
 Endpoint
GET http://localhost:5502/posts/:postId
 Request
- Method: GET
 Response
- Status Code: 200 OK
- Body:
json
{
	"_id": "3e6523d2-114a-4684-b1f3-207aa829c9e9",
	"content": "Hello My Name is Zahid I am Lookig for Full-Stack developer job",
	"user": {
		"_id": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
		"userName": "zahid",
		"email": "zahid@gmail.com",
		"password": "$2a$10$FFf2C.xnoZBG2geG2BAb9Oi3/X48TUNitdfBOJhq1tIitnRje6qF.",
		"bio": "#rider-provide",
		"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710098716/by2wxdx6ibubkkbac8pz.jpg",
		"createdAt": "2024-03-10T19:25:16.460Z",
		"updatedAt": "2024-03-10T19:25:16.460Z",
		"__v": 0
	},
	"timestamp": "2024-03-10T19:25:28.980Z",
	"__v": 0
}
```


### 10. Delete Post
#### 🔴 note: only the creator of the post can delete the post 
```
 Endpoint
DELETE http://localhost:5502/posts/:postId
 Request
- Method: DELETE
 Response
- Status Code: 200 OK
- Body:
json
{
"post deleted"
}
```

### 11. Follow User

```
 Endpoint
POST http://localhost:5502/relationship/follow/:followingId
 Request
- Method: POST
- Content-Type: json
- Fields:
{
	"loggedInUserId":"9ef6d2ba-342d-4eed-b48f-d69686efee19"
}

#### Response
- Status Code:** 201 OK
- Body:
json
{
	"followerId": "9ef6d2ba-342d-4eed-b48f-d69686efee19",
	"followingId": "aa2955f6-d5f2-4078-ad66-a0f41ad6c9dc",
	"_id": "c58d3ce4-5fb3-42af-b729-50bbecce49b3",
	"__v": 0
}
```

### 12. UnFollow User

```
 Endpoint
POST http://localhost:5502/relationship/unfollow/:followingId
 Request
- Method: POST
- Content-Type: json
- Fields:
{
	"loggedInUserId":"9ef6d2ba-342d-4eed-b48f-d69686efee19"
}

#### Response
- Status Code:** 200 OK
- Body:
json
{
	"message": "unfollow user successfully"
}
```


### 13. Followers List

```
 Endpoint
GET http://localhost:5502/relationship/followers/userId
 Request
- Method: GEt
- Content-Type: 
#### Response
- Status Code:** 200 OK
- Body:
json
[
	{
		"_id": "8301fe84-732d-4af4-954b-6932dfc460a9",
		"followerId": {
			"_id": "aa2955f6-d5f2-4078-ad66-a0f41ad6c9dc",
			"userName": "jhon",
			"email": "jhon@gmail.com",
			"bio": "#rider-provide",
			"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710098628/difmuqsdwrczknfv5zln.webp",
			"createdAt": "2024-03-10T19:23:49.243Z",
			"updatedAt": "2024-03-10T19:23:49.243Z",
			"__v": 0
		},
		"followingId": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
		"__v": 0
	},
	{
		"_id": "9441c7a8-2dd0-40b4-b5a1-ffa38a6195bd",
		"followerId": {
			"_id": "c69f0f40-ff0d-4bec-8594-1e5b4c0d4336",
			"userName": "karan",
			"email": "karan@gmail.com",
			"bio": "#rider-provide",
			"profileImage": "http://res.cloudinary.com/ddb5tomqt/image/upload/v1710139345/e7zwq4ahxchmpjul4hg8.jpg",
			"createdAt": "2024-03-11T06:42:26.189Z",
			"updatedAt": "2024-03-11T06:42:26.189Z",
			"__v": 0
		},
		"followingId": "a6fe3ecf-ee6b-4748-928b-657d174c2730",
		"__v": 0
	}
]
```

### Api testing snapshot
![Screenshot 2024-03-12 at 3 28 02 PM](https://github.com/Zahid-Sarang/American-Elite-Market/assets/88975408/747b8a01-8552-4445-a596-2ce3265d97fd)


## Thank You 👍
