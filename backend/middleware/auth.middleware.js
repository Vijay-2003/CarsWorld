import jwt from 'jsonwebtoken'

export const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No Token Found",
                type: "error",
                success: false
            })
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Or Expired Token",
            type: "error",
            success: false
        })
    }
}