import { AppContainer, Spacer } from "@src/components/global";
import { HomeBanner } from "@src/components/home";

export default function Home() {
  return (
    <>
      <main>
          <HomeBanner />
          <span>home help section</span>
          <Spacer />
      </main>
    </>
  );
}
