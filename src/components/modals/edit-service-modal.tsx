import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createServiceAction, updateServiceAction } from '@src/actions/services.actions';
import { serviceSchema, ServiceSchema } from '@src/helpers/form-schemas/service-schema';
import { ServiceModel } from '@src/helpers/models/service.model';
import { LoaderIcon } from 'lucide-react';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export type EditServiceModalRef = {
	open: (service?: ServiceModel) => void;
};

export type EditServiceModalProps = { onCompleted: () => void };

export const EditServiceModal = forwardRef<EditServiceModalRef, EditServiceModalProps>(({ onCompleted }, ref) => {
	const form = useForm<ServiceSchema>({
		resolver: zodResolver(serviceSchema),
	});

	const [open, setOpen] = useState<boolean>(false);
	const [service, setService] = useState<ServiceModel>();

	const { execute: createService, isPending: createPending } = useServerAction(createServiceAction, {
		onSuccess() {
			toast.success('Service enregistré avec succès');
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

	const { execute: updateService, isPending: updatePending } = useServerAction(updateServiceAction, {
		onSuccess() {
			toast.success('Service modifié avec succès');
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
		form.reset({ label: undefined, description: undefined, price: undefined });
	};

	const onSubmit = useCallback(
		async (values: ServiceSchema) => {
			if (service?.id) updateService({ ...values, id: service.id });
			else createService(values);
		},
		[createService, service?.id, updateService]
	);

	useImperativeHandle(ref, () => ({
		open(service) {
			setOpen(true);
			setService(service);
			form.reset({ ...service, price: service?.price?.toString() });
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
					<CredenzaTitle>{service ? 'Modifier le service' : 'Ajouter un service'}</CredenzaTitle>
				</CredenzaHeader>
				<CredenzaBody>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='label'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Libelle du service</FormLabel>
										<FormControl>
											<Input
												type='text'
												autoComplete='name'
												className={cn(form.formState.errors.label && 'border-destructive')}
												placeholder={'Tapes le libelle du service'}
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
										<FormLabel>Description du service</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												className={cn(
													form.formState.errors.description && 'border-destructive'
												)}
												placeholder={'Tapes la description du service'}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='h-5'></div>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description du service</FormLabel>
										<FormControl>
											<div className='relative'>
												<Input
													{...field}
													placeholder='0.00'
													className={cn('pl-14 pr-10', {
														'border-destructive': form.formState.errors.price,
													})}
												/>
												<div className='absolute top-0 bottom-0 left-0 w-12 border-r flex items-center justify-center'>
													Prix
												</div>
												<div className='absolute top-0 bottom-0 right-0 w-8 border-l flex items-center justify-center'>
													€
												</div>
											</div>
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
});

EditServiceModal.displayName = 'EditServiceModal';
