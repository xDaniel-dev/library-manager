export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "manager" | "employee";
}
export interface IBook {
    id?: number;
    title: string;
    isbn: number;
    author: string;
    publisher: string;
    category: string;
    year: number;
    language: string;
    description: string;
}
