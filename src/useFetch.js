import { useState,useEffect } from "react";

const useFetch=(url)=>{
    const [data, setData]= useState(null);
    const [isPending, setPending]= useState(true);
    const [error,setError]=useState(null);
 

    useEffect(()=>{
      const abortCont = new AbortController();
        fetch(url,{signal:abortCont.signal})
        .then(res=>{
          if(!res.ok)
          {
            throw Error("Could not fetch data")
          }
          return res.json();
        })
        .then(data=>{
          setError(null);
          setData(data);
          setPending(false);
        })
        .catch(error=>{
          if(error.name === "AbortError")
          {
            console.log("Fetch Aborted");
          }
          else
          {
          setError(error.message);
          setPending(false);
          }
        }
        )
   return ()=>abortCont.abort();
      },[url]);
      return {data,isPending,error}
}
export default useFetch;