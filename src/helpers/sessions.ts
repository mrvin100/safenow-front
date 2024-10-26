import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { UserModel } from './models/user.model';

export type StoredCookieType = {
	user: UserModel;
	token: string;
	expiresAt: number;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const sessionKey = 'mappeos_session_key';

export async function encrypt(payload: StoredCookieType) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey);
}

export async function decrypt(session: string) {
	try {
		const { payload } = await jwtVerify<StoredCookieType>(session, encodedKey, {
			algorithms: ['HS256'],
		});

		const isExpired = payload.expiresAt < Date.now();

		if (isExpired) {
			return null;
		}

		return payload;
	} catch (error) {
		console.log('Failed to verify session => ', error);
		return null;
	}
}

export async function createSession(user: UserModel) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();
	const session = await encrypt({ user, token: user.token, expiresAt });

	cookies().set(sessionKey, session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
}

export async function updateSession(user: UserModel) {
	const session = await getSession();

	if (!session) {
		return;
	}

	const newSession = await encrypt({
		user: {
			...session.user,
			...user,
		},
		token: session.token,
		expiresAt: session.expiresAt,
	});

	cookies().set(sessionKey, newSession, {
		httpOnly: true,
		secure: true,
		expires: session.expiresAt,
		sameSite: 'lax',
		path: '/',
	});
}

export async function checkUserSession() {
	const session = cookies().get(sessionKey)?.value;

	if (!session) redirect('/sign-in');

	const payload = await decrypt(session);

	if (!payload) redirect('/sign-in');

	try {
		const response = await fetch(`${process.env.API_URL}/auth/check-token`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${payload.token}`,
			},
		});

		const user = await response.json();

		if (user.error) {
			deleteSession();
		}

		// Update the session
		await updateSession(user);

		const session = await getSession();

		if (!session) throw new Error('Session expired');

		return session;
	} catch (error) {
		console.error('Check user sessions function : ', error);
		 deleteSession();
			throw new Error('Session expired');
	}
}

export async function getSession() {
	const session = cookies().get(sessionKey)?.value;

	if (!session) {
		return null;
	}

	const payload = await decrypt(session);

	if (!payload) {
		return null;
	}

	return payload;
}

export function deleteSession() {
	cookies().delete(sessionKey);
}
