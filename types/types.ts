export interface ProfileData {
    name: string;
    age: number;
    occupation: string;
    hobbies: string;
}

export type Message = {
    id: string;
    text: string;
    sender: 'me' | 'alex';
};