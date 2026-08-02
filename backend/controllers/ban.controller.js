import Ban from '../models/banneduser.model.js'

export const GetBannedUser = async (req, res) => {
    try {
        const users = await Ban.find();
        res.status(200).json({
            message: "Banned Users",
            success: true,
            users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
}