import HttpService from './http-service';
import { RegisterRequest, LoginRequest, User, UserResponse } from '../types';
import { AxiosResponse } from "axios";

class UserService {
    login(body: LoginRequest): Promise<User> {
        return HttpService.post<UserResponse>('/auth/login', body)
            .then((response: AxiosResponse<UserResponse>): User => {
                const { data } = response;

                return {
                    id: data._id,
                    login: data.login,
                    name: data.name,
                    token: data.token,
                    lastTestDate: data.lastTestDate,
                    allowedTests: data.allowedTests,
                    isDataSynchronized: data.isDataSynchronized
                };
            });
    }

    createUser(body: RegisterRequest): Promise<User> {
        return HttpService.post<UserResponse>('/auth/registration', body)
            .then((response: AxiosResponse<UserResponse>): User => {
                const { data } = response;

                return {
                    id: data._id,
                    login: data.login,
                    name: data.name,
                    token: data.token,
                    isDataSynchronized: data.isDataSynchronized
                };
            });
    }

    updateUser(body: User, token: string): Promise<AxiosResponse<void>> {
        return HttpService.patch<void>(`/user/update`, body, token);
    }

    deleteUser(token: string): Promise<AxiosResponse<void>> {
        return HttpService.delete<void>('/user/delete', token);
    }
}

export default new UserService();
