'use strict';

require('dotenv').config();
const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const UsersRouter = express.Router();
const { UsersModel } = require('../models/index'); // destruction :when we export.module obj contain several items, we have to put it in { } because its more than one to specifiy the required requested



UsersRouter.post("/signup", createUsers);
UsersRouter.get("/signin", getUsers);


async function createUsers(req, res) {
    let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await UsersModel.create({
        username: username,
        password: hashedPassword
    });
    res.status(201).json(record);
};

async function getUsers(req,res) {
    if (req.headers.authorization) {
        let headersParts = req.headers.authorization.split(" ");// ['Basic','c2hpaGFiOjEyMw==']
        // let encodedValue = headersParts[1];
        let encodedValue = headersParts.pop();
        let decodedValue = base64.decode(encodedValue);//username:password
        let [username, password] = decodedValue.split(":");
        const user = await UsersModel.findOne({ where: { username: username } })
        // console.log('user from DB ', user);
        const validUser = await bcrypt.compare(password, user.password);
        if (validUser) {
            res.status(200).json({ user });
        } else {
            res.status(500).send("wrong username or password");
        }

    } else {
        res.status(500).send("no username or password as inserted");
    }
}

module.exports = UsersRouter;