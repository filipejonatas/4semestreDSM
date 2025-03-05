import axios from "axios";

export async function getMoedas() {
    const response = await axios.get("https://api.dadosdemercado.com.br/v1/currencies")
    return response.data;
}



