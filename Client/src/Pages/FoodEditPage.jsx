import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { add, getById, update } from "../services/foodService";
import Title from "../Components/Title";
import InputContainer from "../Components/InputContainer";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { uploadImage } from "../services/uploadService";
import { toast } from "react-toastify";

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!foodId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then((food) => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId, reset]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
      return;
    }

    const newFood = await add(food);
    toast.success(`Food "${food.name}" added successfully!`);
    navigate("/admin/editFood/" + newFood._id, { replace: true });
  };

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-3 rounded-md bg-white p-8 shadow-md">
        <Title title={isEditMode ? "Edit Food" : "Add Food"} />
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-3">
          <InputContainer label="Select Image">
            <input
              type="file"
              onChange={upload}
              accept="image/jpeg"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} target="blank" className="block h-64 w-full">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="h-full w-full rounded-md object-cover"
              />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register("name", { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register("price", { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register("tags")}
            error={errors.tags}
          />

          <Input
            type="text"
            label="Origins"
            {...register("origins", { required: true })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register("cookTime", { required: true })}
            error={errors.cookTime}
          />
          <Input
            type="text"
            label="Description"
            {...register("description", { required: true })}
            error={errors.description}
          />

          <Button type="submit" text={isEditMode ? "Update" : "Create"} />
        </form>
      </div>
    </div>
  );
}
