"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { countries } from "@/app/data/countries";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [data, setData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    username: "@john.doe",
    shippingCountry: "United States",
  });

  return (
    <form>
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Image
          className="object-cover rounded-lg"
          src="/images/application/profile-pic.jpg"
          alt="Profile Picture"
          width={80}
          height={80}
        />
        <Edit
          width={32}
          height={32}
          className="absolute text-white bg-gray-700 rounded-lg p-1"
        />
        <input
          className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer"
          type="file"
        />
      </div>
      <label className="block mt-4">
        <span className="text-xs">Full Name</span>
        <Input
          className="mt-px"
          placeholder="Full Name"
          defaultValue="John Doe"
        />
      </label>

      <label className="block mt-2">
        <span className="text-xs">Email</span>
        <Input
          className="mt-px"
          placeholder="Email Address"
          defaultValue="john.doe@example.com"
        />
      </label>
      <label className="block mt-2">
        <span className="text-xs">Username</span>
        <Input
          className="mt-px"
          placeholder="Username"
          defaultValue="@john.doe"
        />
      </label>

      <label className="block mt-2">
        <span className="text-xs">Phone</span>
        <Input
          className="mt-px"
          placeholder="+1 234 567 8901"
          defaultValue="+1 234 567 8901"
        />
      </label>

      <label htmlFor="shippingCountry" className="block mt-2">
        <span className="text-xs">Shipping Country</span>
        <Select
          value={data.shippingCountry}
          onValueChange={(value) => {
            setData({ ...data, shippingCountry: value });
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
    </form>
  );
};

export default page;
