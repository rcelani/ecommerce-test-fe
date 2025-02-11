import { Container, Typography } from "@mui/material";

export default function Prodotti() {

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Lista Prodotti
            </Typography>
        </Container>
    );
}