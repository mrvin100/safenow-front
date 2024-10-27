import QuotesTable from "@src/components/dashboard/client/quotes/data-table";
import { TitleSection } from "@src/components/dashboard/title-section";

export default async function Page() {
  return (
    <div className="scroll-m-20 tracking-tight">
      <TitleSection title="Gestion des devis" />
      <QuotesTable isAll />
    </div>
  );
}
