import AddActivitityForm from "@/app/components/Application/AddActivityForm/AddActivityForm";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const page = () => {
  return (
    <PageContainer
      titleKey="pages.newActivity.title"
      descriptionKey="pages.newActivity.description"
    >
      <AddActivitityForm />
    </PageContainer>
  );
};

export default page;
