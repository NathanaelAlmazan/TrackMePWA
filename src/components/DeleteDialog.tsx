import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DeleteDialog({
    open,
    onClose,
    onDelete
}: {
    open: boolean,
    onClose: () => void,
    onDelete: (event: React.MouseEvent<unknown>) => void
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete this item?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}