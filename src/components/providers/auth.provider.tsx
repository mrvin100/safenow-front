'use client';

import { signOutAction } from '@src/actions/auth.actions';
import { Auth } from '@src/helpers/util-types';
import { createContext, ReactNode, useContext } from 'react';
import { useServerAction } from 'zsa-react';

const AuthContext = createContext<{
	auth: Auth;
	logout: () => void;
}>({
	auth: {},
	logout: () => null,
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children, auth }: { children: ReactNode; auth: Auth }) => {
	const { execute } = useServerAction(signOutAction);

	return <AuthContext.Provider value={{ auth, logout: execute }}>{children}</AuthContext.Provider>;
};
