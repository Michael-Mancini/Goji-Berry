const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const User = require('../models/User');

router.get('/', (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.post('/', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        age: req.body.age,
        day: req.body.day,
        message: req.body.message
    });

    newUser.save((err, u) => {
        if(err) {
            res.json(err);
        } else {
            res.json({msg: 'User added successfully'});
        }
    });
});

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id},
    {
        $set:{
            username: req.body.username,
            age: req.body.age,
            day: req.body.day,
            message: req.body.message
        }
    }, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.delete('/:id', (req, res) => {
    User.remove({_id: req.params.id}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;