import AppointmentsTable from "@src/components/dashboard/client/appointments/data-table";
import { TitleSection } from "@src/components/dashboard/title-section";

export default async function Page() {
  return (
    <div className="scroll-m-20 tracking-tight">
      <TitleSection title="Gestion de Rendez-vous" />
      <AppointmentsTable isAll />
    </div>
  );
}
