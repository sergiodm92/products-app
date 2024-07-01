import { Footer } from "../footer";
import { Header } from "../header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-between w-full min-h-screen bg-bgLight dark:bg-bgDark ">
      <div className="w-full">
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
};
