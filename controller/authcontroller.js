const mongoose = require('mongoose');
const authmodel = require('../model/authmodel');
const bcrypt = require('bcryptjs');


// ----------------singup 

exports.authController = async (req, res) => {
    try {

        const email = req.body.email;
        console.log(email);
        const data = await authmodel.find({ email })
        console.log("...", data)
        if (data.length == 0) {
            const auth = new authmodel({
                userName: req.body.userName,
                phone: req.body.phone,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            })
            const result = await auth.save();

            res.status(201).json({
                message: "ragistration successfully....",
                status: 201,
                data: result

            })

        }
        else {
            res.status(409).json({
                message: "already exist...!",
                status: 409
            })
        }


    } catch (error) {
        console.log("error...", error)
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}


// ----------------login 
exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const useremail = await authmodel.findOne({ email: email})
        if (useremail) {
            const token = await useremail.generateauthtoken()
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 3000000 * 3),
                httpOnly: true
            })
            console.log("token",token)
            bcrypt.compare(password, useremail.password, (err, useremail) => {
                if (err) throw err
                if (useremail) {
                    return res.status(200).json({
                        message: "login successfully",
                        token: token,
                        email: email
                    });

                }
                else {
                    return res.status(401).json({
                        message: "invalid password and user name",
                        status: 401
                    });
                }
            })
        }
        else {
            res.status(404).json({
                message: "invalid password and user name",
                status: 404
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

// --------
exports.getuserById = async (req, res) => {
    try {

        const userdataData = await authmodel.findById({ _id: req.params.id });
        console.log("userdataData", userdataData);
        res.status(200).json({
            message: "data get successfully...!",
            status: 200,
            data: userdataData
        })
    } catch (error) {
        console.log("error...", error);
        res.status(500).json({
            message: "something went wrong...!",
            status: 500,

        })
    }
}


// LOGOUT

exports.logout = async (req, res) => {
    try {
        req.user.token = []
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "logout Successfully...!!!",
            status: 201
        })
        
    } catch (error) {

        res.status(401).json({
            message: "please try again....!!!",
            status: 401
        })
    }
}
