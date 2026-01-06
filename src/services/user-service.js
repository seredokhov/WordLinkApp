import HttpService from './http-service';

class UserService {
    login(body) {
        return HttpService.post('/auth/login', body)
            .then(response => {
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

    createUser(body) {
        return HttpService.post('/auth/registration', body)
            .then(response => {
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

    getUser(username, token) {
        return HttpService.get(`/user/${username}`, token)
            .then(response => response.data);
    }

    updateUser(body, token) {
        return HttpService.patch(`/user/update`, body, token);
    }

    deleteUser(token) {
        return HttpService.delete('/user/delete', token);
    }
}

export default new UserService();
