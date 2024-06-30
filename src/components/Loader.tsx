import { Backdrop, CircularProgress } from '@mui/material';
import React,{FC} from 'react';

interface LoaderProps {
    open:boolean
    setOpen: (value: boolean) => void
}

const Loader:FC<LoaderProps> = ({open, setOpen}) => {
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(!open)}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;