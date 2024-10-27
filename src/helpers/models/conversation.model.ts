export type ConversationModel = {
	id: string;
	users: string[];
	lastMessage: string;
};

export type MessageModel = {
	id: string;
	conversationId: string;
	text?: string;
	fileId?: string;
	sender: string;
};
