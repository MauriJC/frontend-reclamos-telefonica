/* eslint-disable react/prop-types */
import { TextField, InputAdornment, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onChangeTerm, title, buttonTitle, getService }) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getService();
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center', alignContent: 'center' }}>

                <p>{title}:</p>

                <TextField
                    variant="outlined"
                    placeholder={`Buscar ${buttonTitle}...`}
                    onChange={(e) => onChangeTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
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
