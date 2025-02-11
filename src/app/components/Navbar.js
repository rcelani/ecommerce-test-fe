import Link from "next/link";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ecommerce Logo
                </Typography>
                <Button color="inherit" component={Link} href="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} href="/prodotti">
                    Prodotti
                </Button>
                <Button color="inherit" component={Link} href="/carrello">
                    Carrello
                </Button>
            </Toolbar>
        </AppBar>
    )
}