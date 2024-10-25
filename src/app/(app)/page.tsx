import { AppContainer, Spacer } from "@src/components/global";

export default function Home() {
  return (
    <>
      <main>
        <AppContainer className="border flex items-center justify-center gap-4 min-h-[80vh]">
          <Spacer />
          <span>Home banner section</span>
          <span>home help section</span>
          <Spacer />
        </AppContainer>
      </main>
    </>
  );
}
