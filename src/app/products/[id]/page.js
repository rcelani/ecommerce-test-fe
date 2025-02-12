"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Container, Typography } from "@mui/material";


export default function DettaglioProdotti({ params }) {

    const router = useRouter();
    const { id } = use(params);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Errore nel recupero del prodotto:", error));
    }, [id]);

    if (!product) {
        return (
            <Container sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
                <Typography>Caricamento...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                {product.title}
            </Typography>
            <Typography variant="h4" gutterBottom>
                Dettaglio prodotto
            </Typography>
            <Typography variant="h5" sx={{ color: "green", mt: 2 }}>
                {product.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                {product.description}
            </Typography>
        </Container>
    );
}