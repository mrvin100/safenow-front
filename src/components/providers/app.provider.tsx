'use client';

import QueryProviders from './query.provider';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <QueryProviders>{children}</QueryProviders>;
};
