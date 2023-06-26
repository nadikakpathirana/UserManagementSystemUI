export class User {
    id: number | undefined;
    username: string | undefined;
    fName: string | undefined;
    lName: string | undefined;
    email: string | undefined;
    role: string = 'User';
    passwordHash: string | undefined;
    password: string | undefined = '';
    createdDate: Date | undefined;
    token: string | undefined;
}