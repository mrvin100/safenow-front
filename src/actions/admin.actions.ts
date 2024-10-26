"use server";

import { ArtisanModel } from '@src/helpers/models/artisan.model';
import { Role, UserModel } from '@src/helpers/models/user.model';
import { checkUserSession } from '@src/helpers/sessions';
import { ResponseCollectionType } from '@src/helpers/util-types';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

/**
 * Count the number of quotes in the database
 */
export const countQuoteAction = createServerAction().handler(async () => {
  try {
    const auth = await checkUserSession();

    const response = await fetch(`${process.env.API_URL}/count/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new ZSAError("ERROR", jsonResponse.error);
    }

    return jsonResponse as { count: number };
  } catch (error) {
    console.error("Error while counting quotes: ", (error as any).message);
    throw new ZSAError("ERROR", (error as any).message);
  }
});

/**
 * Count the number of clients in the database
 */
export const countClientAction = createServerAction().handler(async () => {
  try {
    const auth = await checkUserSession();

    const response = await fetch(
      `${process.env.API_URL}/count/clients-account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new ZSAError("ERROR", jsonResponse.error);
    }

    return jsonResponse as { count: number };
  } catch (error) {
    console.error("Error while counting clients: ", (error as any).message);
    throw new ZSAError("ERROR", (error as any).message);
  }
});

/**
 * Count the number of artisans in the database
 */
export const countArtisanAction = createServerAction().handler(async () => {
  try {
    const auth = await checkUserSession();

    const response = await fetch(
      `${process.env.API_URL}/count/artisans-account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new ZSAError("ERROR", jsonResponse.error);
    }

    return jsonResponse as { count: number };
  } catch (error) {
    console.error("Error while counting artisans: ", (error as any).message);
    throw new ZSAError("ERROR", (error as any).message);
  }
});

/**
 * Count the number of init projects in the database
 */
export const countInitProjectsAction = createServerAction().handler(
  async () => {
    try {
      const auth = await checkUserSession();

      const response = await fetch(
        `${process.env.API_URL}/count/initiate-projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new ZSAError("ERROR", jsonResponse.error);
      }

      return jsonResponse as { count: number };
    } catch (error) {
      console.error(
        "Error while counting init projects: ",
        (error as any).message
      );
      throw new ZSAError("ERROR", (error as any).message);
    }
  }
);

/**
 * Count the number of completed projects in the database
 */
export const countCompletedProjectsAction = createServerAction().handler(
  async () => {
    try {
      const auth = await checkUserSession();

      const response = await fetch(
        `${process.env.API_URL}/count/completed-projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new ZSAError("ERROR", jsonResponse.error);
      }

      return jsonResponse as { count: number };
    } catch (error) {
      console.error(
        "Error while counting completed projects: ",
        (error as any).message
      );
      throw new ZSAError("ERROR", (error as any).message);
    }
  }
);

export const getClientAccountsAction = createServerAction()
	.input(z.object({ accountType: z.enum([Role.ARTISAN, Role.CLIENT]) }))
	.handler<Promise<ResponseCollectionType<UserModel[]>>>(async ({ input }) => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/auth/users?role=${input.accountType}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return jsonResponse;
		} catch (error) {
			console.error('Error while counting completed projects: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	});

export const getArtisanAccountsAction = createServerAction().handler<Promise<ResponseCollectionType<ArtisanModel[]>>>(
	async () => {
		try {
			const auth = await checkUserSession();

			const response = await fetch(`${process.env.API_URL}/artisan`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth?.token}`,
				},
			});
			const jsonResponse = await response.json();

			if (!response.ok) {
				throw new ZSAError('ERROR', jsonResponse.error);
			}

			return jsonResponse;
		} catch (error) {
			console.error('Error while counting completed projects: ', (error as any).message);
			throw new ZSAError('ERROR', (error as any).message);
		}
	}
);

export const getSearchedArtisanAction = createServerAction()
  .input(
    z.object({
      limit: z.number(),
      distance: z.number(),
      city: z.string(),
      profession: z.string(),
      lat: z.number(),
      long: z.number(),
      rating: z.number(),
      rayon: z.number(),
    })
  )
  .handler<Promise<ArtisanModel[]>>(async ({input}) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/artisan/search/${input.city}/${input.profession}?lat=${input.lat}&long=${input.long}&n=${input.rating}&r=${input.rayon}&page=1&limit=${input.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new ZSAError("ERROR", jsonResponse.error);
      }
      return jsonResponse;
    } catch (error) {
      console.error("Error while getting searched artisans");
      throw new ZSAError("ERROR", (error as any).message);
    }
  });

