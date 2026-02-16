const express = require('express');
const { handleStdSignup, handleStdLogin, getStdDetails, handleUpdateStdName, handleUpdateStdPassword,handleForgetPassword,handleResetPassword } = require('../controllers/stdController');
const { auth } = require('../auth/auth');

const stdRouter = express.Router();

//testing api
stdRouter.get('/', (req, res) => {
    return res.json({ message: 'Student router is here' });
});

//signup std route
stdRouter.post('/signup', handleStdSignup)
stdRouter.post('/login', handleStdLogin)

//std details -->perform authication
stdRouter.get('/get', auth, getStdDetails);

//std update name and password
stdRouter.patch('/updatename', auth, handleUpdateStdName)
stdRouter.patch('/updatepassword', auth, handleUpdateStdPassword)

//password Forget and Reset 
stdRouter.post('/forgetpassword',handleForgetPassword)
stdRouter.patch('/resetpassword',handleResetPassword)

//delete account next here

module.exports = stdRouter;
