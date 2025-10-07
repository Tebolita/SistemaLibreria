"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useProductos } from "@/hooks/useProductos"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  Nombre: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  Descripcion: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  Precio: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  Stock: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  IdCategoria: z.string().min(1, {
    message: "El valor ingresado no es válido.",
  }),
  IdProveedor: z.string().min(1, {
    message: "El valor ingresado no es válido.",
  }),
})

export function FProducto() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Nombre: "",
      Descripcion:"",
      Precio:"",
      Stock:"",
      IdCategoria:"",
      IdProveedor:"",
    },
  })

  // 2. Define a submit handler.
  const { CrearProducto } = useProductos()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await CrearProducto(values)
    toast.success(response?.message)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del producto:</FormLabel>
              <FormControl>
                <Input placeholder="Producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion:</FormLabel>
              <FormControl>
                <Input placeholder="descripcion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese el Precio unitario del producto:</FormLabel>
              <FormControl>
                <Input placeholder="Precio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese la cantidad de producto disponible:</FormLabel>
              <FormControl>
                <Input placeholder="Stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="IdCategoria"
          render={({ field }) => (
            <>
            <FormItem>
              <FormLabel>Seleccione la IdCategoria del producto:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la categoría del producto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Libro</SelectItem>
                  <SelectItem value="2">Miselanea</SelectItem>
                  <SelectItem value="3">Papelería</SelectItem>
                </SelectContent> 
              </Select>
              <FormMessage />
            </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="IdProveedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccione el nombre del IdProveedor del producto:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el nombre del IdProveedor del producto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">BIC</SelectItem>
                  <SelectItem value="2">Pilot</SelectItem>
                  <SelectItem value="3">SUSAETA</SelectItem>
                </SelectContent> 
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registar</Button>
      </form>
    </Form>
  )

}