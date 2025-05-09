import React, { useEffect, useState } from 'react';

type Evento = {
  id: number;
  status: string;
  data_acao: string;
};

const EventosTable: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = () => {
      fetch('/evento')
        .then(res => res.json())
        .then(data => {
          setEventos(data);
          setLoading(false);
        });
    };

    fetchEventos(); // Busca inicial

    const interval = setInterval(fetchEventos, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="tabela-eventos-container">
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Detecção do Acionamento da Bomba</h2>
        <table className="tabela-eventos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status do Acionamento</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(ev => (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>
                  <span className="status-badge">
                    {ev.status === 'MOVIMENTO_DETECTADO' ? 'Movimento Detectado' : ev.status}
                  </span>
                </td>
                <td>{new Date(ev.data_acao).toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventosTable;