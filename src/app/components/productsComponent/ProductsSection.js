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

export default function ProductsSection({ filteredProducts }) {

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
                    - implementare animazione alla card (se necessaria)
                    - ridefinire tutte le size
                    - aggiungere colori differenti in base alla loro disponibilità
                    - aggiungere button "Aggiungi al carrello" + funzionalità
                */
                filteredProducts.map((product) => (
                    <Grid 
                        item 
                        key={product.id} 
                        xs={12} sm={6} md={3} 
                        style={{ padding: 30 }}
                    >
                        <Box sx={{ p: 'auto'}}>
                            <Swiper
                                /* spaceBetween={10} */
                                /* slidesPerView={1} */
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
                        <Typography variant="h5" sx={{ color: "black", mt: 1 }}>
                            ${product.price}
                        </Typography>
                        <Typography 
                            variant="body2"
                            sx={{ color: getAvailabilityColor(product.availabilityStatus), fontWeight: "bold" }}
                        >
                            {product.availabilityStatus}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2, width: "100%" }}
                        >
                            Aggiungi al carrello
                        </Button>
                    </Grid>
                ))
            )}
        </Grid>
    )
}