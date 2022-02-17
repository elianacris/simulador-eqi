import axios from "axios"
import { BASE_URL } from "../constants/url"

export const getIndicators = () => {
    return axios.get(`${BASE_URL}indicadores`);
}