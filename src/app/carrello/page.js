import { Container, Typography } from "@mui/material";

export default function Carrello() {
    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Articoli nel Carrello
            </Typography>
        </Container>
    );
}