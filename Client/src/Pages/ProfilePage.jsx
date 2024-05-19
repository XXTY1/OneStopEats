import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import Title from "../Components/Title";
import Input from "../Components/Input";
import Button from "../Components/Button";

export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { user, updateProfile, changePassword } = useAuth();

  const submitUser = (data) => {
    updateProfile(data);
  };

  const submitPassword = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between">
        <div className="w-full p-4 md:w-1/2">
          <div className="rounded-lg bg-white px-6 py-8 shadow">
            <Title title="Update Profile" />
            <form onSubmit={handleSubmit(submitUser)} className="space-y-6">
              <Input
                defaultValue={user.name}
                type="text"
                label="Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
                error={errors.name}
              />
              <Input
                defaultValue={user.address}
                type="text"
                label="Address"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
                error={errors.address}
              />

              <Button
                type="submit"
                text="Update"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </form>
          </div>
        </div>
        <div className="w-full p-4 md:w-1/2">
          <div className="rounded-lg bg-white px-6 py-8 shadow">
            <Title title="Change Password" />
            <form onSubmit={handleSubmit(submitPassword)} className="space-y-6">
              <Input
                type="password"
                label="Current Password"
                {...register("currentPassword", {
                  required: true,
                })}
                error={errors.currentPassword}
              />

              <Input
                type="password"
                label="New Password"
                {...register("newPassword", {
                  required: true,
                  minLength: 5,
                })}
                error={errors.newPassword}
              />

              <Input
                type="password"
                label="Confirm Password"
                {...register("confirmNewPassword", {
                  required: true,
                  validate: (value) =>
                    value !== getValues("newPassword")
                      ? "Passwords Do No Match"
                      : true,
                })}
                error={errors.confirmNewPassword}
              />

              <Button
                type="submit"
                text="Change"
                className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
