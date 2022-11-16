import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FormatDate from '../../utils/FormDate';

interface Url {
  id: string;
  redirectLink: string;
  userId: string;
  createdAt: string;
}

export default function Url() {
  const { token } = useAuth();
  const fetchUrls = (): Promise<Url[]> =>
    axios
      .get('https://localhost:7128/short', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.data);

  const { data, isLoading, isError } = useQuery({ queryKey: ['urls'], queryFn: fetchUrls });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar lista de urls</div>;
  }

  console.log(data);

  return (
    <div className="mt-8">
      <div className='flex flex-wrap gap-4 mb-4'>
        {data.map((url) => (
          <div key={url.id} className="bg-white border-[1px] p-4 mx-auto border-gray-200 w-[240px] rounded-md flex flex-col justify-between gap-2">
            <div className="text-center">
              <h3 className="font-semibold">ID</h3>
              <p className="text-center">{url.id}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold">URL</h3>
              <p className="text-center">localhost/go/{url.id}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold uppercase">Redireciona para</h3>
              <p className="text-center overflow-x-auto">{url.redirectLink}</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold uppercase">Criado em</h3>
              <p className="text-center">{FormatDate(url.createdAt)}</p>
            </div>
            <div>
              <Link to={'/'} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <p className="text-center">Acessos</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
