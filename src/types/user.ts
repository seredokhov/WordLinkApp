type UserBase = {
    login: string;
    name: string;
    token: string;
    lastTestDate?: string;
    allowedTests?: number;
    isDataSynchronized: boolean;
};

export type User = UserBase & {
    id: string;
};

export type LoginRequest = {
    login: string;
    password: string;
};

export type RegisterRequest = LoginRequest & {
    name: string;
    isDataSynchronized: boolean;
};

export type UserResponse = UserBase & {
    _id: string;
};


