import User from '../models/user.model.js'
import UserReview from '../models/userreview.model.js' //user review model
import Review from '../models/adminreview.model.js' // admin review model
import Car from '../models/cars.model.js'

// user add review model
export const AddUserReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const { id } = req.params;
        const userId = req.user.id;
        const car = await Car.findById(id);

        const alreadyReviewed = await UserReview.findOne({
            user: userId,
            car: id,
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "You have already reviewed this car."
            });
        }

        const userreview = await UserReview.create({
            user: userId,
            car: id,
            rating,
            review
        })

        car.user_reviews.push(userreview._id);
        await car.save();

        const populatedReview = await UserReview.findById(userreview._id)
            .populate("user")
            .populate({
                path: "car",
                populate: {
                    path: "brand"
                }
            });

        res.status(200).json({
            success: true,
            type: "success",
            message: "User Review Added",
            userreview: populatedReview
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

export const GetReviewByUser = async (req, res) => {

    try {
        const userId = req.user.id;
        const reviews = await UserReview.find({ user: userId }).
            populate({
                path: "car",
                select: "name car_image",
                populate: {
                    path: "brand",
                    select: "brand_name brand_logo"
                }
            }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "User Reviews Fetched",
            success: true,
            reviews
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

export const GetCarReviews = async (req, res) => {
    try {

        const { id } = req.params;

        const car = await Car.findById(id).populate({
            path: "user_reviews",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "user",
                select: "name avatar"
            }
        });

        if (!car) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Car not found"
            });
        }

        return res.status(200).json({
            success: true,
            type: "success",
            reviews: car.user_reviews
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

export const GetAllReviews = async (req, res) => {
    try {

        const reviews = await UserReview.find()
            .populate({
                path: "user",
                select: "name avatar"
            })
            .populate({
                path: "car",
                select: "name car_image"
            })

        res.status(200).json({
            message: "All Reviews Fetched",
            type: "success",
            success: true,
            reviews
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

export const UpdateUserReview = async (req, res) => {
    try {

        const { id } = req.params; // Review ID
        const { rating, review } = req.body;
        const userId = req.user.id;

        const userReview = await UserReview.findById(id);

        if (!userReview) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Review not found",
            });
        }

        if (userReview.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                type: "error",
                message: "You can only update your own review.",
            });
        }

        if (rating) userReview.rating = rating;
        if (review) userReview.review = review;

        await userReview.save();

        return res.status(200).json({
            success: true,
            type: "success",
            message: "Review updated successfully.",
            review: userReview,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
};

export const DeleteUserReview = async (req, res) => {
    try {

        const { id } = req.params; // Review ID
        const userId = req.user.id;

        const userReview = await UserReview.findById(id);

        if (!userReview) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Review not found",
            });
        }

        if (userReview.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                type: "error",
                message: "You can only delete your own review.",
            });
        }

        // Remove review reference from the car
        await Car.findByIdAndUpdate(userReview.car, {
            $pull: {
                user_reviews: userReview._id,
            },
        });

        // Delete review
        await UserReview.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            type: "success",
            message: "Review deleted successfully.",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
};