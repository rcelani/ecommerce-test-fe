"use client";

import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Benvenuto nel nostro Ecommerce
      </Typography>
      <Typography variant="h6" paragraph>
        I nostri prodotti e tutte le novità del mercato a miglior prezzo!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/products")}
      >
        Esplora Prodotti
      </Button>
    </Container>
  );
}
