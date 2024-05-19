import { model, Schema } from "mongoose";

const foodSchema = new Schema({
  name: { type: String, required: true },
  tags: { type: [String] },
  price: { type: Number, required: true },
  cookTime: { type: String, required: true },
  origins: { type: [String], required: true },
  stars: { type: Number, default: 3 },
  imageUrl: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  description: { type: String, required: true },
});

export const foodModel = model("food", foodSchema);
