import axios from 'axios';
const baseUrl= process.env.REACT_APP_BASE_URL

export async function getOrders() {
   try{
    const response =await axios({
        url:`${baseUrl}/orders`,
        method:'GET'
    })
    return response
   }catch(e){
    console.log(e)
   }
}


export async function postOrders(formData) {
    try{
     await axios({
         url:`${baseUrl}/orders/${'crear'}`,
         method:'POST',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function putOrders(formData) {
    try{
     await axios({
         url:`${baseUrl}/orders/${'actualizar'}`,
         method:'PUT',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function deleteOrders(id) {
    try{
     await axios({
         url:`${baseUrl}/orders/${'eliminar'}/${id}`,
         method:'DELETE',
     })
    }catch(e){
     console.log(e)
    }
 }