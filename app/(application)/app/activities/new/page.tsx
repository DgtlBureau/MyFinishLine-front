import AddActivitityForm from "@/app/components/Application/AddActivityForm/AddActivityForm";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const page = () => {
  return (
    <PageContainer
      title="New activity"
      description="Add your activity manually"
    >
      <AddActivitityForm />
    </PageContainer>
  );
};

export default page;
