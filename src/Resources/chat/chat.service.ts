// services/chatService.ts
import { Chat } from '../../models/chat';
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const db = client.db();  
const chatCollection = db.collection('chats');

export const addChat = async (gigId: string, chat: Chat, username: string) => {
    try {
        chat._id = new ObjectId().toString();  
        chat.gigId = gigId; 
        chat.username = username;
        chat.createdAt = new Date(); 
        const result = await chatCollection.insertOne(chat as any);  // Use type assertion to bypass type check
        return result;
    } catch (error) {
        throw new Error(`Unable to add chat: ${error.message}`);
    }
};

export const getChatsByGigId = async (gigId: string): Promise<Chat[]> => {
    try {
        const chats = await chatCollection.find({ gigId }).toArray();
        if (chats.length === 0) {
            console.log(`No chats found for gigId: ${gigId}`);
        }
        return chats.map(chat => ({
            _id: chat._id.toString(),
            gigId: chat.gigId,
            username: chat.username,
            message: chat.message,
            createdAt: chat.createdAt
        }));
    } catch (error) {
        console.error(`Error fetching chats for gigId ${gigId}:`, error);
        throw new Error(`Unable to fetch chats for gigId ${gigId}: ${error.message}`);
    }
};
