import React, { ReactNode } from "react";

interface IPageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const PageContainer = ({
  children,
  title,
  description,
}: IPageContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5170D5] via-[#8BA3E0] via-25% to-[#CEE9D8] pb-24">
      <div className="pt-14">
        <div className="pt-7">
          <h2 className="font-bold text-3xl leading-9 text-white text-center drop-shadow-sm">
            {title}
          </h2>
          <p className="mt-4 text-center text-sm text-white/80">{description}</p>
        </div>
        <section className="mt-4 max-w-4xl mx-auto">{children}</section>
      </div>
    </div>
  );
};

export default PageContainer;
