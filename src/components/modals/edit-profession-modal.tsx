import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProfessionAction, updateProfessionAction } from '@src/actions/professions.actions';
import { professionSchema, ProfessionSchema } from '@src/helpers/form-schemas/profession-schema';
import { ProfessionModel } from '@src/helpers/models/profession.model';
import { LoaderIcon } from 'lucide-react';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type EditProfessionModalRef = {
	open: (profession?: ProfessionModel) => void;
};

export type EditProfessionModalProps = { onCompleted: () => void };

export const EditProfessionModal = forwardRef<EditProfessionModalRef, EditProfessionModalProps>(
	({ onCompleted }, ref) => {
		const form = useForm<ProfessionSchema>({
			resolver: zodResolver(professionSchema),
		});

		const [open, setOpen] = useState<boolean>(false);
		const [profession, setProfession] = useState<ProfessionModel>();

		const { execute: createProfession, isPending: createPending } = useServerAction(createProfessionAction, {
			onSuccess() {
				toast.success('Profession enregistrée avec succès');
				onCompleted();
				closeModal();
			},
			onError(error) {
				toast.error(error.err.message, {
					duration: 6000,
					important: true,
				});
			},
		});

		const { execute: updateProfession, isPending: updatePending } = useServerAction(updateProfessionAction, {
			onSuccess() {
				toast.success('Profession modifiée avec succès');
				onCompleted();
				closeModal();
			},
			onError(error) {
				toast.error(error.err.message, {
					duration: 6000,
					important: true,
				});
			},
		});

		const closeModal = () => {
			setOpen(false);
			form.reset({ label: undefined, description: undefined });
		};

		const onSubmit = useCallback(
			async (values: ProfessionSchema) => {
				if (profession?.id) updateProfession({ ...values, id: profession.id });
				else createProfession(values);
			},
			[createProfession, profession?.id, updateProfession]
		);

		useImperativeHandle(ref, () => ({
			open(profession) {
				setOpen(true);
				setProfession(profession);
				form.reset({ ...profession });
			},
		}));

		return (
			<Credenza
				open={open}
				onOpenChange={(s) => {
					if (!s) closeModal();
				}}
			>
				<CredenzaContent>
					<CredenzaHeader className='space-y-3'>
						<CredenzaTitle>
							{profession ? 'Modifier la profession' : 'Ajouter une profession'}
						</CredenzaTitle>
					</CredenzaHeader>
					<CredenzaBody>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name='label'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Libelle de la profession</FormLabel>
											<FormControl>
												<Input
													type='text'
													autoComplete='name'
													className={cn(form.formState.errors.label && 'border-destructive')}
													placeholder={'Tapes le libelle de la profession'}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='h-5'></div>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description de la profession</FormLabel>
											<FormControl>
												<Textarea
													rows={5}
													className={cn(
														form.formState.errors.description && 'border-destructive'
													)}
													placeholder={'Tapes la description de la profession'}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='h-5'></div>
								<div className={cn('flex justify-end flex-col md:flex-row', 'gap-3 pb-5 md:pb-0')}>
									<Button
										disabled={createPending || updatePending}
										type='button'
										variant={'ghost'}
										onClick={closeModal}
										className={cn(
											'text-destructive hover:text-destructive rounded-full',
											'hover:bg-destructive/20'
										)}
									>
										Annuler
									</Button>
									<Button
										disabled={createPending || updatePending}
										type='submit'
										variant={'ghost'}
										className={cn(
											'text-primary hover:text-primary rounded-full',
											'hover:bg-primary/20'
										)}
									>
										{(createPending || updatePending) && (
											<LoaderIcon className='mr-2 size-4 animate-spin' />
										)}
										Enregistrer
									</Button>
								</div>
							</form>
						</Form>
					</CredenzaBody>
				</CredenzaContent>
			</Credenza>
		);
	}
);

EditProfessionModal.displayName = 'EditProfessionModal';
