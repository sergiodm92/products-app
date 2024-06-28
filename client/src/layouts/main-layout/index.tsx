import { Footer } from "../footer";
import { Header } from "../header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </main>
  );
};
