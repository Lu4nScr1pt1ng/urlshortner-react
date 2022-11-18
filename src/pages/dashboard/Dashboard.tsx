import React, { useState } from "react"
import CreateLink from "../../components/Dashboard/CreateLink";
import Links from "../../components/Dashboard/Links";

export default function Dashboard(){
    const [dashpage, setDashpage] = useState<boolean>(true);


    return(
        <div className="pt-[80px] container mx-auto">
            <div className="bg-accent text-white font-semibold p-2 border-[1px] border-black">
                <ul className="flex justify-evenly">
                <li className="uppercase"><button className={dashpage ? "underline underline-offset-4" : ""} onClick={() => setDashpage(true)}>URLS</button></li>
                <li className="uppercase"><button className={dashpage ? "" : "underline underline-offset-4"}  onClick={() => setDashpage(false)}>Criar nova URL</button></li>
                </ul>
            </div>
            <div>
                { dashpage ? <Links /> : <CreateLink /> }
            </div>
        </div>
    )
}