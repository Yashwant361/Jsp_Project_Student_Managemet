
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers);

        const token = req.headers.authorization?.split(' ')[1];

        // console.log('token =', token);

        if (!token) {
            return res.status(400).json({ message: 'Provide Token' })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();

        // console.log('payload=', payload);

    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = { auth }