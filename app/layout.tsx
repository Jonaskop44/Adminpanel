import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/app/libs/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AdminPanel",
  description: "Any tools I need for me",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ThemeProvider>{children}</ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
