import {BASE_URL} from "@/constants/index.js";
import axios from 'axios';

export const getNotice = (data) => {
    return axios.get(BASE_URL+'/slab-match/notice',data)
}

export const getUserInfo = (data) => {
    return axios.get(BASE_URL+'/slab-match/user-info',data)
}

export const getGameInfo = (data) => {
    return axios.get(BASE_URL+'/slab-match/game-info',data)
}

export const getExerciseInfo = (data) => {
    return axios.get(BASE_URL+'/slab-match/exercise-info',data)
}

