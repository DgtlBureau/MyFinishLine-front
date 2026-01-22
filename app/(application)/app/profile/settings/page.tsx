import PageContainer from "@/app/components/Application/PageContainer/PageContainer";
import Settings from "@/app/components/Application/Settings/Settings";

const page = () => {
  return (
    <PageContainer title="Settings" description="Change your account settings">
      <main className="pt-2 px-4 max-w-4xl mx-auto mb-10 bg-white">
        <Settings />
      </main>
    </PageContainer>
  );
};

export default page;
