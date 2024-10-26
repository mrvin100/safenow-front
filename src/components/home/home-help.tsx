import * as React from "react";
import { AppContainer, Spacer } from "@src/components/global";
import { InfoIcon } from "lucide-react";
import { TypographyH2, TypographyP } from "@/components/ui/typographies";
import { HomeHelpForm } from "./home-helpform";

export const HomeHelp: React.FC = () => {
  return (
    <section className="bg-card">
      <AppContainer>
        <Spacer extraSmall />
        <TypographyH2 className="mx-auto max-w-3xl text-center text-foreground">
          Need <span className="text-primary">Help</span>&nbsp;?
        </TypographyH2>
        <Spacer small />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <HomeHelpForm />
          </div>
          <div className="bg-muted md:rounded-md p-5 flex items-center justify-center">
            <p className="w-full max-w-sm leading-6">
              At SafeNow, our mission is to keep you informed and prepared by
              providing real-time alerts before disasters strike. <br />
              Making sure you all have the information you need to protect
              yourself and your loved ones, Stay aware, stay prepared.
            </p>
          </div>
        </div>
      </AppContainer>
    </section>
  );
};
