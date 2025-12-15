import Tabs from "@/app/components/Application/Profile/Tabs/Tabs";

const storeLinks = [
  {
    id: 1,
    name: "Booster",
    href: "/app/store/booster",
  },
  {
    id: 2,
    name: "My Challenges",
    href: "/app/store/my-challenges",
  },
  {
    id: 3,
    name: "Contracts",
    href: "/app/store/contracts",
  },
];

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-3xl mx-auto pt-2 px-2">
      <Tabs links={storeLinks} layoutId="store-tab-navigation" />
      {children}
    </main>
  );
}
