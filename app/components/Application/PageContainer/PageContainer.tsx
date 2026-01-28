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
    <div className="bg-linear-to-b from-[#5170D5] via-[#D6EFE3CC] via-80% to-[#FFFFFF]">
      <div className="pt-14">
        <div className="pt-7">
          <h2 className="font-bold text-3xl leading-9 text-[#09090B] text-center">
            {title}
          </h2>
          <p className="mt-4 text-center text-sm text-[#71717A]">{description}</p>
        </div>
        <section className="mt-4 max-w-4xl mx-auto">{children}</section>
      </div>
    </div>
  );
};

export default PageContainer;
