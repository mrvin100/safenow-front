import { TypographyH2, TypographyP } from "@/components/ui/typographies";
import { FC } from "react";
import { AppContainer, Spacer } from "./../global/";
import ContactForm from "./contact-form";

export const Contact: FC = () => {
  return (
    <section className="">
      <AppContainer className="bg-muted">
        <Spacer tooSmall />
        <TypographyH2 className="mx-auto max-w-3xl text-center text-primary">
          Contact Us
        </TypographyH2>
        <div className="max-w-3xl mx-auto shadow-sm">
          <ContactForm />
        </div>
        <Spacer tooSmall />
      </AppContainer>
    </section>
  );
};
