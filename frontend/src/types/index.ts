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

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData: { user: User; access_token: string }) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface Reservation {
    id: string;
    status: 'PENDING' | 'CONFIRMED' | 'REFUSED' | 'CANCELED';
    createdAt: string;
    participant: User;
    event: Event;
}
