import { Request, Response } from 'express';
import { profileService } from './profile.service';
import { Profile } from '../../models/profile';

export class ProfileController {
    async createProfile(req: Request, res: Response) {
        try {
            const profileData: Omit<Profile, '_id'> = req.body;
            const {username, } = (req as any).user;
            const newProfile = await profileService.createProfile(profileData, username);
            res.status(201).json(newProfile);
        } catch (error) {
            res.status(500).json({ message: 'Error creating profile', error });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const profile = await profileService.getProfileByUsername(username);
            if (profile) {
                res.json(profile);
            } else {
                res.status(404).json({ message: 'Profile not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error });
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            
            const profileData: Partial<Profile> = req.body;
            const {username, } = (req as any).user
            const updatedProfile = await profileService.updateProfileByUsername(username, profileData);
            if (updatedProfile) {
                res.json(updatedProfile);
            } else {
                res.status(404).json({ message: 'Profile not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error });
        }
    }
}

export const profileController = new ProfileController();
