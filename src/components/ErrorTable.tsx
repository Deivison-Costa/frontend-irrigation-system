"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface ErrorItem {
  id: number;
  message: string;
  timestamp: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ErrorTable: React.FC = () => {
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const fetchErrors = async () => {
    try {
      const response = await axios.get<ErrorItem[]>(`${backendUrl}/errors`);
      setErrors(response.data);
    } catch (error) {
      console.error("Erro ao buscar erros:", error);
    }
  };

  useEffect(() => {
    fetchErrors();
    const interval = setInterval(fetchErrors, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Erros</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Mensagem</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {errors.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">Nenhum erro encontrado.</td>
            </tr>
          ) : (
            errors.map((error, index) => (
              <tr key={error.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">{error.message}</td>
                <td className="py-2 px-4 border-b">{new Date(error.timestamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorTable;
