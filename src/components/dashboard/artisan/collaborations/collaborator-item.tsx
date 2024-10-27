import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { deleteInvitationAction } from '@src/actions/collaborators.actions';
import { useAuthContext } from '@src/components/providers/auth.provider';
import { InvitationModel } from '@src/helpers/models/invitation.model';
import { openConfirmModal } from '@src/helpers/stores/confirm-modal-store';
import { DEFAULT_AVATAR } from '@src/helpers/util-functions';
import { Loader, Trash2Icon } from 'lucide-react';
import { FC, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type CollaboratorItemProps = {
	item: InvitationModel;
	onDeleted?: () => void;
};

export const CollaboratorItem: FC<CollaboratorItemProps> = (props) => {
	const { auth } = useAuthContext();

	const { execute, isPending } = useServerAction(deleteInvitationAction, {
		onSuccess() {
			toast.success('Collaborateur supprimé avec succès');
			props.onDeleted?.();
		},
		onError(error) {
			toast.error(error.err.message, {
				duration: 6000,
				important: true,
			});
		},
	});

	const user = useMemo(
		() => (props.item.emitBy.id === auth?.user?.id ? props.item.emitTo : props.item.emitBy),
		[auth?.user?.id, props.item.emitBy, props.item.emitTo]
	);

	const handleDeleteClick = useCallback(() => {
		openConfirmModal('Voulez-vous vraiment supprimer cette collaboration ?', () => {
			execute({ id: props.item.id });
		});
	}, [execute, props.item.id]);

	return (
		<div
			className={cn(
				'bg-card border rounded-xl p-3 flex gap-3',
				'transition duration-300 cursor-default',
				'hover:shadow-lg hover:border-primary'
			)}
		>
			<Avatar className='flex-none size-16'>
				<AvatarImage src={user.profileImage || DEFAULT_AVATAR} className='object-cover' />
				<AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
			</Avatar>
			<div className='w-full space-y-1'>
				<div className='flex gap-2 relative'>
					<p className='w-full h-6 line-clamp-1 font-semibold text-foreground text-lg'>
						{user.firstName} {user.lastName}
					</p>
					<div className='flex-none w-6' />
					<Button
						onClick={handleDeleteClick}
						disabled={isPending}
						size='icon'
						variant='outline'
						className='rounded-full absolute -top-2 -right-2'
					>
						{isPending ? (
							<Loader className='size-4 text-muted-foreground animate-spin' />
						) : (
							<Trash2Icon className='size-4 text-muted-foreground' />
						)}
					</Button>
				</div>
				<blockquote className='line-clamp-2 text-base text-muted-foreground'>{user.email}</blockquote>
			</div>
		</div>
	);
};
