import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TypographyP } from '@/components/ui/typographies';
import { cn } from '@/lib/utils';
import { deleteServiceAction } from '@src/actions/services.actions';
import { ServiceSVG } from '@src/components/svg/ServiceSVG';
import { ServiceModel } from '@src/helpers/models/service.model';
import { openConfirmModal } from '@src/helpers/stores/confirm-modal-store';
import { formatCurrency } from '@src/helpers/util-functions';
import { EditIcon, Loader, MoreVertical, Trash2Icon } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type ServiceItemProps = {
	item: ServiceModel;
	onEdit?: () => void;
	onDeleted?: () => void;
};

export const ServiceItem: FC<ServiceItemProps> = (props) => {
	const { execute, isPending } = useServerAction(deleteServiceAction, {
		onSuccess() {
			toast.success('Service supprimé avec succès');
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
			'Voulez-vous vraiment supprimer cette service ? Elle ne sera plus disponible dans pour la construction de vos devis.',
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
			<div className='size-16 flex-none rounded-md text-primary flex justify-center items-center'>
				<ServiceSVG className='size-16' />
			</div>
			<div className='w-full space-y-1'>
				<div className='flex gap-2 relative'>
					<p className='w-full h-6 line-clamp-1 font-semibold text-foreground text-lg'>{props.item.label}</p>
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
				<blockquote className='line-clamp-2 text-base text-muted-foreground'>
					{props.item.description}
				</blockquote>
				<TypographyP className='text-base font-bold text-orange-500'>
					{formatCurrency(props.item.price)}
				</TypographyP>
			</div>
		</div>
	);
};
