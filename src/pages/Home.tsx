import React from 'react';
import { Link } from 'react-router-dom';
import { FaCut, FaIdCard, FaMoneyBillAlt } from 'react-icons/fa';

import world from '../assets/world.svg';

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row lg:h-[80%] w-[100%] pt-[80px] items-center gap-4 md:gap-0">
        <div className="md:w-[60%]  order-2 md:order-1">
          <div className="text-center md:text-start">
            <h1 className="font-semibold md:text-[38px] lg:text-[72px] leading-[125%]">
              Ajudamos você a encurtar sua url.
            </h1>
            <p className="md:text-[22px] text-subtext leading-[150%] md:w-[32ch]">
              Esta procurando por um encurtador de url que informa quem acessou sua url!? Está aqui a solução.
            </p>
          </div>
          <Link className="w-[100%] flex justify-center md:block" to={'/dashboard'}>
            <button className="bg-accent mt-6 text-white py-4 px-8 rounded-[40px] font-semibold md:text-[18px] hover:bg-accent-hover">
              Dashboard
            </button>
          </Link>
        </div>
        <div className="md:w-[40%] order-1 md:order-2">
          <img className="w-[411px] md:w-[543px] md:h-[389px]" src={world} alt="" />
        </div>
      </div>
      <div className="bg-white flex flex-col w-[100%] rounded-[6px] h-[90%] mb-6 gap-4 mt-6 p-4 lg:h-[20%] lg:flex-row justify-around text-center shadow-2xl items-center">
        <div>
          <div className='flex justify-center'>
            <FaCut className="" size={48} />
          </div>
          <h3 className="font-semibold text-[24px]">Encurtador</h3>
          <p className="text-subtext w-[25ch]">Deixamos a url que você quiser menor.</p>
        </div>
        <div>
        <div className='flex justify-center'>
            <FaIdCard className="" size={48} />
          </div>
          <h3 className="font-semibold text-[24px]">IP Logger</h3>
          <p className="text-subtext w-[25ch]">Capturamos os dados de quem acessa a sua url.</p>
        </div>
        <div>
        <div className='flex justify-center'>
            <FaMoneyBillAlt className="" size={48} />
          </div>
          <h3 className="font-semibold text-[24px]">Gratuito</h3>
          <p className="text-subtext w-[25ch]">Todo serviço aqui é 100% gratuito.</p>
        </div>
      </div>
    </div>
  );
}
