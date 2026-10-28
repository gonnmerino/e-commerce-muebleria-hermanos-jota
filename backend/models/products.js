const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "The price is required"],
      min: [0, "The price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "The category is required"],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, "The image is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    specs: {
      material: {
        type: String,
      },
      dimensions: {
        type: String,
      },
      finish: {
        type: String,
      },
      weight: {
        type: String,
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });

module.exports = model("Product", productSchema);