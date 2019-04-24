# my-blog

> Discussion Blog

## Table of contents

- [Installing](#installing)
- [Starting](#starting)
- [Built With](#built-with)
- [Addons](#addons)
- [Application structure](#application-structure)
- [Application routes](#application-routes)
- [Author](#author)
- [License](#license)

## Installing

Installing server dependencies

```
cd server && npm i
```

Installing client dependencies

```
cd client && npm i
```

## Starting
Starting server

```
cd server && npm start
```

Starting client

```
cd client && ng s --open
```

## Built With

### Server
* [ExpressJS](https://github.com/expressjs/express) - web framework for MVC architecture/REST services

### Client
* [Angular 7](https://github.com/angular) - SPA framework
	* [ngx-toastr](https://github.com/scttcper/ngx-toastr) - ToastrModule
	* [AngularEditor](https://github.com/kolkov/angular-editor) - A simple native WYSIWYG editor for Angular 6+, 7+
* [Bootstrap](https://github.com/twbs/bootstrap) - front-end web framework

## Addons
* jsons - exported collections as json files for users, posts and comments
	* Importing: Just start ```populate.cmd``` file under Windows, sorry about Linux users

## Application structure
The application have three main parts

* Public part
	* Guests can access home page
	* Guests can access about page
	* Guests can register
	* Guests can login
	* Guests can view post
	* Guests can search posts 
* Private part
	* Regular users can logout
	* Regular users can change profile picture
	* Regular users can like post
	* Regular users can comment post
	* Regular users can edit their own comments
	* Regular users can delete their own comments
* Administration part
	* Admin users can set admin role to regular user
	* Admin users can add/edit user info
	* Admin users can create post
	* Admin users can edit their own posts
	* Admin users can delete their own posts
	* Admin users can delete all comments in their own posts

## Application routes
The application have two type of routes

* Server
	* Auth
		* [*http://localhost:65535*]/auth/allRegular - [GET] - return all users, which don't have Admin role
		* [*http://localhost:65535*]/auth/signin - [POST] - authenticate user
		* [*http://localhost:65535*]/auth/signup - [POST] - create new user with regular role, authenticate
		* [*http://localhost:65535*]/auth/setadmin/:id - [GET] - add admin role to regular user
		* [*http://localhost:65535*]/auth/get/:id - [GET] - return user by id
		* [*http://localhost:65535*]/auth/addinfo/:id - [POST] - add info to user by id
	* Comments
		* [*http://localhost:65535*]/comment/create - [POST] - create new comment
		* [*http://localhost:65535*]/comment/get/:id - [GET] - return comment by id
		* [*http://localhost:65535*]/comment/edit/:id - [POST] - edit comment by id
		* [*http://localhost:65535*]/comment/delete/:id - [POST] - delete comment by id
	* Posts
		* [*http://localhost:65535*]/post/create - [POST] - create new post
		* [*http://localhost:65535*]/post/all - [GET] - return all posts
		* [*http://localhost:65535*]/post/get/:id - [GET] - return post by id
		* [*http://localhost:65535*]/post/edit/:id - [POST] - edit post by id
		* [*http://localhost:65535*]/post/delete/:id - [POST] - delete post by id
		* [*http://localhost:65535*]/post/search/:search - [GET] - search posts by phrase
		* [*http://localhost:65535*]/post/like/:id - [GET] - add like to post
		* [*http://localhost:65535*]/post/archives/:month/:year - [GET] - return all posts by given month and year
	* Static
		* [*http://localhost:65535*]/static/images/:file - [GET] - return image by server path
		* [*http://localhost:65535*]/static/avatars/:file - [GET] - return image by server path
	* Upload
		* [*http://localhost:65535*]/upload/images - [POST] - upload image
		* [*http://localhost:65535*]/upload/changeProfilePicture - [POST] - upload image
* Client
	* [*http://localhost:4200*] - Redirect to home component
	* [*http://localhost:4200*]/home - Render view with all posts and archives
	* [*http://localhost:4200*]/about - Render view with information about project
	* [*http://localhost:4200*]/auth/signin - Render view with login form for log in user
	* [*http://localhost:4200*]/auth/signup - Render view with register form for registering user
	* [*http://localhost:4200*]/auth/changePicture - Render view with form for changing user picture
	* [*http://localhost:4200*]/auth/setToAdmin - Render view with users for changing role
	* [*http://localhost:4200*]/auth/addInfo - Render view with form for adding information about user(author)
	* [*http://localhost:4200*]/auth/info/:id - Render view with information about user(author)
	* [*http://localhost:4200*]/post/:id - Render view with post and form for commenting current post
	* [*http://localhost:4200*]/post/create - Render view with form for creating post
	* [*http://localhost:4200*]/post/edit/:id - Render view with form for editing post
	* [*http://localhost:4200*]/post/delete/:id - Render view with form for deleting post
	* [*http://localhost:4200*]/post/search/:search - Render view with searched posts
	* [*http://localhost:4200*]/post/archives/:month/:year - Render view with posts limited by month and year
	* [*http://localhost:4200*]/comment/edit/:id - Render view with form for editing comment
	* [*http://localhost:4200*]/comment/delete/:id - Render view with form for deleting comment

## Author

**Krasimir Stefanov** - [*Github*](https://github.com/kraskoo/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details