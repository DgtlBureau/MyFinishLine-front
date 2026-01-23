import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import { Slide, ToastContainer } from "react-toastify";
import RedirectComponent from "../components/RedirectComponent/RedirectComponent";
import { buildSeo } from "../lib/utils/buildSeo";
import { Toast } from "../components/ui/toast";
import { useAppSelector } from "../lib/hooks";
import ConnectionToast from "../components/Application/ConnectionToast/ConnectionToast";

export const metadata = buildSeo({
  title: "MyFinishLine",
  description: "Combine sports and pleasure",
  robotsFollow: false,
  robotsIndex: false,
});

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RedirectComponent />
      <div className="min-h-screen h-full">
        <ConnectionToast />
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="min-h-screen pb-15.75 bg-white rounded-tl-2xl rounded-tr-2xl">
            <div className="min-h-full">{children}</div>
          </main>
          <Navbar />
        </div>
        <ToastContainer
          position="top-center"
          draggable
          transition={Slide}
          closeButton={false}
          className="z-110"
        />
      </div>
    </>
  );
}
