import { cn } from "@/lib/utils";
import ProjectsTable from "@src/components/dashboard/client/projets/data-table";
import { CompleteProjectsCount } from "@src/components/dashboard/client/stats/complete-project-count";
import { InProgressProjectsCount } from "@src/components/dashboard/client/stats/inprogress-project-count";
import { QuotesProcessedCount } from "@src/components/dashboard/client/stats/quotes-processed-count";
import { TitleSection } from "@src/components/dashboard/title-section";

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title="Tableau de bord" />
			<div className={cn('grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 md:gap-8 md:mb-8')}>
				<InProgressProjectsCount />
				<CompleteProjectsCount />
				<QuotesProcessedCount />
			</div>
			<ProjectsTable isAll />
		</div>
	);
}
