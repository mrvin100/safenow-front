import { Header } from "@src/components/global";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
}
