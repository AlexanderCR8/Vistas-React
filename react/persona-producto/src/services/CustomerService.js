import axios from 'axios';
const baseUrl= process.env.REACT_APP_BASE_URL

export async function getCustomers() {
   try{
    const response =await axios({
        url:`${baseUrl}/customers`,
        method:'GET'
    })
    return response
   }catch(e){
    console.log(e)
   }
}


export async function postCustomers(formData) {
    try{
     await axios({
         url:`${baseUrl}/customers/${'crear'}`,
         method:'POST',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function putCustomers(formData) {
    try{
     await axios({
         url:`${baseUrl}/customers/${'actualizar'}`,
         method:'PUT',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function deleteCustomers(id) {
    try{
     await axios({
         url:`${baseUrl}/customers/${'eliminar'}/${id}`,
         method:'DELETE',
     })
    }catch(e){
     console.log(e)
    }
 }