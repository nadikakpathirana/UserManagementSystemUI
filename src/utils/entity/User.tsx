export class User {
    id: number | undefined;
    username: string | undefined;
    passwordHash: string | undefined;
    password: string | undefined;
    email: string | undefined;
    fname: string | undefined;
    lname: string | undefined;
    createdDate: Date | undefined;
    token: string | undefined;
    role: string = 'user';
}