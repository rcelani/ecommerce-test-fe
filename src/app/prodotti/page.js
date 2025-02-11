"use client";

import { Avatar, Box, Chip, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/swiperCustom.css";

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from "next/link";

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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)


    useEffect(() => {
        const loadProducts = async () => {
            const productData = await fetchProducts();
            setProducts(productData);
            setFilteredProducts(productData);
        };

        loadProducts();
    }, []);

    console.log("Prodotti", products);

    const categories = [
        { name: "groceries",    icon: <LunchDiningRoundedIcon />    },
        { name: "beauty",       icon: <AutoAwesomeRoundedIcon />    },
        { name: "furniture",    icon: <HouseRoundedIcon />          },
        { name: "fragrances",   icon: <FaceRetouchingNaturalIcon /> },
        { name: null,           icon: <CancelIcon />                }
    ];

    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category) {
            setFilteredProducts(products.filter((product) => product.category === category));
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Lista Prodotti
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 5, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <Chip
                        key={cat.name}
                        icon={cat.icon}
                        label={cat.name ? cat.name : ""}
                        variant={selectedCategory === cat.name ? "filled" : "outlined"}
                        color={selectedCategory === cat.name ? "primary" : "default"}
                        onClick={() => handleFilter(cat.name)}
                        sx={{ fontSize: "16px", p: 2 }}
                    />
                ))}

            </Box>
            <Grid container spacing={3}>
                {filteredProducts.length === 0 ? (
                    <Typography variant="h6">Caricamento prodotti...</Typography>
                ) : (
                    filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Box>
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    loop={true}
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination]}
                                    style={{ borderRadius: "10px", overflow: "hidden" }}
                                    className="custom-swiper"
                                >
                                    {product.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <Box style={{
                                                width: "100%",
                                                height: "250px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                overflow: "hidden",
                                                borderRadius: "8px"
                                            }}>
                                                <Box
                                                    component="img"
                                                    src={img}
                                                    alt={`Image ${product.title}`}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                            <Link href={`/prodotti/${product.id}`} passHref>
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {product.title}
                                </Typography>
                            </Link>
                            <Typography variant="h5" sx={{ color: "green", mt: 1 }}>
                                ${product.price}
                            </Typography>
                            <Typography variant="body2">
                                {product.availabilityStatus}
                            </Typography>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}