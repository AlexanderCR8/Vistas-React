import axios from 'axios';
const baseUrl= process.env.REACT_APP_BASE_URL

export async function getProducts() {
   try{
    const response =await axios({
        url:`${baseUrl}/products`,
        method:'GET'
    })
    return response
   }catch(e){
    console.log(e)
   }
}


export async function postProducts(formData) {
    try{
     await axios({
         url:`${baseUrl}/products/${'crear'}`,
         method:'POST',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function putProducts(formData) {
    try{
     await axios({
         url:`${baseUrl}/products/${'actualizar'}`,
         method:'PUT',
         data:formData
     })
    }catch(e){
     console.log(e)
    }
 }

 export async function deleteProducts(id) {
    try{
     await axios({
         url:`${baseUrl}/products/${'eliminar'}/${id}`,
         method:'DELETE',
     })
    }catch(e){
     console.log(e)
    }
 }