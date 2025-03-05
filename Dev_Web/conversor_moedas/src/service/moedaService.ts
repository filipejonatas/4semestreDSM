import axios from "axios";

export async function getMoedas() {
    const response = await axios.get("https://cdn.moeda.info/api/latest.json")
    return response.data;
}



