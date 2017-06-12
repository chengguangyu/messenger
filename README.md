# Messenger
The messenger is written in Node.js and Angular. It allows you to post and list messages.

The messenger server is written in Node.js, it simply exposes several REST APIs for posting and retrieving messages. The messenger UI is written in Angular 1.5.0 and Bootstrap 3.3.7.

## Install

You can get the source code of the messenger by cloning this repository with `git clone https://github.com/chengguangyu/messenger.git`.

Then perform the following task to install Node.js modules required by the server.

```shell
npm install
```

Then install modules required by the UI:

```shell
bower install
```

## Start

You can start the messenger with `node app.js` or with `node app.js &`. The latter command will run the messenger server in background.

## Connect to the Messenger UI

Type the following URL in your browser: 

```shell
http://localhost:6262/
```

## REST APIs

The messenger exposes the following REST APIs.

### Get a list of users

This REST API will retrieve a list of users. All users are hard-coded in a config file.

URL

```shell
GET /api/users
```

This API does not require a request body.

On success an HTTP response code 200 will be returned and the body will contain a list of users.

### Get messages for a user

This REST API will retrieve messages received by a specific user.

URL

```shell
GET /api/messenger/users/${UserID}
```

This API does not require a request body.

On success an HTTP response code 200 will be returned and the body will contain a list of messages.

### Get a message by message id

This REST API will retrieve a message by a specified id.

URL

```shell
GET /api/messenger/messages/${MessageID}
```

This API does not require a request body.

On success an HTTP response code 200 will be returned and the body will contain a message.

### Post a message to a user

This REST API will send a message to a user.

URL

```shell
PUT /api/messenger
```

The request body must contain the following JSON.

```shell
{
    "subject": a string representing the message's subject
    "content": a string representing the message's content
    "receiver": a string that represents the user who will receive this message
}
```

On success an HTTP response code 200 will be returned and the body will contain the message sent.

### Delete a message

This REST API will delete a message.

URL

```shell
DELETE /api/messenger/${MessageID}
```
This API does not require a request body.

On success an HTTP response code 200 will be returned.
