import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

yup.setLocale({
  string: {
    email: 'Insira um e-mail válido',
    min: 'Deve ser maior que ${min}',
    max: 'Deve ser menor que ${min}',
  },
});

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const schema = yup
  .object({
    name: yup.string().min(3).max(22).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(60).required(),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Senha tem que ser iguais'),
  })
  .required();

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: IFormInputs) {
    setIsLoading(true);
    try {
        axios.post("https://localhost:7128/v1/user/register", {
            name: data.name,
            email: data.email,
            password: data.password
        }).then(() => {
            navigate("/login");
        })
        setIsLoading(false);
    }
    catch(e) {
        setMessage("Ocorreu um erro ao cadastrar usuario")
        setIsLoading(false);
    }

  }

  return (
    <>
      <div className="container mx-auto max-w-[540px]">
        <div className="pt-[100px] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-semibold lg:text-[40px]">Crie uma conta</h3>
            <p className="text-subtext text-sm lg:text-[14px]">Insira os dados necesserário para efetuar o cadastro</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-4">
            <label htmlFor="name">Nome</label>
            <input {...register('name')} type="text" className="rounded-[6px] border-[1px] py-1 px-2" />
            <p className="text-red-600 text-sm">{errors.name?.message}</p>
            <label htmlFor="email">E-mail</label>
            <input {...register('email')} type="text" className="rounded-[6px] border-[1px] py-1 px-2" />
            <p className="text-red-600 text-sm">{errors.email?.message}</p>
            <label htmlFor="password">Senha</label>
            <input {...register('password')} type="password" className="rounded-[6px] border-[1px] py-1 px-2" />
            <p className="text-red-600 text-sm">{errors.password?.message}</p> 
            <label htmlFor="confirmpassword">Confirmar senha</label>
            <input {...register('confirmpassword')} type="password" className="rounded-[6px] border-[1px] py-1 px-2" />
            <p className="text-red-600 text-sm">{errors.confirmpassword?.message}</p>
            {isLoading ? <div className="text-center">Carregando...</div> : ''}
            <p className="text-sm text-center">{message ? message : ''}</p>
            <button className="bg-accent font-semibold text-white py-2 rounded-[6px]">Criar conta</button>
            <p className="text-center text-subtext text-sm mb-2">
              Já tem uma conta?{' '}
              <Link className="text-accent font-semibold" to={'/login'}>
                Entre nela aqui
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
