"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Box,
    Chip,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";


import FilterSection from "../components/productsComponent/FilterSection";
import ProductsSection from "../components/productsComponent/ProductsSection";


export default function LayoutProdotti() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)


    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((data) => {
                setProducts(data.products);
                setFilteredProducts(data.products);
            })
            .catch((error) => console.error("Errore nel recupero del prodotti:", error));
    }, []);

    console.log("Prodotti", products);

    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category) {
            setFilteredProducts(products.filter((product) => product.category === category));
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <Box sx={{ textAlign: "center", mt: 5, width: 'auto' }}>
            <Typography variant="h3" gutterBottom>
                Lista Prodotti
            </Typography>
            <Grid container spacing={2} xs={12}>
                <Grid item xs={2}>
                    <FilterSection 
                        selectedCategory={selectedCategory} 
                        handleFilter={handleFilter} 
                    />
                </Grid>
                <Grid item xs={10}>
                    <ProductsSection 
                        filteredProducts={filteredProducts}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}