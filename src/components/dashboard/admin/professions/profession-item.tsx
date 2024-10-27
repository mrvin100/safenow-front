import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { deleteProfessionAction } from '@src/actions/professions.actions';
import { ProfessionModel } from '@src/helpers/models/profession.model';
import { openConfirmModal } from '@src/helpers/stores/confirm-modal-store';
import { EditIcon, HammerIcon, Loader, MoreVertical, Trash2Icon } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type ProfessionItemProps = {
	item: ProfessionModel;
	onEdit?: () => void;
	onDeleted?: () => void;
};

export const ProfessionItem: FC<ProfessionItemProps> = (props) => {
	const { execute, isPending } = useServerAction(deleteProfessionAction, {
		onSuccess() {
			toast.success('Profession supprimée avec succès');
			props.onDeleted?.();
		},
		onError(error) {
			toast.error(error.err.message, {
				duration: 6000,
				important: true,
			});
		},
	});

	const handleDeleteClick = useCallback(() => {
		openConfirmModal(
			'Voulez-vous vraiment supprimer cette profession ? Elle ne sera plus disponible dans la liste des métiers pour un artisan.',
			() => {
				execute({ id: props.item.id });
			}
		);
	}, [execute, props.item.id]);

	return (
		<div
			className={cn(
				'bg-card border rounded-xl p-3 flex gap-3',
				'transition duration-300 cursor-default',
				'hover:shadow-lg hover:border-primary'
			)}
		>
			<div className='size-16 flex-none rounded-md bg-primary/20 text-primary flex justify-center items-center'>
				<HammerIcon className='size-12' />
			</div>
			<div className='space-y-2 w-full'>
				<div className='flex gap-2 relative'>
					<p className='w-full h-6 line-clamp-1 font-medium text-foreground text-lg'>{props.item.label}</p>
					<div className='flex-none w-6' />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								disabled={isPending}
								size='icon'
								variant='outline'
								className='rounded-full absolute -top-2 -right-2'
							>
								{isPending ? (
									<Loader className='size-4 text-muted-foreground animate-spin' />
								) : (
									<MoreVertical className='size-4 text-muted-foreground' />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={props.onEdit}>
								<EditIcon className='size-4 mr-2' />
								Modifier
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleDeleteClick}>
								<Trash2Icon className='size-4 mr-2' />
								Supprimer
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<blockquote className='line-clamp-2 text-sm text-muted-foreground'>{props.item.description}</blockquote>
			</div>
		</div>
	);
};
