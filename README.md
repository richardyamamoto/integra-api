# How to test
First of all I'm using **yarn** instead of **npm**. So run `yarn` inside the application directory to install all dependencies.

## Database
I'm using docker to create a postgres image.
To build the service run:

```bash
  $ docker run --name integra-database -e POSTGRES_PASSWORD=integra -p 5432:5432 -d postgres
```

**Note:**
For a better visualization, I'm using a GUI to postgres/MySql, etc. [Postbird](https://electronjs.org/apps/postbird)

---
## JSON

For a better way to test the requests, I'm using [Insomnia](https://insomnia.rest/) as a Graphic User Interface

### Requests
For this project, the application is listening the port 3333 from localhost

>localhost:3333

#### Create User

> POST Request > localhost:3333/users

req.body:
```json
{
	"name":"Name",
	"email":"email",
	"cpf": "cpf_number",
	"phone": "phone_number",
	"password": "password"
}
```
#### List User

> GET Request > localhost:3333/users

#### Login

>POST Request > localhost:3333/sessions

req.body:
```json
{
	"email": "email",
	"password": "password"
}
```

#### Delete User

> DELETE Request > localhost:3333/users/:id

**Note:**
To delete, the user must be in session.

In this project the bearer token was used to validate the session. To test the request you must login with any user, copy the token and paste into the header authorization field.

#### Update User

To update, the user must be in session too.

> PUT Request > localhost:3333/users

req.body:
```json
{
	"name": "Name",
	"email":"email",
	"cpf":"cpf_number",
	"phone": "phone_number",
  "oldPassword":"old_password //this are not required", 
  "password":"new_password //this are not required",
  "confirmPassword":"new_password_confirmation //this are not required"
}
```

