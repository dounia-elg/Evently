export interface Event {
    id: string;
    title: string;
    description: string;
    dateTime: string;
    location: string;
    maxCapacity: number;
    status: 'DRAFT' | 'PUBLISHED' | 'CANCELED';
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'PARTICIPANT';
}
