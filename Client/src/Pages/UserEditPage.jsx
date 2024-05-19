import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getById, updateUser } from "../services/user.service";
import { useParams } from "react-router-dom";
import Title from "../Components/Title";
import Input from "../Components/Input";
import { EMAIL } from "../constants/patterns";
import Button from "../Components/Button";

export default function UserEditPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userId } = useParams();
  const isEditMode = userId;

  useEffect(() => {
    if (isEditMode) loadUser();
  }, [userId]);

  const loadUser = async () => {
    const user = await getById(userId);
    setValue("_id", user._id);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("address", user.address);
    setValue("isAdmin", user.isAdmin);
  };

  const submit = (userData) => {
    updateUser(userData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-3 rounded-md bg-white p-8 shadow-md">
        <Title title={isEditMode ? "Edit User" : "Add User"} />
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <Input
            label="Name"
            {...register("name", { required: true, minLength: 3 })}
            error={errors.name}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            label="Email"
            {...register("email", { required: true, pattern: EMAIL })}
            error={errors.email}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            label="Address"
            {...register("address", { required: true, minLength: 5 })}
            error={errors.address}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <Input
            label="Is Admin"
            type="checkbox"
            {...register("isAdmin")}
            className="text-indigo-500"
          />
          <Button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-600"
          />
        </form>
      </div>
    </div>
  );
}
