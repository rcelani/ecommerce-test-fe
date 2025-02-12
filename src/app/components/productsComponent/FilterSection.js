import { Box, Chip, Typography } from "@mui/material";

import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FilterSection({ selectedCategory, handleFilter }) {

    const categories = [
        { name: "groceries",    icon: <LunchDiningRoundedIcon />    },
        { name: "beauty",       icon: <AutoAwesomeRoundedIcon />    },
        { name: "furniture",    icon: <HouseRoundedIcon />          },
        { name: "fragrances",   icon: <FaceRetouchingNaturalIcon /> },
        { name: null,           icon: <CancelIcon />                }
    ];
    
    return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 5, flexWrap: "wrap" }}>
            <Typography sx={{ font: 'bold', fontSize: 20, mt: 1 }}>Filtra per</Typography>
            {/* aggiungere linea divisore */}
            {/*se true (selezionato un filtro), deve uscire il cancella filtri (<CancelIcon>) */}
            {/* Aggiungere filtro range prezzo ?? */}
            {categories.map((cat) => (
                /* rimuovere le chip e sostituirle con delle check  */
                <Chip
                    key={cat.name}
                    icon={cat.icon}
                    label={cat.name ? cat.name : ""}
                    variant={selectedCategory === cat.name ? "filled" : "outlined"}
                    color={selectedCategory === cat.name ? "primary" : "default"}
                    onClick={() => handleFilter(cat.name)}
                    sx={{ fontSize: "16px", p: 2 }}
                />
            ))}
        </Box>
    )
} 
