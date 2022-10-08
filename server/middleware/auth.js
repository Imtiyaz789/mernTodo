import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const isAuthenticated = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = authorization.split(' ')[1]

            //verifying token
            const userId = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // get user from token
            req.user = await User.findById(userId).select('-pwd');
            console.log('req user', req.user)
            next()
        } catch (error) {
            return res.status(401).json({
                message: 'User Not Authenticated',
            })
        }
    }
    // when token not found so will show below message
    if (!token) {
        return res.status(401).json({
            message: 'User Not Authenticated, No Token',
        })
    }
}

export default isAuthenticated

