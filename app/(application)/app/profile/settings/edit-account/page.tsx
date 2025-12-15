"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { countries } from "@/app/data/countries";
import { setUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IUser } from "@/app/types/user";
import axios from "axios";
import { Camera, Edit } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser>(user);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    const dataArray = Object.entries(data);
    dataArray.forEach((item) => {
      formData.append(item[0], item[1]);
    });
    if (file) {
      formData.append("avatar", file);
    }
    try {
      const { data } = await axios.post("/api/user/update-user", formData);
      dispatch(setUser(data));
      toast.success("Profile successfully updated");
    } catch (error: any) {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group relative w-20 h-20 flex items-center justify-center border rounded-lg overflow-hidden">
        {file ? (
          <Image
            className="object-cover rounded-lg"
            src={URL.createObjectURL(file)}
            alt="Profile Picture"
            loading="eager"
            width={80}
            height={80}
          />
        ) : data.full_avatar_url ? (
          <Image
            className="object-cover rounded-lg"
            src={data.full_avatar_url}
            alt="Profile Picture"
            loading="eager"
            width={80}
            height={80}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <Camera />
          </div>
        )}

        <Edit
          width={32}
          height={32}
          className="absolute text-white bg-gray-700/80 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <input
          className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer"
          type="file"
          onChange={handleChangeFile}
        />
      </div>
      <label className="block mt-4">
        <span className="text-xs">First Name</span>
        <Input
          name="first_name"
          className="mt-px"
          placeholder="John"
          value={data.first_name || ""}
          onChange={handleChange}
        />
      </label>
      <label className="block mt-4">
        <span className="text-xs">Last Name</span>
        <Input
          name="last_name"
          className="mt-px"
          placeholder="Doe"
          value={data.last_name || ""}
          onChange={handleChange}
        />
      </label>

      <label className="block mt-2">
        <span className="text-xs">Email</span>
        <Input
          name="email"
          className="mt-px"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label className="block mt-2">
        <span className="text-xs">Username</span>
        <div className="relative flex items-center">
          <Input
            name="username"
            className="mt-px pl-7"
            placeholder="John.doe"
            value={data.username}
            onChange={handleChange}
          />
          <span className="absolute left-3 text-neutral-400">@</span>
        </div>
      </label>

      <label className="block mt-2">
        <span className="text-xs">Phone</span>
        <Input
          className="mt-px"
          placeholder="+1 234 567 8901"
          defaultValue="+1 234 567 8901"
        />
      </label>

      <label htmlFor="country" className="block mt-2">
        <span className="text-xs">Country</span>
        <Select
          name="country"
          value={data.country || ""}
          onValueChange={(value) => {
            setData({ ...data, country: value });
          }}
          required
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.name}>
                {country.flag}
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <Button className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
            Saving updates...
          </>
        ) : (
          "Save updates"
        )}
      </Button>
    </form>
  );
};

export default page;
