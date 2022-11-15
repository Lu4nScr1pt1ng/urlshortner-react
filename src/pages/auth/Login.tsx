import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';

interface IFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });

  async function onSubmit(data: IFormInputs) {
    setIsLoading(true);
    try {
      setMessage('');
      await login(data.email, data.password);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (err?.response.status === 404) {
        setMessage('Usuario ou senha incorreto!');
        return;
      }
      setMessage('Ocorreu um erro ao efetuar login');
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-[540px]">
        <div className="pt-[100px] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-semibold lg:text-[40px]">Bem-vindo de volta</h3>
            <p className="text-subtext text-sm lg:text-[14px]">Coloque seu e-mail e sua senha para efetuar login</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-4">
            <label htmlFor="email">E-mail</label>
            <input
              {...register('email', {
                required: 'Inserir e-mail',
              })}
              type="text"
              className="rounded-[6px] border-[1px] py-1 px-2"
            />
            <p className='text-red-600 text-sm'>{errors.email?.message}</p>
            <label htmlFor="password">Senha</label>
            <input
              {...register('password', {
                required: 'Inserir senha',
              })}
              type="password"
              className="rounded-[6px] border-[1px] py-1 px-2"
            />
            {isLoading ? <div className='text-center'>Carregando...</div> : ''}
            {message ? <div className='text-center text-red-600'>{message}</div> : ''}
            <p className='text-red-600 text-sm'>{errors.password?.message}</p>
            <button className="bg-accent font-semibold text-white py-2 rounded-[6px]">Entrar na sua conta</button>
            <p className="text-center text-subtext text-sm">
              Não tem uma conta?{" "}
              <Link className="text-accent font-semibold" to={'/register'}>
                Criar uma aqui
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
