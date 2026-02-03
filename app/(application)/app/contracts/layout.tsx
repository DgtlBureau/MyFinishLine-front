import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const ContractsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer
      title="Contracts"
      description="Here you can see your next goals to achieve"
    >
      {children}
    </PageContainer>
  );
};

export default ContractsLayout;
