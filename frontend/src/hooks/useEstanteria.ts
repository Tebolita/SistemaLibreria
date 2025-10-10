import { EstanteriaServices } from "@/service/EstanteriaServices";
import { todo } from "node:test";


export const useEstanteria = ()=>{
   const todos = async () => {
               try {
                   const proveedores = await EstanteriaServices.todos();
                   return proveedores;
               } catch (error) {
                   console.error("Error fetching proveedores:", error);
                   return [];
               }
           };
       
           const crear = async (data: any) => {
               try {
                   const clearData = {
                       Nombre: data.Nombre,
                       Ubicacion: data.Encargado,
                       Encargado: data.Encargado,
                   };
                   console.log("Clean Data:", clearData);
                   const proveedor = await EstanteriaServices.crear(clearData);
                   return proveedor;
               } catch (error) {
                   console.error("Error creating proveedor:", error);
                   return null;
               }
           };
           const Unico = async(id:number)=>{
               try{
                   const DFUnico = await EstanteriaServices.unico(id)
                   return DFUnico;
               }catch(error){
                   console.error(error)
                   return null
               }
           }
           const Actualizar = async (id: number, data: any) => {
               try {
                   const proveedor = await EstanteriaServices.actualizar(id, data);
                   return proveedor;
               } catch (error) {
                   console.error("Error updating proveedor:", error);
                   return null;
               }
           };
   
           return{todos,Actualizar,crear,Unico}
}