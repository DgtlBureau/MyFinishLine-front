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
import { setUser, updateUser } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getCurrentUser } from "@/app/lib/utils/userService";
import { IUser } from "@/app/types/user";
import axios from "axios";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";
import { Sheet } from "react-modal-sheet";
import DateWheelPicker from "@/app/components/Shared/WheelDatePicker/WheelDatePicker";

import BirthDateWheelPicker from "@/app/components/Shared/WheelDateBirthPicker/WheelDateBirthPicker";
import CustomWheelPicker from "@/app/components/Shared/CustomWheelPicker/CustomWheelPicker";
import SheetContainer from "@/app/components/SheetContainer/SheetContainer";

const page = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser>(user);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isGenderSelectOpen, setIsGenderSelectOpen] = useState(false);
  const [isBirthDateOpen, setIsBirthDateOpen] = useState(false);
  const [gender, setGender] = useState("Prefer not to say");
  const currentDate = new Date();
  const [birthDate, setBirthDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  });

  const options = useMemo(() => countryList().getLabels(), []);

  const handleOpenGenderSheet = () => {
    setIsGenderSelectOpen(true);
  };

  const handleCloseGenderSheet = () => {
    setIsGenderSelectOpen(false);
  };

  const handleOpenBirthDateSheet = () => {
    setIsBirthDateOpen(true);
  };

  const handleCloseBirthDateSheet = () => {
    setIsBirthDateOpen(false);
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }, []);

  const handleLoadUser = async () => {
    try {
      const data = await getCurrentUser();
      dispatch(setUser(data));
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    const dataArray = Object.entries(data);
    dataArray.forEach((item) => {
      !!item[1] && formData.append(item[0], item[1]);
    });
    if (file) {
      formData.append("avatar", file);
    }
    try {
      const { data } = await axios.post("/api/user/update-user", formData);
      dispatch(
        updateUser({
          ...(user.first_name !== data.first_name
            ? { first_name: data.first_name }
            : {}),
          ...(user.last_name !== data.last_name
            ? { last_name: data.last_name }
            : {}),
          ...(user.email !== data.email ? { email: data.email } : {}),
          ...(user.username !== data.username
            ? { username: data.username }
            : {}),
          ...(data.country ? { country: data.country } : {}),
          phone: data.phone,
          ...(data.full_avatar_url
            ? { full_avatar_url: data.full_avatar_url }
            : {}),
        }),
      );
      toast.success("Profile successfully updated");
    } catch (error: any) {
      toast.error(error.response?.data.message || error.response.data.error);
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
    <>
      <PageContainer
        title="Edit account"
        description="Edit your account information"
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="px-4">
            <div className="mt-8 w-full leading-0">
              <label className="block w-full">
                <span className="text-sm">First Name</span>
                <Input
                  name="first_name"
                  className="mt-px"
                  placeholder="John"
                  value={data.first_name}
                  onChange={handleChange}
                />
              </label>
              <label className="block w-full mt-2">
                <span className="text-sm">Last Name</span>
                <Input
                  name="last_name"
                  className="mt-px"
                  placeholder="Doe"
                  value={data.last_name}
                  onChange={handleChange}
                />
              </label>
              <label className="block mt-2 w-full">
                <span className="text-sm">Username</span>
                <div className="relative flex items-center">
                  <Input
                    containerClassName="w-full"
                    name="username"
                    className="mt-px pl-7 w-full"
                    placeholder="John.doe"
                    value={data.username}
                    onChange={handleChange}
                  />
                  <span className="absolute left-3 text-neutral-400">@</span>
                </div>
              </label>
              <label className="block mt-2 w-full">
                <span className="text-sm">Birth Date</span>
                <Button
                  className="block w-full text-left hover:bg-transparent"
                  variant="outline"
                  type="button"
                  onClick={handleOpenBirthDateSheet}
                >
                  {birthDate.month < 10
                    ? "0" + birthDate.month
                    : birthDate.month}
                  .{birthDate.day < 10 ? "0" + birthDate.day : birthDate.day}.
                  {birthDate.year}
                </Button>
              </label>
            </div>
            <label className="block mt-2 w-full">
              <span className="text-sm">Gender</span>
              <Button
                className="block w-full text-left hover:bg-transparent"
                variant="outline"
                type="button"
                onClick={handleOpenGenderSheet}
              >
                {gender}
              </Button>
            </label>

            <div className="mt-2">
              <span className="font-medium text-sm text-[#09090B]">
                Upload photo
              </span>
              <div className="mt-1 group relative w-15 h-15 flex items-center justify-center border rounded-xl overflow-hidden shrink-0">
                {file ? (
                  <Image
                    className="object-cover rounded-lg"
                    src={URL.createObjectURL(file)}
                    alt="Profile Picture"
                    loading="eager"
                    width={60}
                    height={60}
                  />
                ) : !imageError && data.full_avatar_url ? (
                  <Image
                    className="object-cover w-full h-full rounded-lg"
                    src={data.full_avatar_url}
                    alt="Profile Picture"
                    loading="eager"
                    width={60}
                    height={60}
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload />
                  </div>
                )}

                <Upload
                  width={32}
                  height={32}
                  className="absolute text-white bg-gray-700/80 rounded-lg p-1"
                />

                <input
                  className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  type="file"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
          </div>

          <div className="px-4">
            <label className="block mt-2">
              <span className="text-sm">Phone</span>
              <Input
                name="phone"
                className="mt-px"
                value={data.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8901"
                defaultValue="+1 234 567 8901"
              />
            </label>
            <label className="block mt-2">
              <span className="text-sm">Email</span>
              <Input
                name="email"
                className="mt-px"
                placeholder="Email Address"
                value={data.email}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="country" className="block mt-2">
              <span className="text-sm">Country</span>
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
                  {options.map((country) => (
                    <SelectItem
                      className="w-full flex items-center justify-between"
                      key={country}
                      value={country}
                    >
                      <div className="w-full flex items-center justify-between">
                        {country}
                      </div>
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
          </div>
        </form>
        <SheetContainer
          isOpen={isGenderSelectOpen}
          onClose={handleCloseGenderSheet}
        >
          <div className="pb-20 max-w-4xl mx-auto">
            <CustomWheelPicker
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Prefer not to say", value: "prefer_not_to_say" },
              ]}
              value={gender}
              onChange={setGender}
            />
          </div>
        </SheetContainer>
      </PageContainer>
      <SheetContainer
        isOpen={isBirthDateOpen}
        onClose={handleCloseBirthDateSheet}
      >
        <div className="pb-20 max-w-4xl mx-auto">
          <BirthDateWheelPicker value={birthDate} onChange={setBirthDate} />
        </div>
      </SheetContainer>
    </>
  );
};

export default page;
