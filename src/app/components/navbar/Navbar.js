'use client'

import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "@/app/context/ChartContext";

export default function Navbar() {

    const { cart } = useCart();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ecommerce Logo
                </Typography>
                <Button color="inherit" component={Link} href="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} href="/products">
                    Prodotti
                </Button>
                <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Toolbar>
        </AppBar>
    )
}