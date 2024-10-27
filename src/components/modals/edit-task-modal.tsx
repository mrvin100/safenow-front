'use client';

import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputChips } from '@/components/ui/input-chips';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskAction } from '@src/actions/projects.actions';
import { taskSchema, TaskSchema } from '@src/helpers/form-schemas/task-schema';
import { TaskModel } from '@src/helpers/models/task.model';
import { LoaderIcon } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { AssignedTask } from '../dashboard/artisan/tasks/assigned-task';

export type EditTaskModalRef = {
	open: (projectId: string, task?: TaskModel) => void;
};

export type EditTaskModalProps = { onCompleted: () => void };

export const EditTaskModal = forwardRef<EditTaskModalRef, EditTaskModalProps>(({}, ref) => {
	const form = useForm<TaskSchema>({
		resolver: zodResolver(taskSchema),
	});

	const [open, setOpen] = useState<boolean>(false);

	const { execute, isPending } = useServerAction(createTaskAction, {
		onSuccess() {
			closeModal();
			toast.success('La task a été enregistrée avec succès.', { important: true });
		},
		onError() {
			toast.error("Une erreur s'est produite lors de l'enregistrement de la task.", { important: true });
		},
	});

	const closeModal = () => {
		setOpen(false);
		form.reset({ body: undefined, description: undefined, tags: [], asignTo: undefined });
	};

	const onSubmit = async (values: TaskSchema) => {
		// TODO
		execute(values);
	};

	useImperativeHandle(ref, () => ({
		open(projectId, task) {
			setOpen(true);
			form.reset({ ...task, projectId });
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
						{form.watch()['projectId'] ? 'Modifier la tache' : 'Ajouter une tache'}
					</CredenzaTitle>
				</CredenzaHeader>
				<CredenzaBody>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='body'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Libelle de la tache</FormLabel>
										<FormControl>
											<Input
												type='text'
												autoComplete='name'
												className={cn(form.formState.errors.body && 'border-destructive')}
												placeholder={'Tapes le libelle de la tache'}
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
										<FormLabel>Description de la tache</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												className={cn(
													form.formState.errors.description && 'border-destructive'
												)}
												placeholder={'Tapes la description de la tache'}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='h-5'></div>
							<FormField
								control={form.control}
								name='tags'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags de la tache</FormLabel>
										<FormControl>
											<InputChips
												placeholder={'Tapes un tag'}
												value={field.value}
												onValueChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='h-5'></div>
							<FormField
								control={form.control}
								name='asignTo'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assigner à</FormLabel>
										<FormControl>
											<AssignedTask assignedTo={field.value} onChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='h-5'></div>
							<div className={cn('flex justify-end flex-col md:flex-row', 'gap-3 pb-5 md:pb-0')}>
								<Button
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
									type='submit'
									variant={'ghost'}
									className={cn(
										'text-primary hover:text-primary rounded-full',
										'hover:bg-primary/20'
									)}
								>
									{isPending && <LoaderIcon className='mr-2 size-4 animate-spin' />}
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

EditTaskModal.displayName = 'EditTaskModal';
