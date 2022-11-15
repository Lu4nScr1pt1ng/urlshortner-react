import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function Login(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            setMessage("");
            await login(email, password);
            setIsLoading(false);
            navigate("/dashboard");
        } catch(err) {
            setIsLoading(false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(err?.response.status === 404){
                setMessage("Usuario ou senha incorreto!");
                return;
            }
            setMessage("Ocorreu um erro ao efetuar login");
        }

    }
    
    return(
        <>
            <div>Formulário para login</div>
            <form className="flex flex-col w-[240px] items-center m-auto gap-3" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input className="border-sky-700 border-[1px]" type="text" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <label htmlFor="senha">Senha:</label>
                <input className="border-sky-700 border-[1px]" type="password" id="senha" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <button className="bg-slate-700 text-white p-4">Fazer login</button>
                { isLoading ? <div>Carregando</div> : "" }
                { message ? <div>{ message }</div> : ""}
            </form>
        </>
    )
}