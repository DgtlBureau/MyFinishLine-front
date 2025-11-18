import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

interface ILoggedLayoutProps {
  children: React.ReactNode;
}

const LoggedLayout = ({ children }: ILoggedLayoutProps) => {
  return (
    <>
      <Header />
      <section className="mt-8 pb-30 max-w-2xl mx-auto">{children}</section>
      <section className="fixed bottom-0 w-full z-10">
        <Navigation />
      </section>
    </>
  );
};

export default LoggedLayout;
