import jwt from 'jsonwebtoken'

const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) return null
    const [type, token] = authorizationHeader.split(' ')
    if (type !== 'Bearer' || !token) return null
    return token
}

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    const token = extractBearerToken(req.headers.authorization || req.headers.Authorization)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decode.role !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Forbidden: doctor access only' })
        }
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}

export default authDoctor;