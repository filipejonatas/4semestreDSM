import { useEffect, useState, useCallback } from "react";
import { getMoedas } from "../service/moedaService";

interface TxConversao {
    [key: string]: number;
}

export default function ConversorMoedas() {
    const [qtd1, setQtd1] = useState<string>('1');
    const [moeda1, setMoeda1] = useState<string>('USD');
    const [qtd2, setQtd2] = useState<string>('0');
    const [moeda2, setMoeda2] = useState<string>('BRL');
    const [taxaConversao, setTaxaConversao] = useState<TxConversao>({});

    useEffect(() => {
        getMoedas()
            .then((data) => setTaxaConversao(data))
            .catch(err => console.error(err));
    }, []);

    const converterMoeda = useCallback(() => {
        const razao1 = taxaConversao[moeda1];
        const razao2 = taxaConversao[moeda2];

        if (!qtd1 || isNaN(Number(qtd1)) || !razao1 || !razao2) {
            setQtd2('0');
            return;
        }

        const resultado = (Number(qtd1) * razao2) / razao1;
        setQtd2(resultado.toFixed(2));
    }, [qtd1, moeda1, moeda2, taxaConversao]);

    const converterReverso = () => {
        const razao1 = taxaConversao[moeda1];
        const razao2 = taxaConversao[moeda2];

        if (!qtd2 || isNaN(Number(qtd2)) || !razao1 || !razao2) {
            setQtd1('0');
            return;
        }

        const resultado = (Number(qtd2) * razao1) / razao2;
        setQtd1(resultado.toFixed(2));
    };

    useEffect(() => {
        converterMoeda();
    }, [converterMoeda]);

    const msgConversao = () => {
        const razao1 = taxaConversao[moeda1];
        const razao2 = taxaConversao[moeda2];

        if (!razao1 || !razao2) return '';

        const razaoEntreMoedas = razao2 / razao1;
        return `1 ${moeda1} = ${razaoEntreMoedas.toFixed(2)} ${moeda2}`;
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="text-center text-xl font-semibold">Conversor de moedas</div>
            <div className="space-y-6 mt-4">
                <div>
                    <label htmlFor="quantidade1" className="block text-sm font-medium text-gray-700">
                        Quantidade 1
                    </label>
                    <input
                        id="quantidade1"
                        type="number"
                        value={qtd1}
                        onChange={(e) => setQtd1(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="moeda1" className="block text-sm font-medium text-gray-700">
                    Moeda 1
                </label>
                <select
                    id="moeda1"
                    value={moeda1}
                    onChange={(e) => setMoeda1(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                >
                    {Object.keys(taxaConversao).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="quantidade2" className="block text-sm font-medium text-gray-700">
                    Quantidade 2
                </label>
                <input
                    id="quantidade2"
                    type="number"
                    value={qtd2}
                    onChange={(e) => setQtd2(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="moeda2" className="block text-sm font-medium text-gray-700">
                    Moeda 2
                </label>
                <select
                    id="moeda2"
                    value={moeda2}
                    onChange={(e) => setMoeda2(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                >
                    {Object.keys(taxaConversao).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-center text-sm text-gray-500 mt-4">
                {msgConversao()}
            </div>
        </div>
    );
}
