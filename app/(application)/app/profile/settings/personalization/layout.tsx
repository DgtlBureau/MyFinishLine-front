import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const PersonalizationLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PageContainer
      title="Personalization"
      description="Edit how you and other users will see your profile."
    >
      <div className="px-4">{children}</div>
    </PageContainer>
  );
};

export default PersonalizationLayout;
