"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    AppBar, Toolbar, Button, Typography, Badge, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, 
    Paper,
    InputBase
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from "@/app/context/CartContext";
import { Search } from "@mui/icons-material";

export default function Navbar() {
    const { cart } = useCart();
    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const toggleDrawer = (openState) => () => {
        setOpen(openState);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearch(query);
    }

    const menuItems = [
        { text: "Home", path: "/" },
        { text: "Prodotti", path: "/products" },
    ];

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "primary", zIndex: 1100 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Ecommerce Logo
                    </Typography>

                    <Paper
                        component="form"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            width: 300,
                            padding: "2px 10px",
                            borderRadius: 4,
                            backgroundColor: "#fff"
                        }}
                    >
                        <Search sx={{ color: '#000', mr: 1 }} />
                        <InputBase
                            placeholder="Cerca prodotti..."
                            value={search}
                            onChange={handleSearchChange}
                            sx={{ flex: 1 }} 
                        />
                    </Paper>

                    <nav style={{ display: "flex", gap: "10px" }}>
                        {menuItems.map((item) => (
                            <Button 
                                key={item.text} 
                                color="inherit" 
                                component={Link} 
                                href={item.path} 
                                sx={{ display: { xs: "none", md: "inline-flex" } }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </nav>

                    <Badge badgeContent={totalCartItems} color="error" sx={{ mx: 3 }}>
                        <ShoppingCartIcon />
                    </Badge>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { md: "none" } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} href={item.path} onClick={toggleDrawer(false)}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
