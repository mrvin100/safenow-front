import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { FC, useMemo } from 'react';

export type TableLoaderProps = {
	rows?: number;
	cols?: number;
};

export const TableLoader: FC<TableLoaderProps> = (props) => {
	const rows = useMemo(() => {
		return Array.from({ length: props.rows || 5 });
	}, [props.rows]);

	const cols = useMemo(() => {
		return Array.from({ length: props.cols || 4 });
	}, [props.cols]);

	return (
		<div className={cn('')}>
			<Table>
				<TableHeader className='bg-accent'>
					<TableRow>
						<TableHead>
							<Skeleton className='h-4 w-[200px]' />
						</TableHead>
						{cols.map((_item, i) => (
							<TableHead key={`header-col-${i}`}>
								<Skeleton className='h-4 w-[100px]' />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((_item, i) => (
						<TableRow key={`item-${i}`}>
							<TableCell>
								<Skeleton className='h-3 w-[150px]' />
							</TableCell>
							{cols.map((_item, j) => (
								<TableCell key={`row-col-${j}`}>
									<Skeleton className='h-3 w-[80px]' />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
