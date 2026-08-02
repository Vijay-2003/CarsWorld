import Car from "../models/cars.model.js";
import Brand from '../models/brand.model.js'

export const AddCar = async (req, res) => {
    try {
        let {
            name,
            brand,
            model,
            price,
            description,
            launch_year,
            body_type,
            engine_capacity,
            mileage,
            top_speed,
            seating_capacity,
            drive_type,
            colors,
            safety_features,
            status,
        } = req.body;

        const car_image = req.files?.car_image?.[0]?.path || "";

        const gallery = req.files?.gallery
            ? req.files.gallery.map((file) => file.path)
            : [];

        colors = colors
            ? colors.split(",").map(color => color.trim())
            : [];

        safety_features = safety_features
            ? safety_features.split(",").map(feature => feature.trim())
            : [];

        if (
            !name ||
            !brand ||
            !model ||
            !price ||
            !description ||
            !launch_year ||
            !body_type ||
            !engine_capacity ||
            !mileage ||
            !top_speed ||
            !seating_capacity ||
            !drive_type ||
            !car_image
        ) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "Please fill all required fields.",
            });
        }

        const brandExists = await Brand.findById(brand);

        if (!brandExists) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Brand not found.",
            });
        }

        const car = await Car.create({
            name,
            brand,
            model,
            price,
            description,
            car_image,
            gallery,
            launch_year,
            body_type,
            engine_capacity,
            mileage,
            top_speed,
            seating_capacity,
            drive_type,
            colors,
            safety_features,
            status,
        });

        return res.status(201).json({
            success: true,
            type: "success",
            message: "Car added successfully.",
            car,
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

export const GetAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate({
            path: "brand",
            select: "brand_name brand_logo"
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            type: "success",
            message: "All Cars Found",
            cars
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

export const GetCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id).populate("brand");
        if (!car) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "Car Not Found",
            });
        }
        res.status(200).json({
            success: true,
            type: "success",
            message: "Car Found",
            car
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

export const DeleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(400).json({
                success: false,
                type: "error",
                message: "Car Not Found",
            });
        }
        await Car.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            type: "success",
            message: "Car Deleted",
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

export const UpdateCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Car not found.",
            });
        }

        let {
            name,
            brand,
            model,
            price,
            description,
            launch_year,
            body_type,
            engine_capacity,
            mileage,
            top_speed,
            seating_capacity,
            drive_type,
            colors,
            safety_features,
            status,
        } = req.body;

        colors = colors
            ? colors.split(",").map(color => color.trim())
            : [];

        safety_features = safety_features
            ? safety_features.split(",").map(feature => feature.trim())
            : [];

        // Check brand if updating
        if (brand) {
            const brandExists = await Brand.findById(brand);

            if (!brandExists) {
                return res.status(404).json({
                    success: false,
                    type: "error",
                    message: "Brand not found.",
                });
            }

            car.brand = brand;
        }

        // Replace main image if uploaded
        if (req.files?.car_image?.length > 0) {
            car.car_image = req.files.car_image[0].path;
        }

        // Add new gallery images
        if (req.files?.gallery?.length > 0) {
            const newGallery = req.files.gallery.map(file => file.path);
            car.gallery.push(...newGallery);
        }

        // Update fields only if provided
        if (name) car.name = name;
        if (model) car.model = model;
        if (price) car.price = price;
        if (description) car.description = description;
        if (launch_year) car.launch_year = launch_year;
        if (body_type) car.body_type = body_type;
        if (engine_capacity) car.engine_capacity = engine_capacity;
        if (mileage) car.mileage = mileage;
        if (top_speed) car.top_speed = top_speed;
        if (seating_capacity) car.seating_capacity = seating_capacity;
        if (drive_type) car.drive_type = drive_type;
        if (colors) car.colors = colors;
        if (safety_features) car.safety_features = safety_features;
        if (status) car.status = status;

        await car.save();

        return res.status(200).json({
            success: true,
            type: "success",
            message: "Car updated successfully.",
            car,
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