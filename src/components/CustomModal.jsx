import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CustomModal = ({ open, onClose, title, content, actions }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {actions.map((action, index) => (
                    <Button key={index} onClick={action.onClick} color={action.color || "primary"}>
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )

}

export default CustomModal;



