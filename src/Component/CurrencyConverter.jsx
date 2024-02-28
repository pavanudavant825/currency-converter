import React from 'react'
import { useEffect, useState } from 'react';

const CurrencyConverter = () => {
     const [info, setInfo] = useState([]);
     const [amount, setamount] = useState(0);
     const [output, setOutput] = useState(0);
     const [from, setFrom] = useState("usd");
     const [to, setTo] = useState("inr");
     const [options, setOptions] = useState([]);
     
  
     useEffect(() => {
        async function fetchData() {     
                const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`;
                const response = await fetch(url);
                const data = await response.json();
                setInfo(data[from]); 
        }
        fetchData();
    }, [from]);
  
     useEffect(() => {
         setOptions(Object.keys(info));
         convert();
     }, [info])

     function convert() {
         var rate = info[to];
         setOutput(amount * rate);
     }

     function flip() {
         var temp = from;
         setFrom(to);
         setTo(temp);
     }
  return (
   <div className="container">
    <div className='heading1'>
        <h1>Currency converter</h1>
    </div>
    <div className='form'>
        <div className='form2'>
        <div className='amount'>
        <label htmlFor='amount'>Amount</label><br/>
        <input className='input-box' type="text" id='amount' name='amount'placeholder='Enter the amount' onChange={(e) => setamount(e.target.value)} required/>
        </div>

        <div className='from'>
        <label htmlFor="from">From</label><br/>
        <select className='input-box' onChange={(e)=>setFrom(e.target.value)} value={from} required>
            {options.map((op) => <option key={op} value={op}>{op}</option>)}
        </select>
        </div>

        <div className='icon'>
        <i className="fa-solid fa-arrow-right-arrow-left" onClick={() => {flip()}}></i>
        </div>

        <div className='to'>
        <label htmlFor="to">To</label><br/>
        <select className='input-box' onChange={(e)=>setTo(e.target.value)} value={to} required>
            {options.map((op) => <option key={op} value={op}>{op}</option>)}
        </select>
        </div>
        
        </div>
        <div>
            <button className="but" onClick={() => {convert()}}>Convert</button>
        </div>
    </div>
    <div className='heading2'>
        <h2>Converted Amount:</h2>
    </div>
    <div className='conversion'>
        <h3>{amount + " " + from + " = " + output.toFixed(2) + " " + to}</h3>
    </div>
    <div className='conversion2'>
        <h4>{amount + " " + from + "=" + output.toFixed(2) + " " + to}</h4>
    </div>
   </div>
  )
}

export default CurrencyConverter