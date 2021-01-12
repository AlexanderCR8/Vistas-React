import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Select from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'mandarina', label: 'mandarina' }
  ]
  const url= "http://localhost:8084/customers"

  export default function  Inicio()  {
    const [selectOptions, setSelectOptions]=useState([])
    const [customers, setCustomers]= useState([])
    const [froma, setForma]=useState([{
        id:'',
        name:'',
        surname:''
    }])
    
    const PeticionGetCustomers=async()=>{
        const res = await axios.get(url)
        const data = res.data

        const options = data.map(d => ({
            "value" : d.id,
            "label" : d.surname

    }))
    setSelectOptions(options)
   
    }
    const handleChange= async e=>{
        setForma({id:e.value, surname:e.label})
     
       
       }
    useEffect(()=>{
        //console.log("useeffect")
        PeticionGetCustomers();
     },[])

    
        return (
            <div>
                <h1>Inicio</h1>
                <Select options={selectOptions} name="customers" onChange={handleChange} />
                <p>You have selected <strong>{froma.surname}</strong> whose id is <strong>{froma.id}</strong></p>
      </div>
            
        )
    
}
