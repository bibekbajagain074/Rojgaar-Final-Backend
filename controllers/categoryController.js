const express = require("express");
const router = new express.Router();
const Category = require("../model/CategoryModel");
const multer = require("multer");
const Job = require("../model/JobModel");

const storage = multer.diskStorage({
  destination: "./uploads/images/category",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
  },
});

module.exports.uploadCatImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error("Please upload an image file"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports.addCategory = async (req, res, next) => {
  this.uploadCatImage.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    try {
      const { title, description } = req.body;
      const category = await Category.create({
        title: title,
        image: req.file.path,
        description: description,
      });
      res.status(200).json({
        message: "Category added successfully",
        category,
      });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports.getCategoryCount = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    const jobs = await Job.find({});
    const jobsInCategory = [];

    categories.forEach((category) => {
      // Filter jobs where sector is defined and matches category ID
      const jobsInCategoryCount = jobs.filter((job) =>
        job.sector && job.sector.equals(category._id)
      );

      jobsInCategory.push({
        category: category,
        jobs: jobsInCategoryCount.length,
      });
    });

    res.status(200).json({
      success: true,
      data: jobsInCategory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (e) {
    console.log(e);
  }
};
