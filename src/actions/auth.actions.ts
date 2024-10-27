'use server';

import { signInSchema } from '@src/helpers/form-schemas/sign-in-schema';
import { signUpSchema } from '@src/helpers/form-schemas/sign-up-schema';
import { updatePasswordSchema } from '@src/helpers/form-schemas/update-password-schema';
import { userInfoSchema } from '@src/helpers/form-schemas/user-info-schema';
import { UserModel } from '@src/helpers/models/user.model';
import { checkUserSession, createSession, deleteSession, updateSession } from '@src/helpers/sessions';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

const baseUrl = process.env.API_URL + '/auth';

export const signInAction = createServerAction()
  .input(signInSchema)
  .handler<Promise<any>>(async ({ input }) => {
    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: input.email, // utiliser l'email comme username
          password: input.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ZSAError('ERROR', error.message);
      }

      const result = await response.json();

      // Créer une session
      createSession(result);

      return result; // Retourner les détails de l'utilisateur
    } catch (error) {
      console.error('Error while signing in', error);
      throw new ZSAError('ERROR', (error as any).message);
    }
  });

	export const signUpAction = createServerAction()
  .input(signUpSchema)
  .handler<Promise<any>>(async ({ input }) => {
	console.log("forms datas : ", input)
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
		  password: input.password,
		  role: input.role,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ZSAError('ERROR', error.message);
      }

      const result = await response.json();
      return result; // Retourne l'utilisateur créé
    } catch (error) {
      console.error('Error while signing up', error);
      throw new ZSAError('ERROR', (error as any).message);
    }
  });

export const signOutAction = createServerAction().handler(async () => {
	deleteSession();
	redirect('/sign-in');
});

export const updateUserInfoAction = createServerAction()
	.input(userInfoSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${baseUrl}/infos/${auth?.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
				body: JSON.stringify(input),
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			// update user session.
			await updateSession(jsonResponse);

			return jsonResponse as UserModel;
		} catch (error) {
			console.error('Error while updating user info: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const updatePasswordAction = createServerAction()
	.input(updatePasswordSchema)
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${baseUrl}/password/${auth?.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
				body: JSON.stringify(input),
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return jsonResponse;
		} catch (error) {
			console.error('Error while updating password: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const updateUserAvatarAction = createServerAction()
	.input(z.object({ profile: z.any() }), { type: 'formData' })
	.handler(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const formData = new FormData();
			formData.append('profile', input.profile);

			const response = await fetch(`${baseUrl}/profile-image/${auth.user.id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${auth?.token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				const error = await response.text();
				throw new ZSAError('ERROR', error);
			}

			const result = await response.json();

			// update user session.
			await updateSession({ ...auth.user, profileImage: result.profileImage });

			return result;
		} catch (error) {
			console.error('Error while updating user avatar', error);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});
