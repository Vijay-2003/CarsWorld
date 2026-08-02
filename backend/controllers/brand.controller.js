import Brand from "../models/brand.model.js";
import Car from '../models/cars.model.js'

export const AddBrand = async (req, res) => {
    try {

        const {
            brand_name,
            description,
            brand_founder,
            country,
            headquarters,
            founded,
            motto
        } = req.body;

        const brand_logo_image = req.files?.brand_logo?.[0]?.path || "";
        const brand_banner_image = req.files?.brand_banner?.[0]?.path || "";

        if (
            !brand_name ||
            !description ||
            !brand_founder ||
            !country ||
            !headquarters ||
            !founded ||
            !motto ||
            !brand_logo_image ||
            !brand_banner_image
        ) {
            return res.status(400).json({
                message: "Please fill all required fields",
                type: "error",
                success: false
            });
        }

        const exists = await Brand.findOne({ brand_name });

        if (exists) {
            return res.status(400).json({
                message: "Brand already exists",
                type: "error",
                success: false,
            });
        }

        const brand = await Brand.create({
            brand_name,
            description,
            brand_founder,
            country,
            headquarters,
            founded,
            motto,
            brand_logo: brand_logo_image,
            brand_banner: brand_banner_image
        });

        return res.status(201).json({
            message: "Brand Added Successfully",
            type: "success",
            success: true,
            brand
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            type: "error",
            success: false
        });
    }
};

export const GetAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });

        for (let brand of brands) {
            brand._doc.totalCars = await Car.countDocuments({
                brand: brand._id
            });
        }

        res.status(200).json({
            message: "Brands Fetched Successfully",
            type: "success",
            success: true,
            brands
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            type: "error",
            success: false
        })
    }
}

export const GetBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        const cars = await Car.find({ brand: id });

        if (!brand) {
            return res.status(400).json({
                message: "Brand Not Found",
                type: "error",
                success: false,
                brand
            })
        }

        res.status(200).json({
            message: "Brand Fetched Successfully",
            type: "success",
            success: true,
            brand,
            cars
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            type: "error",
            success: false
        })
    }
}

export const DeleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findById(id);

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found",
                success: false,
                type: "error",
            });
        }

        // Delete all cars of this brand
        await Car.deleteMany({ brand: id });

        // Delete the brand
        await Brand.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Brand and all its cars deleted successfully",
            success: true,
            type: "success",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message || "Internal Server Error",
            success: false,
            type: "error",
        });
    }
};

export const UpdateBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findById(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                type: "error",
                message: "Brand not found.",
            });
        }

        const {
            brand_name,
            description,
            brand_founder,
            country,
            headquarters,
            founded,
            motto,
        } = req.body;
        const brand_logo_image = req.files?.brand_logo?.[0]?.path;
        const brand_banner_image = req.files?.brand_banner?.[0]?.path;

        if (brand_name) {
            brand.brand_name = brand_name;
        }

        if (description) {
            brand.description = description;
        }

        if (brand_founder) {
            brand.brand_founder = brand_founder;
        }

        if (country) {
            brand.country = country;
        }

        if (headquarters) {
            brand.headquarters = headquarters;
        }

        if (founded) {
            brand.founded = founded;
        }

        if (motto) {
            brand.motto = motto;
        }

        if (brand_logo_image) {
            brand.brand_logo = brand_logo_image;
        }

        if (brand_banner_image) {
            brand.brand_banner = brand_banner_image;
        }

        await brand.save();

        return res.status(200).json({
            success: true,
            type: "success",
            message: "Brand updated successfully.",
            brand,
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



