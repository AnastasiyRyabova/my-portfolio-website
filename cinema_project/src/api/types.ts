import type { User } from "./api";

export interface ApiError {
    message: string;
}

export interface AuthFormData {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    confirmPassword?: string;
}

export interface LoginResponse {
    token?: string;
    user?: {
        name?: string;
        surname?: string;
        email: string;
    };
    data?: {
        token?: string;
    };
}

export interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    setUser: (user: User) => void;
}

export interface Validity {
    email: boolean;
    name: boolean;
    surname: boolean;
    password: boolean;
    confirmPassword: boolean;
}