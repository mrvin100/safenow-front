'use client';

import { Button } from '@/components/ui/button';
import {
	Credenza,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
} from '@/components/ui/credenza';
import { cn } from '@/lib/utils';
import { useConfirmModalStore } from '@src/helpers/stores/confirm-modal-store';

export const ConfirmModal = () => {
	const { isVisible, message, closeModal, onConfirm, onDenied, resetModal } = useConfirmModalStore();

	return (
		<Credenza
			open={isVisible}
			onOpenChange={(s) => {
				if (!s) resetModal();
			}}
		>
			<CredenzaContent>
				<CredenzaHeader className='space-y-3'>
					<CredenzaTitle>Confirmation !</CredenzaTitle>
					<CredenzaDescription>
						{message || 'Voulez-vous vraiment confirmer cette opération ?'}
					</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaFooter>
					<Button
						variant={'ghost'}
						onClick={() => {
							closeModal();
							onDenied?.();
						}}
						className={cn('text-destructive hover:text-destructive', 'hover:bg-destructive/20')}
					>
						ANNULER
					</Button>
					<Button
						variant={'ghost'}
						onClick={() => {
							closeModal();
							onConfirm?.();
						}}
						className={cn('text-primary hover:text-primary', 'hover:bg-primary/20')}
					>
						CONFIRMER
					</Button>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
};
