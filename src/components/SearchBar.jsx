/* eslint-disable react/prop-types */
import { TextField, InputAdornment, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onChangeTerm, title, buttonTitle, getService }) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getService();
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center'}}>

                <Typography variant="body1" sx={{alignSelf:'center'}}>{title}:</Typography>

                <TextField
                    variant="outlined"
                    placeholder={`Buscar ${buttonTitle}...`}
                    onChange={(e) => onChangeTerm(e.target.value)}
                    onKeyUp={handleKeyPress}
                    required
                    type='number'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '70%', backgroundColor: 'white' }}
                />
                <Button variant='contained' color='success' onClick={getService}>Buscar {buttonTitle}</Button>
            </Box >
        </>
    );
};

export default SearchBar;
