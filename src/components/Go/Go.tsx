import axios from "axios";
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import Bowser from "bowser";
import BackEnd from "../../services/api";

export default function Go(){
    const { urlid } = useParams();

    const browser = Bowser.getParser(window.navigator.userAgent);

    useEffect(() => {
        axios.get("https://ipapi.co/json/").then(res => {
            axios.post(`${BackEnd}/go/${urlid}`, {
                ip: res.data.ip,
                city: res.data.city,
                region: res.data.region,
                country: res.data.country_name,
                organization: res.data.org,
                browser: browser.getBrowserName(),
                OperatingSystem: `${browser.getOSName()} ${browser.getOSVersion()}`
            }).then(res => {
                const url = res.data.redirectlink
                window.location.replace(url);
                return null
            }).catch(e => {
                console.log(e)
            })
        })
    }, [])

    return(
        <>
        </>
    )
}