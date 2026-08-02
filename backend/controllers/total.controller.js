import Brand from "../models/brand.model.js";
import User from "../models/user.model.js";
import Car from '../models/cars.model.js'
import Ban from '../models/banneduser.model.js'
import UserReview from '../models/userreview.model.js'

export const GetTotalData = async (req, res) => {
    try {

        // counts
        const users = await User.countDocuments();
        const brands = await Brand.countDocuments();
        const cars = await Car.countDocuments();
        const bannedusers = await Ban.countDocuments();
        const reviews = await UserReview.countDocuments();

        // recent users
        const recentusers = await User.find().sort({ createdAt: -1 }).limit(5).select("name avatar email isVerified createdAt");

        // recent brands 
        const recentbrands = await Brand.find().sort({ createdAt: -1 }).limit(6).select("brand_name brand_logo createdAt");

        // recent cars
        const recentcars = await Car.find().sort({ createdAt: -1 }).limit(6).populate("brand", "brand_logo").select("name car_image createdAt");

        const getupcomingcars = await Car.find({status: "Upcoming"}).limit(6).populate("brand", "brand_logo brand_name").select("name car_image");

        // cars by status
        const carsByStatus = {
            available: await Car.countDocuments({ status: "Available" }),
            upcoming: await Car.countDocuments({ status: "Upcoming" }),
            discontinued: await Car.countDocuments({ status: "Discontinued" }),
        };

        // recent banned users
        const recentbannedusers = await Ban.find().sort({ createdAt: -1 }).limit(5).select("email createdAt");

        // recent reviews
        const recentreviews = await UserReview.find().sort({ createdAt: -1 }).limit(6).populate("user", "name avatar email").populate("car", "name car_image");

        res.status(200).json({
            message: "Total Data Fetched",
            success: true,
            total: {
                users: users,
                brands: brands,
                cars: cars,
                bannedusers: bannedusers,
                reviews: reviews
            },
            getupcomingcars,
            carsByStatus,
            recentusers,
            recentbrands,
            recentcars,
            recentbannedusers,
            recentreviews
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
