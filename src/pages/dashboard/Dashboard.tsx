import React from "react"
import useAuth from "../../hooks/useAuth"

export default function Dashboard(){
    const { token } = useAuth();


    return(
        <div className="pt-[80px] container mx-auto">

            <p>Dashboard - private route</p>
        </div>
    )
}