"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordAction } from '@src/actions/auth.actions';
import { UpdatePasswordSchema, updatePasswordSchema } from '@src/helpers/form-schemas/update-password-schema';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export default function PasswordInfos() {
	const form = useForm<UpdatePasswordSchema>({
		resolver: zodResolver(updatePasswordSchema),
	});

	const { execute, isPending } = useServerAction(updatePasswordAction, {
		onSuccess() {
			form.reset({
				oldPassword: '',
				password: '',
				confirm_password: '',
			});
			toast.success('Mot de passe mis à jour avec succès', {
				important: true,
			});
		},
		onError() {
			toast.error('Erreur lors de la mise à jour du mot de passe', {
				important: true,
			});
		},
	});

	function onSubmit(values: UpdatePasswordSchema) {
		execute(values);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-primary'>Modification du mot de passe</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='oldPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe courant</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Entrez votre mot de passe courant'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.oldPassword })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nouveau mot de passe</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Entrez votre nouveau mot de passe'
											{...field}
											className={cn({ 'border-destructive': form.formState.errors.password })}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirm_password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmez le nouveau mot de passe</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Entrez le mot de passe de confirmation'
											{...field}
											className={cn({
												'border-destructive': form.formState.errors.confirm_password,
											})}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type='submit' className='rounded-full' disabled={isPending}>
							{isPending && <Loader className='size-4 animate-spin mr-2' />}
							Enregistrer
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
