'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createRangeAction, deleteRangeAction } from '@src/actions/ranges.actions';
import { CircleDot, Loader } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type RangeItemProps = {
	id?: string;
	start: string;
	end: string;
	key_id: string;
	isTaken?: boolean;
	onChange: (operation: 'add' | 'remove', key: string, id?: string) => void;
	disabled?: boolean;
};

export const RangeItem: FC<RangeItemProps> = ({ id, start, end, key_id, isTaken, onChange, disabled }) => {
	const { execute: createRange, isPending: crateRangePending } = useServerAction(createRangeAction, {
		onSuccess: (data) => {
			onChange('add', key_id, data.data.id);
		},
		onError: () => {
			toast.error("Une erreur s'est produite lors de la création de la plage");
		},
	});

	const { execute: deleteRange, isPending: deleteRangePending } = useServerAction(deleteRangeAction, {
		onSuccess: () => {
			onChange('remove', key_id);
		},
		onError: () => {
			toast.error("Une erreur s'est produite lors de la suppression de la plage");
		},
	});

	const toggleRange = () => {
		if (id) {
			deleteRange({ id });
		} else {
			createRange({ start, end, key_id });
		}
	};

	return (
		<Button
			disabled={crateRangePending || deleteRangePending || isTaken || disabled}
			onClick={toggleRange}
			variant={'outline'}
			className={cn('relative', {
				'border-primary bg-primary/10 text-primary': id && !isTaken,
				'hover:text-primary': id && !isTaken,
				'border-orange-500 bg-orange-500/10 text-orange-500': id && isTaken,
				'hover:text-orange-500': id && isTaken,
			})}
		>
			{(crateRangePending || deleteRangePending) && <Loader className='size-4 animate-spin' />}
			{start} - {end}
			{isTaken && (
				<span className='absolute top-0 right-0 rounded-full border flex justify-center items-center'>
					<CircleDot className='size-3 fill-current' />
				</span>
			)}
		</Button>
	);
};
