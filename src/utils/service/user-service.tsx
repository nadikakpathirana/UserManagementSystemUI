import { User } from "../entity/User";
import axios, { AxiosResponse } from 'axios';
import Cookies from "universal-cookie";

export class UserService {
    static apiEndpoint: string = 'http://localhost:5223/api';

    static login = (username: string, passwordHashed: string): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/auth/login`, {username: username, password: passwordHashed});

    static createUser = (user: User | undefined): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/auth/register`, user);

    static updateUser = (id: number | undefined, user: User): Promise<AxiosResponse<User, any>> => axios.put<User>(`${this.apiEndpoint}/users/id:int?id=${id}`, user, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });

    static deleteUser = (id: number | undefined): Promise<AxiosResponse<any, any>> => axios.delete<User>(`${this.apiEndpoint}/users/id:int?id=${id}`, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });

    static getUsers = (): Promise<AxiosResponse<User[], any>> => axios.get<User[]>(`${this.apiEndpoint}/users`, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });

    static getUser = (): Promise<AxiosResponse<User, any>> => axios.get<User>(`${this.apiEndpoint}/users/${new Cookies().get('id')}`, {
        headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
        },
    });



}