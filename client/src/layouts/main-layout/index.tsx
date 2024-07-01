import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={1}
        toastOptions={{
          style: {
            background: "#272c44",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #6b8bc6",
          },
        }}
      />
    </main>
  );
};
