import * as actionTypes from "./types" 

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const setCurrentChannel = (channels) => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channels
        }
    }
}

export const ClearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
    }
}