"use client";

import * as React from "react";
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typographies";
import { Skeleton } from "@/components/ui/skeleton";
import { useServerActionQuery } from "@/hooks/use-server-actions";
import { disastersAction } from "@src/actions/disasters.actions";
import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import { DisasterModel } from "@src/helpers/models/disaster.model";
import { AppContainer, Spacer } from "../global";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Disasters: React.FC = () => {
  const { data: disasters = [], isLoading } = useServerActionQuery(
    disastersAction,
    {
      queryKey: ["disasters"],
      input: undefined,
    }
  );
  return (
    <section>
      <AppContainer className="pb-20">
        <Spacer tooSmall />
        <TypographyH2 className="text-center">Recents Desasters</TypographyH2>
        <TypographyP className="text-center">
          Recents desasters during theses 3 months.
        </TypographyP>
        <Spacer small />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 min-h-screen bg-muted">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item, index) => (
              <div
                key={`${index}-skeleton`}
                className="bg-card border rounded-3xl p-5 flex gap-5"
              >
                <Skeleton className="w-16 flex-none h-16 rounded-md" />
                <div className="space-y-2 w-full">
                  <Skeleton className="w-full h-6 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : disasters && disasters.length > 0 ? (
            disasters.map((disaster: any) => (
              <Disaster key={disaster.id} {...disaster} />
            ))
          ) : (
            <div className="col-span-4">
              <Alert className="mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>no content found !</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </AppContainer>
    </section>
  );
};

interface DisasterProps {
  disaster: DisasterModel;
}

const Disaster = ({ disaster }: DisasterProps) => {
  return (
    <>
      {disaster ? (
        <div
          className={cn(
            "rounded-3xl bg-card border flex gap-5 p-5",
            "hover:border-primary hover:shadow-lg hover:cursor-default",
            "transition-all duration-300 group"
          )}
        >
          <File className="size-10 lg:size-16 flex-none" />
          <div>
            <TypographyH4 className="group-hover:text-primary transition duration-300 line-clamp-1">
              {disaster.title}
            </TypographyH4>
            <TypographyP className="line-clamp-2">
              {disaster.userId}
            </TypographyP>
          </div>
        </div>
      ) : (
        <div> empty content !</div>
      )}
    </>
  );
};
