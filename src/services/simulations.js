import axios from "axios"
import { BASE_URL } from "../constants/url"

export const getSimulator = (tipoIndexacao, tipoRendimento) => {
    return axios.get(`${BASE_URL}simulacoes/?tipoIndexacao=${tipoIndexacao}&tipoRendimento=${tipoRendimento}`);
}