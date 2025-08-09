"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  producto_nombre: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  descripcion: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  precio: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  stock: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  categoria: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
  proveedor: z.string().min(2, {
    message: "El valor ingresado no es válido.",
  }),
})

export function FProducto() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      producto_nombre: "",
      descripcion:"",
      precio:"",
      stock:"",
      categoria:"",
      proveedor:"",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="producto_nombre"
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
          name="descripcion"
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
          name="precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese el precio unitario del producto:</FormLabel>
              <FormControl>
                <Input placeholder="precio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese la cantidad de producto disponible:</FormLabel>
              <FormControl>
                <Input placeholder="stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese la categoria del producto:</FormLabel>
              <FormControl>
                <Input placeholder="categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proveedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese el nombre del proveedor:</FormLabel>
              <FormControl>
                <Input placeholder="proveedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registar</Button>
      </form>
    </Form>
  )

}