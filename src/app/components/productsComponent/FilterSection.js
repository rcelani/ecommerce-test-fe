import { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography, Slider, Button, Divider } from "@mui/material";
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

export default function FilterSection({ selectedCategories, handleFilter, handlePriceFilter, setFilteredProducts }) {
    
    const [priceRange, setPriceRange] = useState([0, 3000]);

    const categories = [
        { name: "groceries",    icon: <LunchDiningRoundedIcon />    },
        { name: "beauty",       icon: <AutoAwesomeRoundedIcon />    },
        { name: "furniture",    icon: <HouseRoundedIcon />          },
        { name: "fragrances",   icon: <FaceRetouchingNaturalIcon /> }
    ];

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        handlePriceFilter(newValue);
    };

    const resetFilters = () => {
        handleFilter([]);
        setPriceRange([0, 3000]);
        handlePriceFilter([0, 3000]);
    };

    return (
        <Box sx={{ textAlign: "center", borderRadius: 2, border: "1px solid #000" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 20, mb: 1 }}>
                Filtra per
            </Typography>

            {(selectedCategories || priceRange[0] !== 0 || priceRange[1] !== 3000) && (
                <Button onClick={resetFilters} sx={{ color: "red", fontSize: 14, mb: 2 }}>
                    Reset Filtri
                </Button>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Checkbox */}
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "start", 
                pl: 2
            }}>
                {categories.map((cat) => (
                    <FormControlLabel
                        key={cat.name}
                        control={
                            <Checkbox 
                                checked={selectedCategories.includes(cat.name)}
                                onChange={() => handleFilter(cat.name)}
                                color="primary"
                            />
                        }
                        label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {cat.icon}
                                {cat.name}
                            </Box>
                        }
                    />
                ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Slider Range */}
            <Typography sx={{ fontSize: 16, mb: 1 }}>Prezzo: €{priceRange[0]} - €{priceRange[1]}</Typography>
            <Slider
                value={priceRange}
                onChange={handlePriceChange}
                min={0}
                max={3000}
                step={10}
                valueLabelDisplay="auto"
                sx={{ width: "80%", mx: "auto" }}
            />
        </Box>
    );
}
