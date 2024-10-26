import { Spacer } from "@src/components/global";
import { HomeBanner, HomeNotification, HomeHelp } from "@src/components/home";

export default function Home() {
  return (
    <>
      <main>
        <HomeBanner />
        <HomeNotification />
        <HomeHelp />
        <Spacer />
      </main>
    </>
  );
}
