import React from "react"
import useAuth from "../hooks/useAuth"

export default function Dashboard(){
    const { token } = useAuth();


    return(
        <div>
            <p>Dashboard - private route</p>
            <p>{ token }</p>
        </div>
    )
}