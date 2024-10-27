'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TypographyH4 } from '@/components/ui/typographies';
import { updateUserAvatarAction } from '@src/actions/auth.actions';
import { useAuthContext } from '@src/components/providers/auth.provider';
import { DEFAULT_AVATAR } from '@src/helpers/util-functions';
import { Loader } from 'lucide-react';
import { ChangeEventHandler, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';

export const UserProfile = () => {
	const inputFileRef = useRef<HTMLInputElement>(null);

	const {
		auth: { user },
	} = useAuthContext();

	const { execute, isPending } = useServerAction(updateUserAvatarAction, {
		onSuccess() {
			toast.success('Image de profil mise à jour avec succès', {
				important: true,
			});
		},
		onError() {
			toast.error("Erreur lors de la mise à jour de l'image de profil", {
				important: true,
			});
		},
	});

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			const file = e.target.files?.[0];
			if (file) {
				const formData = new FormData();
				formData.append('profile', file);
				execute(formData);
			}
		},
		[execute]
	);

	return (
		<Card className='flex gap-4 items-center p-4 md:p-8'>
			<Avatar className='flex-none size-24'>
				<AvatarImage src={user?.profileImage || DEFAULT_AVATAR} className='object-cover' />
				<AvatarFallback>{`${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}</AvatarFallback>
			</Avatar>
			<div>
				<input
					type='file'
					className='absolute size-0'
					onChange={handleFileChange}
					ref={inputFileRef}
					accept='image/*'
				/>
				<TypographyH4 className='my-2'>
					{user?.firstName} {user?.lastName}
				</TypographyH4>
				<Button
					onClick={() => inputFileRef.current?.click()}
					disabled={isPending}
					variant={'outline'}
					className='rounded-full'
				>
					{isPending && <Loader className='size-4 animate-spin mr-2' />}
					Modifier
				</Button>
			</div>
		</Card>
	);
};
