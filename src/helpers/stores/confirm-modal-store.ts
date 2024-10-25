import { create } from 'zustand';

export type ConfirmState = {
	isVisible: boolean;
	message?: string;
	onConfirm?: () => void;
	onDenied?: () => void;
};

export type ConfirmActions = {
	closeModal: () => void;
	resetModal: () => void;
};

export type ConfirmStore = ConfirmState & ConfirmActions;

export const defaultStore: ConfirmState = {
	isVisible: false,
};

export const useConfirmModalStore = create<ConfirmStore>((set) => ({
	...defaultStore,
	closeModal: () => set(() => ({ isVisible: false })),
	resetModal: () => set(() => ({ isVisible: false, message: undefined, onConfirm: undefined, onDenied: undefined })),
}));

export const openConfirmModal = (message?: string, onConfirm?: () => void, onDenied?: () => void) =>
	useConfirmModalStore.setState({ isVisible: true, message, onConfirm, onDenied });
