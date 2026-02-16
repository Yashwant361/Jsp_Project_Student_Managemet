const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const STD = require('../models/stdModule');
const crypto = require('crypto');

const handleStdSignup = async (req, res) => {
    try {

        if (req.body === undefined) {
            return res.status(400).json({ message: 'Details needed to create Student Profile' });
        }
        const { email, name, password, age } = req.body;

        if (!email || !name || !password || !age) {
            return res.status(400).json({ message: 'All input fields are Mandatory' });
        }

        const isStd = await STD.findOne({ email });

        if (isStd) {
            return res.status(409).json({ message: 'Email already existed' });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const isCreated = await STD.insertOne({ email, name, age, password: hashedPass });

        return res.status(201).json({ message: 'Student Accout Created Successfully' });

    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error from SignUp' });
    }
}

const handleStdLogin = async (req, res) => {
    try {
        if (req.body === undefined) {
            return res.status(400).json({ message: 'Login details are required' });
        }
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are mandatory' });
        }

        const isStd = await STD.findOne({ email });
        if (!isStd) {
            return res.status(404).json({ message: 'Student not found' });
        }

        //Step 1 : compare password
        const isMatch = await bcrypt.compare(password, isStd.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Details' });
        }

        //Step 2: create token here
        const token = jwt.sign(
            {
                email,
                _id: isStd._id
            },
            // getting this are from .env file`
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        )


        //adding the token here
        return res.status(200).json(
            {
                message: 'Login Successfull', token: token
            }
        )


    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error from Login' });
    }
}
const getStdDetails = async (req, res) => {
    try {
        const { _id } = req.payload;

        const isStd = await STD.findById(_id, { password: 0 });

        if (!isStd) {
            return res.status(404).json({
                message: 'Token not valid because account has been Deleted'
            });
        }
        return res.status(200).json({ std: isStd });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const handleUpdateStdName = async (req, res) => {
    try {
        const { _id } = req.payload;
        if (req.body === undefined) {
            return res.status(400).json({ message: 'Login details are required to update Name' });
        }
        const { name } = req.body

        const isStd = await STD.findById({ _id });
        if (!isStd) {
            return res.status(401).json({ message: 'not valid acc deleted' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Input filed is Mandatory' });
        }
        if (name === isStd.name) {
            return res.status(400).json({ message: 'New Name is Same as Previous' });
        }

        //change name
        isStd.name = name;
        await isStd.save(); // use to save inside the db
        return res.status(200).json({ message: 'Name Updated Successfully' });


    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const handleUpdateStdPassword = async (req, res) => {
    try {
        const { _id } = req.payload;

        const isStd = await STD.findById({ _id });

        if (!isStd) {
            return res.status(401).json({ message: 'not valid acc deleted' });
        }

        if (req.body == undefined) {
            return res.status(400).json({ message: 'Login details are required to update Password' });
        }
        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({ message: 'Input field Mandatory' });
        }

        const isMatched = await bcrypt.compare(password, isStd.password);

        if (!isMatched) {
            return res.status(401).json({ message: 'Current password is wrong' });
        }
        if (password === newPassword) {
            return res.status(400).json({ message: 'New Password cannot be same as current password' });
        }
        const hashedPass = await bcrypt.hash(newPassword, 10);

        //change password
        isStd.password = hashedPass;
        await isStd.save(); // use to save inside the db
        return res.status(200).json({ message: 'Password Updated Successfully' });


    } catch (err) {
        console.log("ERROR =>", err);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const handleForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is Required' })
        }

        const isStd = await STD.findOne({ email });

        if (!isStd) {
            return res.status(404).json({ message: 'Student Not Found' })
        }

        //Generate Random Password
        const resetToken = crypto.randomBytes(32).toString('hex');

        isStd.resetToken = resetToken;
        isStd.resetTokenExpiry = Date.now() + 10 * 60 * 1000; //Valid for 10 Mintues

        await isStd.save();

        return res.status(200).json({
            message: 'Password reset token generated',
            resetToken: resetToken
        });

    } catch (err) {
        console.log("ERROR =>", err);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const handleResetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        // console.log(req.body);


        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new Password required' })
        }

        const isStd = await STD.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }  //$gt operator used for comparsion
        });
        if (!isStd) {
            return res.status(400).json({ message: 'Invalid or Expired Token' })
        }

        const hashedPass = await bcrypt.hash(newPassword, 10);

        isStd.password = hashedPass;
        isStd.resetToken = undefined;
        isStd.resetTokenExpiry = undefined;

        await isStd.save();
        return res.status(200).json({ message: 'Password reset Successfully' })
    }
    catch (err) {
        // console.log("ERROR =>", err);
        return res.status(500).json({ message: 'Internal server error' })
    }
}


// delete account




module.exports = {
    handleStdSignup,
    handleStdLogin,
    getStdDetails,
    handleUpdateStdName,
    handleUpdateStdPassword,
    handleForgetPassword,
    handleResetPassword
}

//api to get user details