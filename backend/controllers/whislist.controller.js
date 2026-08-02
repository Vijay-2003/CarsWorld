import User from '../models/user.model.js';
import Car from '../models/cars.model.js'

export const WhislistCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await Car.findById(carId);

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                type: "error",
                success: false
            })
        }

        if (user.wishlist.some((wishlistid) => wishlistid.equals(carId))) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "Car already exists in wishlist.",
            });
        }

        await user.wishlist.push(carId);
        await user.save();

        res.status(200).json({
            success: true,
            type: "success",
            message: "Car added to wishlist successfully.",
            wishlist: user.wishlist,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
}

export const GetUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate({
            path: "wishlist",
            select: "name car_image",
            populate: {
                path: "brand",
                select: "brand_logo brand_name"
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                type: "error",
                success: false
            })
        };

        res.status(200).json({
            message: "Whislist Of User Found",
            type: "success",
            success: true,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
            wishlist: user.wishlist
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

export const DeleteAWhislist = async (req, res) => {
    try {

        const carId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "User not found.",
            });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Car not found.",
            });
        }

        // Check if car exists in wishlist
        if (!user.wishlist.some((wishlistid) => wishlistid.equals(carId))) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "Car is not in your wishlist.",
            });
        }

        // Remove car from wishlist
        user.wishlist = user.wishlist.filter((wishlistid) => !wishlistid.equals(carId));

        await user.save();

        return res.status(200).json({
            success: true,
            type: "success",
            message: "Car removed from wishlist successfully.",
            wishlist: user.wishlist,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
}