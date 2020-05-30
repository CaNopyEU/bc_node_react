import axios from "axios";

const API_URL = "http://localhost:8000/"

class AuthService {

  login(username, password) {
    let requestBody = {
      query: `
                query {
                    login(username: "${username}", password: "${password}") {
                        name
                        token
                        role
                        tokenExpiration
                    }
                }
            `
    };

    return axios
      .post(API_URL, {
        requestBody
      })
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(res.data))
        }

        return res.data
      })

  }

  logout() {
    localStorage.removeItem('token')
  }

  register(username, password, role) {
    let requestBody = {
      query: `
                    mutation {
                        createUser(userInput: {username: "${username}", password: "${password}", role: "${role}"}) {
                            id
                            username
                        }
                    }
                `
    };

    return axios.post(API_URL, {
      requestBody
    })
  }


}

export default new AuthService();