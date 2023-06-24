import { User } from "../entity/User";
import axios, { AxiosResponse } from 'axios';

export class UserService {

    static apiEndpoint: string = 'http://192.168.43.78:5223/api';

    static login = (username: string, passwordHashed: string): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/auth/login`, {username: username, password: passwordHashed});
    
    static createUser = (user: User): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/auth/register`, user);
}