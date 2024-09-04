export interface Business {
    _id?: string;
    name: string;
    password: string;
    email: string;
    profile?: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Business {
    constructor(businessData: any) {
        this.name = businessData.name;
        this.password = businessData.password;
        this.email = businessData.email;
        this.profile = businessData.profile;
    }
}