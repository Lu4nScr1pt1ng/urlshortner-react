import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

yup.setLocale({
  string: {
    url: `Precisa ser uma url valida com https ou http (Exemplo: https://github.com/)`,
  },
});

interface IFormInputs {
  redirectlink: string;
}

const schema = yup
  .object({
    redirectlink: yup.string().url().required('Campo obrigatório'),
  })
  .required();

export default function CreateLink() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: IFormInputs) {
    setIsLoading(true);
    try {
      axios
        .post(
          'https://localhost:7128/short',
          {
            redirectlink: data.redirectlink,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((res) => {
          setMessage(`Url criada com successo com o id: ${res.data.id}\nUrl: ${window.location.href.replace('/dashboard', '') + "/go/" + res.data.id}
          `)
        });
      setIsLoading(false);
      reset();
    } catch (e) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-[540px]">
        <div className="pt-[100px] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-semibold lg:text-[40px]">Criar um novo link</h3>
            <p className="text-subtext text-sm lg:text-[14px]">Insira o link pra qual você deseja redirecionar</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-4">
            <label htmlFor="confirmpassword">Vai redirecionar para</label>
            <input {...register('redirectlink')} type="text" className="rounded-[6px] border-[1px] py-1 px-2" />
            <p className="text-red-600 text-sm">{errors.redirectlink?.message}</p>
            {isLoading ? <div className="text-center">Carregando...</div> : ''}
            <pre className="text-md text-center">{message ? message : ''}</pre>
            <button className="bg-accent font-semibold text-white py-2 rounded-[6px]">Criar link</button>
          </form>
        </div>
      </div>
    </>
  );
}
