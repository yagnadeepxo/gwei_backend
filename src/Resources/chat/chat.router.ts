// routers/chatRouter.ts
import { Router } from 'express';
import { postChat, getAllChats } from './chat.controller';
import { extractUserFromToken } from '../auth/auth.service';

const chatRouter = Router();

chatRouter.post('/api/:gigId/chat',extractUserFromToken ,postChat);
chatRouter.get('/api/:gigId/chats', getAllChats);

export default chatRouter;
