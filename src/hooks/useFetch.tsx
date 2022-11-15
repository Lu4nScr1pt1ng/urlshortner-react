import { useEffect, useState } from "react";
 

const useFetch = (url: string, reqdata: object) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
 
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        seterror(data.error)
        setdata(data.status)
        setloading(false)
    })
  }, [url, reqdata]);
 
  return { data, loading, error };
};
 
export default useFetch;