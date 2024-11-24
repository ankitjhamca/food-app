const jwt = require('jsonwebtoken')

const verifyToken = async (req, res,next) => {
    try {

        const token = res.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SEC)

        if (!decoded) {
            return res.status(404).json({ success: false, message: "Unauthorized." })
        }
        
        req.id = decoded.id;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

module.exports = verifyToken
