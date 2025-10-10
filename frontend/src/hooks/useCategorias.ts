import { categoriasServices } from "@/service/categoriasServices";
import { useState } from "react";


export function useCategoria() {
    const categoriasTodos = async () => {
        try {
            const categorias = await categoriasServices.todos()
            return categorias
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }
    const crearCategoria = async (data: any) => {
        try {
            console.log(data)
            const dataClean = {
                Nombre: data.Nombre,
                Descripcion: data.Descripcion,
                Estado: Boolean(data.Estado),
            }
            console.log(dataClean)
            const categoria = await categoriasServices.crear(dataClean)
            return categoria
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }
    const cambiarEstado = async (id: number) => {
        try {
            const categoria = await categoriasServices.cambiarEstado(id)
            return categoria
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }
    const actualizarCategoria = async (id: number, data: any) => {
        console.log(id, data)
        try {
            const dataClean = {
                Nombre: data.nombre,
                Descripcion: data.descripcion,
                Estado: Boolean(data.estado),
            }
            console.log(dataClean)
            const categoria = await categoriasServices.actualizar(id, dataClean)
            return categoria
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }

    const categoriasActivas = async () => {
        try {
            const categorias = await categoriasServices.soloActivos()
            return categorias
        } catch (error) {
            return {error: error, message: 'Hubo un error en el servidor'}
        }
    }


    return { categoriasTodos, crearCategoria, cambiarEstado, actualizarCategoria, categoriasActivas}
}