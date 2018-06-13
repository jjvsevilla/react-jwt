## configuring frontend server
	npm i -g create-react-app
	create-react-app react-jwt
	cd react-jwt
	npm start

http://localhost:3000

## configuring backend server
	npm i -D babel-cli
	npm i -D babel-preset-es2015 babel-preset-stage-2
	npm i -D nodemon

http://localhost:3001/random-user

create express server
	"backend": "cd backend/ && nodemon server.js"

add logic for call api from the react component

install middlewares
	npm i cors
	npm i morgan
	npm i body-parser
	npm i jsonwebtoken
	npm i express-jwt
