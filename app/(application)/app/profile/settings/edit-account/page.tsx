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
import BirthDateWheelPicker from "@/app/components/Shared/WheelDateBirthPicker/WheelDateBirthPicker";
import CustomWheelPicker from "@/app/components/Shared/CustomWheelPicker/CustomWheelPicker";
import SheetContainer from "@/app/components/SheetContainer/SheetContainer";
import { format } from "date-fns";
import { motion } from "framer-motion";

const glassInputClassName =
  "h-14 text-base bg-white/20 backdrop-blur-xl border-white/30 rounded-2xl shadow-lg text-white font-medium caret-white placeholder:text-white/40 placeholder:font-normal focus:border-white/50 focus:ring-white/20 focus:shadow-[0_0_15px_rgba(255,255,255,0.35)]";

const sexOptions = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Prefer not to say", value: null },
];

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const getCountryFlag = (countryName: string): string => {
  const cl = countryList();
  const code = cl.getValue(countryName);
  if (!code) return "";
  return code
    .toUpperCase()
    .split("")
    .map((c: string) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
};

const page = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser>(user);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isGenderSelectOpen, setIsGenderSelectOpen] = useState(false);
  const [isBirthDateOpen, setIsBirthDateOpen] = useState(false);
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

  const handleChangeSex = (value: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        sex: value,
      };
    });
  };

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
    const date = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    formData.append("birth_date", format(date, "yyyy-MM-dd"));
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
          ...(data.sex ? { sex: data.sex.toLowerCase() } : {}),
          birth_date: birthDate,
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
        {/* Profile Photo Section */}
        <div className="pt-4 pb-6">
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Frame - animated scale from center */}
              {user.selected_frame && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute left-0 top-0 h-full w-full z-20 pointer-events-none"
                >
                  <Image
                    src={user.selected_frame?.image_url}
                    alt="Frame"
                    fill
                  />
                </motion.div>
              )}

              {/* Avatar - fade in */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                className="relative z-10 flex items-center justify-center w-32 h-32"
              >
                {file ? (
                  <div className="relative w-32 h-32">
                    <Image
                      className="rounded-full object-cover w-32 h-32"
                      src={URL.createObjectURL(file)}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      loading="eager"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
                  </div>
                ) : !imageError && data.full_avatar_url ? (
                  <div className="relative w-32 h-32">
                    <Image
                      className="rounded-full object-cover w-32 h-32"
                      src={data.full_avatar_url}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      quality={75}
                      loading="eager"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center relative">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
                  </div>
                )}
              </motion.div>

              {/* Upload overlay */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <input
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-0 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeFile}
                />
              </div>
            </div>

            {/* Name and Username - animated */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-3 text-center"
            >
              <span className="font-semibold text-lg text-white block">
                {data.first_name} {data.last_name}
              </span>
              <span className="block font-medium text-white/60 text-sm">
                @{data.username}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Form with staggered animations */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 pb-24">
          <div className="space-y-4">
            <motion.label
              className="block w-full"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">First Name</span>
              <Input
                name="first_name"
                className={`mt-1 ${glassInputClassName}`}
                placeholder="John"
                value={data.first_name}
                onChange={handleChange}
              />
            </motion.label>

            <motion.label
              className="block w-full"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Last Name</span>
              <Input
                name="last_name"
                className={`mt-1 ${glassInputClassName}`}
                placeholder="Doe"
                value={data.last_name}
                onChange={handleChange}
              />
            </motion.label>

            <motion.label
              className="block w-full"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Username</span>
              <div className="relative flex items-center mt-1">
                <Input
                  containerClassName="w-full"
                  name="username"
                  className={`pl-7 w-full ${glassInputClassName}`}
                  placeholder="John.doe"
                  value={data.username}
                  onChange={handleChange}
                />
                <span className="absolute left-3 text-white/40">@</span>
              </div>
            </motion.label>

            <motion.label
              className="block w-full"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Birth Date</span>
              <Button
                className={`mt-1 block w-full text-left hover:bg-white/30 ${glassInputClassName}`}
                variant="outline"
                type="button"
                onClick={handleOpenBirthDateSheet}
              >
                {birthDate.month < 10 ? "0" + birthDate.month : birthDate.month}.
                {birthDate.day < 10 ? "0" + birthDate.day : birthDate.day}.
                {birthDate.year}
              </Button>
            </motion.label>

            <motion.label
              className="block w-full"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Gender</span>
              <Button
                className={`mt-1 block w-full text-left hover:bg-white/30 ${glassInputClassName}`}
                variant="outline"
                type="button"
                onClick={handleOpenGenderSheet}
              >
                {sexOptions.find((option) => option.value === data.sex)?.label}
              </Button>
            </motion.label>

            <motion.label
              className="block"
              custom={5}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Phone</span>
              <Input
                name="phone"
                className={`mt-1 ${glassInputClassName}`}
                value={data.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8901"
              />
            </motion.label>

            <motion.label
              className="block"
              custom={6}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Email</span>
              <Input
                name="email"
                className={`mt-1 ${glassInputClassName}`}
                placeholder="Email Address"
                value={data.email}
                onChange={handleChange}
              />
            </motion.label>

            <motion.label
              htmlFor="country"
              className="block"
              custom={7}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <span className="text-sm font-semibold text-white/80 tracking-wide">Country</span>
              <Select
                name="country"
                value={data.country || ""}
                onValueChange={(value) => {
                  setData({ ...data, country: value });
                }}
                required
              >
                <SelectTrigger className={`w-full mt-1 !h-14 ${glassInputClassName}`}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((country) => (
                    <SelectItem
                      className="w-full flex items-center"
                      key={country}
                      value={country}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCountryFlag(country)}</span>
                        {country}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.label>

            <motion.div
              custom={8}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="relative mt-6 w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-4 font-semibold text-white text-base overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90 active:scale-[0.98] shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A]" />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="relative z-10">Saving updates...</span>
                  </>
                ) : (
                  <span className="relative z-10">Save updates</span>
                )}
              </button>
            </motion.div>
          </div>
        </form>
        <SheetContainer
          isOpen={isGenderSelectOpen}
          onClose={handleCloseGenderSheet}
        >
          <div className="pb-20 max-w-4xl mx-auto">
            <CustomWheelPicker
              options={sexOptions}
              value={data.sex}
              onChange={handleChangeSex}
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
