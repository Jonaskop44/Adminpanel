import Image from "next/image";
import AuthForm from "./components/AuthForm";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="light: flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="absolute top-10 right-20">
          <ThemeSwitcher />
        </div>
        <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
      </div>
      <AuthForm />
    </div>
  );
}
