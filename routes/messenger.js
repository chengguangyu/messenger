/*
 * @(#)messenger.js
 */

/*
 * Author: Chengguang Yu
 * Created: 2017/06/06
 * Description: The messenger route
 */
var express = require('express');
var moment = require('moment');
var uuid = require('uuid');

var router = express.Router();

// In-memory message store
var messageStore = [];

// Get the current time's milliseconds
function getMilliseconds() {
	return Number(moment().format('x'));
}

function createMessage(receiver, subject, content) {
    var msg = {
        id: uuid.v4(),
        receiver: receiver,
        subject: subject,
        content: content,
        created: getMilliseconds()
    };

    messageStore.push(msg);

    return msg;
}

function getMessages(userid) {
    var messages = [];

    for (var i = 0; i < messageStore.length; i++) {
        if (userid === messageStore[i].receiver) {
            messages.push(messageStore[i]);
        }
    }

    return messages;
}

function getMessage(id) {
    for (var i = 0; i < messageStore.length; i++) {
        if (id === messageStore[i].id) {
            return messageStore[i];
        }
    }

    return null;
}

function deleteMessage(id) {
    for (var i = 0; i < messageStore.length; i++) {
        var msg = messageStore[i];
        if (id === msg.id) {
            messageStore.splice(i, 1);
            return msg;
        }
    }

    return msg;
}

router.get('/users/:userid', function(req, res, next) {
    var messages = getMessages(req.params.userid);

    res.json({
        success: true,
        message: 'Your request has been processed successfully',
        data: messages
    });
});

router.get('/messages/:msgid', function(req, res, next) {
    var msg = getMessage(req.params.msgid);

    res.json({
        success: true,
        message: 'Your request has been processed successfully',
        data: msg
    });
});

router.put('/', function(req, res, next) {
    var msg = createMessage(req.body.receiver, req.body.subject, req.body.content);

    res.json({
        success: true,
        message: 'A new message has been posted',
        data: msg
    });
});

router.delete('/:id', function(req, res, next) {
    var messages = deleteMessage(req.params.id);

    res.json({
        success: true,
        message: 'The message has been deleted',
    });
});

module.exports = router;
