import React from "react";

export default React.createContext({
    token: null,
    userId: null,
    myId: null,
    mTeacher: false,
    login: (token, userId, tokenExpiration, role, myId, mTeacher) => {},
    logout: () => {}
});