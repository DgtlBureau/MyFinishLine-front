const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl py-4">
      <div className="w-full h-full max-w-4xl mx-auto">{children}</div>
    </main>
  );
};

export default page;
