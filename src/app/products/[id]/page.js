"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, CircularProgress, Container, Grid, Rating, Typography, Divider, Chip, List, ListItem } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiperCustom.css";

import { useCart } from "../../context/CartContext";


export default function DettaglioProdotti({ params }) {

    const router = useRouter();
    const { id } = use(params);

    const { addToCart, removeFromCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                fetch(`https://dummyjson.com/products/category/${data.category}`)
                    .then((res) => res.json())
                    .then((related) => setRelatedProducts(related.products.slice(0, 4)));
            })
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
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
                        {product.images?.map((img, index) => (
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
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        {product.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {product.brand}
                    </Typography>
                    <Rating value={product.rating} precision={0.1} readOnly sx={{ my: 1 }} />

                    <Typography variant="h5" sx={{ color: "green", fontWeight: "bold" }}>
                        €{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                    </Typography>
                    {product?.discountPercentage > 0 && (
                        <Typography variant="body2" color="error">
                            <s>€{product.price}</s> (-{product.discountPercentage}%)
                        </Typography>
                    )}

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Disponibilità: {product.stock > 0 ? `${product.stock} pezzi disponibili` : "Esaurito"}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>

                    <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                            Aggiungi al carrello
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => removeFromCart(product.id)}>
                            Rimuovi dal carrello
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom>Info e Tag</Typography>
                <Divider />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                    {product?.category ?
                        <Chip label={`Categoria: ${product.category}`} /> : ""
                    }
                    {product?.weight ?
                        <Chip label={`Peso: ${product.weight ?? ""}`} /> : ""
                    }
                    {product?.material ?
                        <Chip label={`Materiale: ${product.material}`} /> : ""
                    }
                </Box>
                {product?.tags ? (
                    <Box sx={{ mt: 2, gap: 2 }}>
                        {product.tags?.map((tag, index) => (
                            <Chip key={index} label={tag} variant="outlined" sx={{ mr: 1 }} />
                        ))}
                    </Box>
                ) : ""}
            </Box>

            {relatedProducts.length > 0 && (
                <Box>
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h5" gutterBottom>Recensioni</Typography>
                        <Divider />
                        <List>
                            {product.reviews?.map((review, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <Box>
                                        <Rating value={review.rating} precision={0.1} readOnly sx={{ mb: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">{review.reviewerName}</Typography>
                                        <Typography variant="body2" color="text.secondary">{new Date(review.date).toLocaleDateString()}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>{review.comment}</Typography>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="h5" gutterBottom>Prodotti correlati</Typography>
                        <Divider />
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {relatedProducts.map((related) => (
                                <Grid item xs={12} sm={6} md={3} key={related.id}>
                                    <Box>
                                        <Box
                                            sx={{
                                                border: "1px solid #ddd",
                                                borderRadius: 2,
                                                padding: 2,
                                                textAlign: "center",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => router.push(`/products/${related.id}`)}
                                        >
                                            <Box
                                                component="img"
                                                src={related.thumbnail}
                                                alt={related.title}
                                                sx={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 2 }}
                                            />
                                            <Typography variant="body1" sx={{ mt: 1 }}>{related.title}</Typography>
                                            <Typography variant="body2" color="green">
                                                €{(related.price * (1 - related.discountPercentage / 100)).toFixed(2)}
                                            </Typography>
                                            {related?.discountPercentage > 0 && (
                                                <Typography variant="caption" color="error">
                                                    <s>€{related.price}</s> (-{related.discountPercentage}%)
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ mt: 1 }}>
                                            <Button variant="contained" color="primary" onClick={() => addToCart(related)}>
                                                Aggiungi al carrello
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
}
