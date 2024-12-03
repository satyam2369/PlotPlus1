const express = require('express');
const Admin = require('../model/admin');
var router = express.Router();

// const bcrypt = require('bcrypt');

const { createToken, getDataFromToken } = require('../services/userService');

router.get('/', function (req, res, next) {
    res.json("hello there");
});


router.post('/adminLogin', async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const check = await Admin.findOne({ email: email, password: password });

        if (check) {
            const token = createToken({ name: check.name, uid:check._uid  });
            res.cookie("uid", token, { httpOnly: true, credentials: true }); // Set cookie
            return res.json({
                success: true,
                message: "Login successful",
                name: check.name
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        next(error);
    }
});


router.get('/checkLogin', async function (req, res, next) {
    const token = req.cookies.uid;
    if (token == null) return res.json(null);

    console.log("hello_token");
    const AdminData = getDataFromToken(token);
    console.log(AdminData);
    // console.log(getDataFromToken);
    res.json(AdminData);
})

router.get('/logout', async function (req, res) {
    const token = req.cookies.uid;
    // Clear the cookie by name
    res.clearCookie('uid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/' // Path where the cookie was originally set
    })
    res.json({ success: true });
})

module.exports = router;