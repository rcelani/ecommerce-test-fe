"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Container, Typography } from "@mui/material";

async function fetchProductById(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
        return null;
    }
}

export default function DettaglioProdotti({ params }) {

    const router = useRouter();
    const { id } = use(params);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            const productData = await fetchProductById(id);
            setProduct(productData);
        };

        loadProduct();
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