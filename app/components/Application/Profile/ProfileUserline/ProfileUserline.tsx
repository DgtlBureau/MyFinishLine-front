"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import useGetStravaUser from "@/app/hooks/useGetStravaUser";
import { Camera, Menu, X } from "lucide-react";
import Image from "next/image";
import Settings from "../../Settings/Settings";
import { motion } from "framer-motion";

const ProfileUserline = () => {
  const { athlete } = useGetStravaUser();

  return (
    <section className="flex justify-between">
      <div className="flex items-center gap-4">
        {athlete?.profile ? (
          <Image
            className="rounded-full"
            src={athlete.profile}
            width={80}
            height={80}
            alt="Profile image"
          />
        ) : (
          <div className="border-border shrink-0 border-2 rounded-full w-20 h-20 flex items-center justify-center shadow-inner shadow-accent">
            <Camera />
          </div>
        )}
        <div>
          <span className="font-medium">
            {athlete.firstname} {athlete.lastname}
          </span>
          <span className="block font-medium text-muted-foreground text-sm">
            {athlete.state}
          </span>
        </div>
      </div>
      <Drawer direction="right">
        <DrawerTrigger className="p-4">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="bottom-0 left-auto right-0 top-0 mt-0 md:w-100 w-[90%] max-w-[90%] rounded-none rounded-bl-2xl rounded-tl-2xl h-screen flex flex-col">
          <DrawerHeader className="shrink-0 p-6 pb-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center"
            >
              <div>
                <h4 className="text-left text-2xl font-semibold text-foreground">
                  Settings
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your account and preferences
                </p>
              </div>
              <DrawerClose className="p-2">
                <X className="h-5 w-5" />
              </DrawerClose>
            </motion.div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <Settings />
          </div>

          <DrawerFooter className="shrink-0 p-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-muted-foreground text-center"
            >
              Version 1.0.0
            </motion.p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default ProfileUserline;
