import * as React from "react";
import { AppContainer, Spacer } from "@src/components/global";
import { TypographyH1, TypographyP } from "@/components/ui/typographies";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HomeBanner: React.FC = () => {
  return (
    <section className="home-banner bg-black/50">
      <AppContainer>
        <Spacer />
        <TypographyH1 className="mx-auto max-w-3xl text-center text-primary-foreground">
          Stay <span className="text-primary">Alerted</span>!
        </TypographyH1>
        <Spacer tooSmall />
        <TypographyP className="mx-auto max-w-3xl text-center text-primary-foreground backdrop-blur-md">
          Curious about recent event? Click below to explore real-time updates
          on events happening in your area and beyond. Stay ahead with the
          latest informations.
        </TypographyP>
        <Spacer small />
        <div className="mx-auto text-center">
          <Button asChild>
            <Link href={"/disasters"}>View recent events</Link>
          </Button>
        </div>
        <Spacer />
      </AppContainer>
    </section>
  );
};
