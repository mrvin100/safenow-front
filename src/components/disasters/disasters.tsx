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
import { Reaction } from "@src/helpers/models/disaster.model";

export const Disasters: React.FC = () => {
  const { data: disasters = [], isLoading } = useServerActionQuery(
    disastersAction,
    {
      queryKey: ["disasters"],
      input: undefined,
    }
  );
  return (
    <section className="bg-primary/20">
      <TypographyH2 className="text-center">
        Les services les plus sollicités
      </TypographyH2>
      <TypographyP className="text-center">
        Les services les plus sollicités ces 3 derniers mois.
      </TypographyP>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 pt-5">
        {isLoading
          ? []
          : disasters.map((disaster:any) => (
              <Disaster key={disaster.id} {...disaster} />
            ))}
      </div>
    </section>
  );
};

type Props = { id: string; title: string; reactions: Reaction, userId: string };

const Disaster = ({  id, title, reactions, userId}: Props) => {
  return (
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
          hhhh
        </TypographyH4>
        <TypographyP className="line-clamp-2">iiii</TypographyP>
      </div>
    </div>
  );
};
