import axios from "axios"
import { BASE_URL } from "../constants/url"

export const getSimulator = () => {
    axios.get(`${BASE_URL}simulacoes`)
        .then((response) => {
            console.log(response)
    })
        .catch((error) => {
            console.log(error)

        })
}