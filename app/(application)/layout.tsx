import Navbar from "../components/Application/Navbar/Navbar";
import AppHeader from "../components/Application/AppHeader/AppHeader";
import RedirectComponent from "../components/RedirectComponent/RedirectComponent";
import { buildSeo } from "../lib/utils/buildSeo";
import PageTransition from "../components/Application/PageTransition/PageTransition";
import { NotificationProvider } from "../contexts/NotificationContext";
import NotificationChecker from "../components/Application/NotificationChecker/NotificationChecker";
import VisibilityHandler from "../components/Shared/VisibilityHandler/VisibilityHandler";

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
    <NotificationProvider>
      <NotificationChecker />
      <VisibilityHandler />
      <RedirectComponent />
      <div className="min-h-screen bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]">
        <div className="min-h-dvh flex flex-col">
          <AppHeader />
          <main className="min-h-dvh pb-24 bg-transparent">
            <PageTransition>{children}</PageTransition>
          </main>
          <Navbar />
        </div>
      </div>
    </NotificationProvider>
  );
}
