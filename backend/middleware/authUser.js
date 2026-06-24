import jwt from 'jsonwebtoken'

const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) return null
    const [type, token] = authorizationHeader.split(' ')
    if (type !== 'Bearer' || !token) return null
    return token
}

// user authentication middleware
const authUser = async (req, res, next) => {
    const token = extractBearerToken(req.headers.authorization || req.headers.Authorization)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decode.role !== 'user') {
            return res.status(403).json({ success: false, message: 'Forbidden: user access only' })
        }
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}

export default authUser;