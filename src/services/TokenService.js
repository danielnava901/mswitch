
class TokenService {
    constructor() {

    }

    getToken() {
        return sessionStorage.getItem('token');
    }
}

export default TokenService;