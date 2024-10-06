"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

const ErrorItemSchema = z.object({
  id: z.number(),
  message: z.string(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Timestamp inválido",
  }),
});

const ErrorListSchema = z.array(ErrorItemSchema);

type ErrorItem = z.infer<typeof ErrorItemSchema>;

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ErrorTable: React.FC = () => {
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fetchErrors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/errors`);
      
      const parsedErrors = ErrorListSchema.safeParse(response.data);
      
      if (parsedErrors.success) {
        setErrors(parsedErrors.data);
        setValidationError(null);
      } else {
        console.error("Falha na validação dos erros:", parsedErrors.error);
        setValidationError("Dados de erros inválidos.");
      }
    } catch (error) {
      console.error("Erro ao buscar erros:", error);
      setValidationError("Erro ao buscar erros.");
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
      {validationError && (
        <div className="text-red-500 mb-4">{validationError}</div>
      )}
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
