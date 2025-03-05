import { useEffect, useState, useCallback } from "react";
import { getMoedas } from "../service/moedaService";

interface MoedaResponse {
    base: string;
    rates: {
        [key: string]: number;
    };
}

export default function ConversorMoedas() {
    const [qtd1, setQtd1] = useState<string>('1');
    const [moeda1, setMoeda1] = useState<string>('USD');
    const [qtd2, setQtd2] = useState<string>('0');
    const [moeda2, setMoeda2] = useState<string>('BRL');
    const [taxas, setTaxas] = useState<{[key: string]: number}>({});
    const [moedas, setMoedas] = useState<string[]>([]);

    // Buscar taxas de conversão da API
    useEffect(() => {
        getMoedas()
            .then((data: MoedaResponse) => {
                // Adicionar a moeda base nas taxas (com valor 1)
                const todasTaxas = { 
                    ...data.rates,
                    [data.base]: 1
                };
                setTaxas(todasTaxas);
                setMoedas([data.base, ...Object.keys(data.rates)]);
            })
            .catch(err => console.error(err));
    }, []);

    // Converter da moeda 1 para moeda 2
    const converterMoeda = useCallback(() => {
        if (Object.keys(taxas).length === 0) return;

        const valor = parseFloat(qtd1);
        if (isNaN(valor) || valor < 0) {
            setQtd2('0');
            return;
        }

        const taxa1 = taxas[moeda1];
        const taxa2 = taxas[moeda2];

        if (!taxa1 || !taxa2) {
            setQtd2('0');
            return;
        }

        const resultado = valor * (taxa2 / taxa1);
        setQtd2(resultado.toFixed(2));
    }, [qtd1, moeda1, moeda2, taxas]);

    useEffect(() => {
        converterMoeda();
    }, [converterMoeda, moeda1, moeda2]);

   
    const msgConversao = () => {
        if (Object.keys(taxas).length === 0) return '';

        const taxa1 = taxas[moeda1];
        const taxa2 = taxas[moeda2];

        if (!taxa1 || !taxa2) return '';

        const razaoEntreMoedas = taxa2 / taxa1;
        return `1 ${moeda1} = ${razaoEntreMoedas.toFixed(4)} ${moeda2}`;
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
                        min="0"
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
                    {moedas.map((moeda) => (
                        <option key={`from-${moeda}`} value={moeda}>
                            {moeda}
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
                    min="0"
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
                    {moedas.map((moeda) => (
                        <option key={`to-${moeda}`} value={moeda}>
                            {moeda}
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