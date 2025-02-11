"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Errore nel recupero prodotti:', error);
        return [];
    }
}

export default function Prodotti() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productData = await fetchProducts();
            setProducts(productData);
        };

        loadProducts();
    }, []);

    console.log("Prodotti", products)

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Lista Prodotti
            </Typography>
            <Grid container spacing={3}>
                {products.length === 0 ? (
                    <Typography variant="h6">Caricamento prodotti...</Typography>
                ) : (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                {product.title}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "green", mt: 1 }}>
                                ${product.price}
                            </Typography>
                            <Typography variant="body2">{product.availabilityStatus}</Typography>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}