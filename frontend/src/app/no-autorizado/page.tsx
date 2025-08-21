"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export default function NoAutorizadoPage() {
    const router = useRouter();

    const regresarInicio = () => {
        router.push("/");
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9fa",
                backgroundImage:
                    "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')",
                backgroundRepeat: "repeat"
            }}
        >
            <h1 style={{ color: "#d32f2f", fontSize: "2.5rem" }}>No Autorizado</h1>
            <p style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
                No tienes permisos para acceder a esta página.
            </p>
            <Link
                href="/"
                style={{ color: "#1976d2", textDecoration: "underline" }}
                onClick={regresarInicio}
            >
                Volver al inicio
            </Link>
        </div>
    );
}