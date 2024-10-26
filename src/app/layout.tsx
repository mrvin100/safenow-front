import { Toaster } from "@/components/ui/toaster";
import { ConfirmModal } from "@src/components/modals/confirm-modal";
import { Providers } from "@src/components/providers/app.provider";
import { checkEnvVariables } from "@src/helpers/check-env-variables";
import "@src/styles/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

checkEnvVariables();

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Safe Now",
  description: "Passez vos alertes en temps reels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppinsFont.variable}`}>
      <body className={`bg-muted antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
        <ConfirmModal />
      </body>
    </html>
  );
}
