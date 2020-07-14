import React from "react";

export default React.createContext({
    token: null,
    userId: null,
    myId: null,
    login: (token, userId, tokenExpiration, role, myId) => {},
    logout: () => {}
});