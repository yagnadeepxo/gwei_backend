// controllers/chatController.ts
import { Request, Response } from 'express';
import { addChat, getChatsByGigId } from './chat.service';

export const postChat = async (req: Request, res: Response) => {
    const { gigId } = req.params;
    const {username} = (req as any).user;
    const chat = req.body;

    try {
        const result = await addChat(gigId, chat, username);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllChats = async (req: Request, res: Response) => {
    const { gigId } = req.params;

    try {
        const chats = await getChatsByGigId(gigId);
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
