import axios from "axios"
import { BASE_URL } from "../constants/url"

export const getIndicators = () => {
    axios.get(`${BASE_URL}indicadores`)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}