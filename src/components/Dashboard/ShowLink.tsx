import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import BackEnd from '../../services/api';
import FormatDate from '../../utils/FormDate';

interface AccessI {
  id: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  organization: string;
  browser: string;
  operatingSystem: string;
  accesedAt: string;
}

export default function ShowLink() {
  const { urlid } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchAccess = (): Promise<AccessI[]> =>
    axios
      .get(`${BackEnd}/go/e/${urlid}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.data);

  const { data, isLoading, isError } = useQuery({ queryKey: ['access'], queryFn: fetchAccess });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar lista de urls</div>;
  }


  return (
    <>
      <div className="pt-[80px] container mx-auto">
        <div className="bg-accent text-white font-semibold p-2 border-[1px] border-black">
          <ul className="flex justify-evenly">
            <li className="uppercase">
              <button onClick={() => navigate('/dashboard')}>VOLTAR PARA O DASHBOARD</button>
            </li>
          </ul>
        </div>
        {data[0] ? (
          <table className="w-full  mt-6 block lg:inline-table overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  IP
                </th>
                <th scope="col" className="py-3 px-6">
                  CIDADE
                </th>
                <th scope="col" className="py-3 px-6">
                  REGIAO
                </th>
                <th scope="col" className="py-3 px-6">
                  PAIS
                </th>
                <th scope="col" className="py-3 px-6">
                  PROVEDORA DE INTERNET
                </th>
                <th scope="col" className="py-3 px-6">
                  NAVEGADOR
                </th>
                <th scope="col" className="py-3 px-6">
                  SISTEMA OPERACIONAL
                </th>
                <th scope="col" className="py-3 px-6">
                  ACESSADO EM
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((access) => (
                <tr
                  key={access.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {access.ip}
                  </th>
                  <td className="py-4 px-6">{access.city}</td>
                  <td className="py-4 px-6">{access.region}</td>
                  <td className="py-4 px-6">{access.country}</td>
                  <td className="py-4 px-6">{access.organization}</td>
                  <td className="py-4 px-6">{access.browser}</td>
                  <td className="py-4 px-6">{access.operatingSystem}</td>
                  <td className="py-4 px-6">{FormatDate(access.accesedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='text-center mt-4'>Não existe accessos nesse link ainda</div>
        )}
      </div>
    </>
  );
}
