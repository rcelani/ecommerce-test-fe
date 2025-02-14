"use client";

import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, LocationOn, Phone, Email } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "primary.main", color: "white", py: 3, mt: 5 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom> Dove trovarci </Typography>
                        <Box display="flex" alignItems="center">
                            <LocationOn sx={{ mr: 1 }} />
                            <Typography variant="body2"> Via Roma 123, Milano, Italia </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Phone sx={{ mr: 1 }} />
                            <Typography variant="body2"> +39 0123 456 789 </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Email sx={{ mr: 1 }} />
                            <Typography variant="body2"> info@example.com </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom> Servizio Clienti </Typography>
                        <Typography variant="body2"> Lun - Ven: 9:00 - 18:00 </Typography>
                        <Typography variant="body2"> Sabato: 10:00 - 14:00 </Typography>
                        <Typography variant="body2"> Domenica: Chiuso </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom> Seguici sui social </Typography>
                        <Box>
                            <IconButton color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit">
                                <Twitter />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* 🚀 Disclaimer */}
                <Box textAlign="center" mt={3}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
