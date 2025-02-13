"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    Container,
    Grid,
    Typography,
    useMediaQuery
} from "@mui/material";


import FilterSection from "../components/productsComponent/FilterSection";
import ProductsSection from "../components/productsComponent/ProductsSection";


export default function LayoutProdotti() {

    const [products,            setProducts             ] = useState([]);
    const [filteredProducts,    setFilteredProducts     ] = useState([]);
    const [selectedCategories,  setSelectedCategories   ] = useState([]);
    const [filterOpen,          setFilterOpen           ] = useState(false);
    const [priceRange,          setPriceRange           ] = useState([0, 3000]);


    const isMobile = useMediaQuery("(max-width:768px)");

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
        if (Array.isArray(category) && category.length === 0) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories((prevCategories) =>
                prevCategories.includes(category) ? 
                    prevCategories.filter((c) => c !== category) : [...prevCategories, category]
            );
        }
    };
    
    const handlePriceFilter = (range) => {
        setPriceRange(range);
        setFilteredProducts(
            products.filter(product => 
                product.price >= range[0] && product.price <= range[1] &&
                (selectedCategories.length === 0 || selectedCategories.includes(product.category))
            )
        );
    };
    

    useEffect(() => {
        setFilteredProducts(
            products.filter(product => 
                (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
                product.price >= priceRange[0] && 
                product.price <= priceRange[1]
            )
        );
    }, [selectedCategories, priceRange, products]);

    return (
        <Box sx={{ textAlign: "center", mt: 5, width: 'auto' }}>
            <Typography variant="h3" gutterBottom>
                Lista Prodotti
            </Typography>

            {isMobile && (
                <Box sx={{ mt: 5, px: 4}}>
                    <Button 
                        variant="contained" 
                        onClick={() => setFilterOpen(!filterOpen)} 
                        sx={{ width: "100%", mb: 2 }}
                    >
                        {filterOpen ? "Nascondi Filtri" : "Mostra Filtri"}
                    </Button>
                </Box>
            )}

            <Grid container spacing={2} xs={12} sx={{ width: '100%', margin: 'auto'}}>
                {!isMobile && (
                    <Grid item xs={12} md={3}>
                        <Box sx={{ 
                            position: "sticky", 
                            top: 20,
                            height: "fit-content"
                        }}>
                            <FilterSection 
                                selectedCategories={selectedCategories} 
                                handleFilter={handleFilter}
                                handlePriceFilter={handlePriceFilter}
                                setFilteredProducts={setFilteredProducts}
                            />
                        </Box>
                    </Grid>
                )}
                {isMobile && (
                    <Grid item xs={12}>
                        <Collapse in={filterOpen}>
                            <FilterSection 
                                selectedCategories={selectedCategories} 
                                handleFilter={handleFilter}
                                handlePriceFilter={handlePriceFilter}
                                setFilteredProducts={setFilteredProducts} 
                            />
                        </Collapse>
                    </Grid>
                )}
                <Grid item xs={12} md={9}>
                    <ProductsSection 
                        filteredProducts={filteredProducts}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}