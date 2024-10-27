'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TypographyP } from '@/components/ui/typographies';
import { useServerActionQuery } from '@/hooks/use-server-actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendQuoteAction } from '@src/actions/quotes.actions';
import { getServicesAction } from '@src/actions/services.actions';
import { EmptyContent } from '@src/components/empty-content';
import { quoteServiceSchema, QuoteServiceSchema } from '@src/helpers/form-schemas/quote-services-schema';
import { formatCurrency } from '@src/helpers/util-functions';
import 'dayjs/locale/fr';
import { ArrowLeftIcon, Loader, Minus, PlusIcon, Send, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

type Props = {
	requestedQuoteId: string;
	clientId: string;
};

export const CreateQuoteForm = ({ requestedQuoteId, clientId }: Props) => {
	const router = useRouter();

	const form = useForm<QuoteServiceSchema>({
		resolver: zodResolver(quoteServiceSchema),
	});

	const { fields, append, remove } = useFieldArray({ name: 'services', control: form.control });

	const { data: services = [] } = useServerActionQuery(getServicesAction, {
		queryKey: ['get-artisan-services'],
		input: undefined,
	});

	const { execute, isPending } = useServerAction(sendQuoteAction, {
		onSuccess(data) {
			console.log('Quote sent: ', data);
			toast.success('Super !', {
				description: 'Le devis a été envoyé avec succès',
				important: true,
			});
			router.push('/dashboard/manage-quotes/sended-quotes');
		},
		onError() {
			toast.error('Oops !', {
				description: "Une erreur s'est produite lors de l'envoi du devis",
				important: true,
			});
		},
	});

	const submit = (value: QuoteServiceSchema) => {
		execute({
			services: value.services.map((item) => {
				const service = services.find((s) => s.id == item.service);

				return {
					label: `${service?.label}`,
					description: `${service?.description}`,
					price: parseFloat(item.price),
					qte: parseInt(item.qte),
				};
			}),
			quoteRequestId: requestedQuoteId,
			clientId,
		});
	};

	const addRow = () =>
		append({
			service: '',
			qte: '',
			price: '',
		});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className='bg-card border rounded-xl p-5 space-y-5 mb-8'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<Button
							variant={'outline'}
							size={'icon'}
							type='button'
							onClick={router.back}
							className='rounded-full'
						>
							<ArrowLeftIcon className='size-6' />
						</Button>
						<h2 className='text-lg font-medium text-foreground'>Créer un devis</h2>
					</div>
					<div className='flex'>
						<Button disabled={isPending} variant={'ghost'} size='sm' type='submit'>
							{isPending ? <Loader className='mr-2 animate-spin' /> : <Send className='size-4 mr-2' />}
							<span className='hidden lg:inline-block'>Envoyer</span>
						</Button>
						<Button
							disabled={isPending}
							variant={'ghost'}
							type='button'
							size='sm'
							className='text-destructive'
						>
							<XIcon className='size-4 mr-2' />
							<span className='hidden lg:inline-block'>Annuler</span>
						</Button>
					</div>
				</div>
				<div className=''>
					<Label className='mb-5 block'>Services</Label>
					{fields.length === 0 ? (
						<EmptyContent
							text='Aucun service ajouté, veuillez ajouter un service pour continuer'
							actionContent={
								<Button type='button' onClick={addRow} className='rounded-full'>
									<PlusIcon className='size-6' />
								</Button>
							}
						/>
					) : (
						fields.map((field, index) => (
							<div key={field.id} className='grid grid-cols-12 gap-4 relative mb-8'>
								<FormField
									control={form.control}
									name={`services.${index}.service`}
									render={({ field }) => (
										<FormItem className='col-span-12 lg:col-span-6'>
											<FormControl>
												<Select {...field} value={field.value} onValueChange={field.onChange}>
													<SelectTrigger
														className={cn({
															'border-destructive':
																form.formState.errors.services?.[index]?.service,
														})}
													>
														<SelectValue placeholder='Sélectionnez un service' />
													</SelectTrigger>
													<SelectContent>
														{services.map((service) => (
															<SelectItem key={service.id} value={service.id}>
																{service.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`services.${index}.price`}
									render={({ field }) => (
										<FormItem className='col-span-6 lg:col-span-3'>
											<FormControl>
												<div className='relative'>
													<Input
														{...field}
														placeholder='0.00'
														className={cn('pl-14 pr-10', {
															'border-destructive':
																form.formState.errors.services?.[index]?.price,
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
								<FormField
									control={form.control}
									name={`services.${index}.qte`}
									render={({ field }) => (
										<FormItem className='col-span-6 lg:col-span-3'>
											<FormControl>
												<div className='relative'>
													<Input
														{...field}
														placeholder='0'
														className={cn('pl-14 pr-10', {
															'border-destructive':
																form.formState.errors.services?.[index]?.qte,
														})}
													/>
													<div className='absolute top-0 bottom-0 left-0 w-12 border-r flex justify-center items-center'>
														Qte
													</div>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
								<button
									type='button'
									onClick={() => remove(index)}
									className='absolute -top-2 size-6 right-0 bg-destructive text-white rounded-full p-1'
								>
									<Minus className='size-4' />
								</button>
							</div>
						))
					)}
				</div>
				<div className='flex justify-end'>
					<Button type='button' size='icon' onClick={addRow} className='rounded-full'>
						<PlusIcon className='size-6' />
					</Button>
				</div>
			</form>
			<Recap services={form.watch().services} />
		</Form>
	);
};

const Recap = ({ services }: QuoteServiceSchema) => {
	const totalAmount = useMemo(
		() => services.reduce((acc, service) => acc + Number(service.price) * Number(service.qte), 0),
		[services]
	);

	return (
		<div className='bg-card border rounded-xl p-4 w-full lg:w-96 space-y-4'>
			<div className='flex justify-between items-center'>
				<TypographyP>Montant HT</TypographyP>
				<TypographyP className='font-bold'>{formatCurrency(totalAmount)}</TypographyP>
			</div>
			<div className='flex justify-between items-center'>
				<TypographyP>TVA (20%)</TypographyP>
				<TypographyP className='font-bold'>{formatCurrency(totalAmount * 0.2)}</TypographyP>
			</div>
			<div className='flex justify-between items-center'>
				<TypographyP>Total TTC</TypographyP>
				<TypographyP className='font-bold'>{formatCurrency(totalAmount + totalAmount * 0.2)}</TypographyP>
			</div>
		</div>
	);
};
