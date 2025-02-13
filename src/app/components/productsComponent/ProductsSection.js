import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiperCustom.css";
import { useCart } from "@/app/context/ChartContext";

export default function ProductsSection({ filteredProducts }) {

    const { addToCart, removeFromChart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const getAvailabilityColor = (avaibility) => {
        switch (avaibility) {
            case "In Stock":
                return "green";
            case "Low Stock":
                return "orange";
            case "Not Available":
                return "red";
            default:
                return "black";
        }
    }

    return (
        <Grid container spacing={5}>
            {filteredProducts.length === 0 ? (
                <Container sx={{ textAlign: "center", mt: 5, zIndex: 9999 }}>
                    <CircularProgress />
                    <Typography sx={{ font: 'bold', fontSize: 30, mt: 1 }}>Caricamento prodotti...</Typography>
                </Container>
            ) : (
                /* 
                    - Implementare la visualizzazione in delle card molto semplici e cliccabili
                    - aggiungere button "Aggiungi al carrello" + funzionalità
                */
                filteredProducts.map((product) => (
                    <Grid
                        item
                        key={product.id}
                        xs={12} sm={6} md={6} lg={4}
                        sx={{ padding: 2 }}
                    >
                        <Box
                            sx={{
                                border: "1px solid black",
                                borderRadius: "8px",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                            }}
                        >
                            <Swiper
                                loop={true}
                                navigation={true}
                                pagination={{ clickable: true }}
                                modules={[Navigation, Pagination]}
                                className="custom-swiper"
                            >
                                {product.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <Box sx={{
                                            width: "100%",
                                            height: "250px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            overflow: "hidden",
                                            backgroundColor: "#f5f5f5",
                                            p: 3
                                        }}>
                                            <Box
                                                component="img"
                                                src={img}
                                                alt={`Image ${product.title}`}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Box sx={{ padding: 2 }}>
                                <Link href={`/prodotti/${product.id}`} passHref>
                                    <Typography sx={{ height: '5vh', width: '100%', mt: 1, textAlign: "left" }}>
                                        {product.title}
                                    </Typography>
                                </Link>
                                <Typography sx={{ color: "black", my: 3, textAlign: "left" }}>
                                    ${product.price}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: getAvailabilityColor(product.availabilityStatus), fontWeight: "bold", textAlign: "left" }}
                                >
                                    {product.availabilityStatus}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2, width: "100%" }}
                                    onClick={handleAddToCart(product)}
                                >
                                    Aggiungi al carrello
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))
            )}
        </Grid>
    )
}