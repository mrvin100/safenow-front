import { Spacer } from "@src/components/global";
import { HomeBanner, HomeNotification, HomeHelp, HomeFAQ, HomeTraction, HomeCounters} from "@src/components/home";

export default function Home() {
  return (
    <>
      <main>
        <HomeBanner />
        <HomeNotification />
        <HomeCounters />
        <HomeHelp />
        <HomeTraction />
        <Spacer small />
        <HomeFAQ />
        <Spacer />
      </main>
    </>
  );
}
