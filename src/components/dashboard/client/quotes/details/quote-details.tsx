"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TypographyH4, TypographyP } from "@/components/ui/typographies";
import { MessageCircle, Printer, UserCheck2, UserCog } from "lucide-react";
import Image from "next/image";
import QuotesDetailsTable from "./data-table";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Calendar } from "@/components/ui/calendar";

export function QuoteDetails({ quoteId }: { quoteId: string }) {
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <Card className="flex gap-4 items-center justify-between p-4 md:p-6">
          <div className="flex gap-4 items-center">
            <Image
              src={"/user-profile.png"}
              alt="client profile"
              width={100}
              height={100}
              className="rounded-full h-16 w-16 object-cover"
            />
            <div>
              <TypographyH4>{`Baxter Building`}</TypographyH4>
              <TypographyP className="text-muted-foreground">{`Menusier`}</TypographyP>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap justify-end">
            <Button className="bg-[#32ADE6] text-white">
              <Printer className="h-4 w-4 mr-2" /> Imprimer
            </Button>
            <Button className=" bg-orange-500 text-white">
              <MessageCircle className="h-4 w-4 mr-2" /> Message
            </Button>
          </div>
        </Card>
        <QuotesDetailsTable isAll />
        <div className="bg-primary/10 rounded-md w-full p-4 max-w-64 ml-auto">
          <ul className="space-y-1">
            <li className="flex justify-between">
              Montant HT <span className="font-medium">1500 €</span>
            </li>
            <li className="flex justify-between">
              TVA (20%) <span className="font-medium">75€</span>
            </li>
            <li className="flex justify-between">
              Total TTC <span className="font-medium">1575€</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <TakeAppointment />
      </div>
    </div>
  );
}

function TakeAppointment() {
  const periods = [
    { content: "12h30 - 13h30", isReserved: false },
    { content: "13h30 - 14h30", isReserved: false },
    { content: "14h30 - 15h30", isReserved: true },
    { content: "15h30 - 16h30", isReserved: false },
    { content: "16h30 - 17h30", isReserved: false },
  ];
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Credenza>
        <CredenzaTrigger asChild>
          <Button>
            <UserCog className="w-4 h-4 mr-2" />
            Prendre un rendez-vous
          </Button>
        </CredenzaTrigger>
        <CredenzaContent className="p-4 sm:p-6">
          <CredenzaHeader>
            <CredenzaTitle>Prendre un rendez-vous</CredenzaTitle>
          </CredenzaHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <TypographyH4 className="text-base text-muted-foreground">
                Sélectionnez une date
              </TypographyH4>
              <div>
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md flex justify-center items-center px-0"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <TypographyH4 className="text-base text-muted-foreground">
                Sélectionnez une plage pour le rendez-vous
              </TypographyH4>
              <div className="space-x-3 space-y-3">
                {periods &&
                  periods.length > 0 &&
                  periods.map((period) => (
                    <Button
                      key={period.content}
                      variant={period.isReserved ? "default" : "outline"}
                    >
                      {period.content}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
          <CredenzaFooter>
            <Button>
              {" "}
              <UserCheck2 className="h-4 w-4 mr-2" /> Valider
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
