import * as React from "react";
import { AppContainer, Spacer } from "@src/components/global";
import { InfoIcon } from "lucide-react";

export const HomeNotification: React.FC = () => {
  return (
    <section>
      <AppContainer>
        <Spacer extraSmall />
        <div className="text-muted-foreground p-5 text-center">
          <InfoIcon className="size-8 mr-2 inline-block " />
          <blockquote className="inline-block italic">
            &apos;Sign up now to receive timely warnings and alerts straight to
            your phone.&apos;
          </blockquote>
        </div>
        <Spacer extraSmall />
      </AppContainer>
    </section>
  );
};
