const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-full bg-background max-w-4xl mx-auto p-4">
      {children}
    </main>
  );
};

export default page;
