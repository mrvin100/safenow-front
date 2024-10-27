"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserInfoAction } from '@src/actions/auth.actions';
import { useAuthContext } from '@src/components/providers/auth.provider';
import { UserInfoSchema, userInfoSchema } from '@src/helpers/form-schemas/user-info-schema';
import { Loader } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export default function PersonalInfos() {
	const { auth } = useAuthContext();

	const form = useForm<UserInfoSchema>({
		resolver: zodResolver(userInfoSchema),
		defaultValues: useMemo(() => auth.user, [auth.user]),
	});

	const { execute, isPending } = useServerAction(updateUserInfoAction, {
		onSuccess() {
			toast.success('Informations personnelles mises à jour avec succès', {
				important: true,
			});
		},
		onError() {
			toast.error('Erreur lors de la mise à jour des informations personnelles', {
				important: true,
			});
		},
	});

	function onSubmit(values: UserInfoSchema) {
		execute(values);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-primary'>Informations personnelles</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prénom</FormLabel>
									<FormControl>
										<Input
											placeholder='Taper votre prénom'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.firstName })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom</FormLabel>
									<FormControl>
										<Input
											placeholder='Taper votre nom'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.lastName })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse email</FormLabel>
									<FormControl>
										<Input
											type='email'
											disabled
											placeholder='Taper votre adresse e-mail'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.email })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Numéro de téléphone</FormLabel>
									<FormControl>
										<Input
											type='tel'
											disabled
											placeholder='Taper votre numéro de téléphone'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.phone })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem className='lg:col-span-2'>
									<FormLabel>Adresse</FormLabel>
									<FormControl>
										<Input
											placeholder='Taper votre adresse'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.address })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='lg:col-span-2'>
							<Button type='submit' className='rounded-full' disabled={isPending}>
								{isPending && <Loader className='size-4 animate-spin mr-2' />}
								Enregistrer
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

