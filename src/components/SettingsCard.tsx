import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import { capitalCase } from 'change-case';

import { DeleteDialog, Iconify } from '../components';

export interface SettingsItem { 
    id: number, 
    label: string, 
    category?: string 
}

export interface SettingsCategories {
    value: string,
    label: string
}

export default function SettingsCard({
    title, items, categories, onCreate, onUpdate, onDelete
}: {
    title: string, 
    items: SettingsItem[],
    categories?: SettingsCategories[],
    onCreate: (label: string, category?: string) => void,
    onUpdate: (id: number, label: string, category?: string) => void,
    onDelete: (id: number) => void
}) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandForm = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader 
                title={
                    <Typography variant='h6'>{title}</Typography>
                }
                action={
                    <Button 
                        variant='contained' 
                        color='inherit'
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleExpandForm}
                    >
                        Create
                    </Button>
                }
            />
            <CardContent>
                <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                    <FormCollapse 
                        expanded={expanded} 
                        categories={categories}
                        onCreate={(e) => onCreate(e.label, e.category)}
                        onCancel={handleExpandForm} 
                    />

                    <List>
                        {items.map(item => 
                            <ListItemAction 
                                key={item.id} 
                                value={item}
                                categories={categories}
                                onUpdate={(e) => onUpdate(e.id, e.label, e.category)}
                                onDelete={onDelete}
                            />    
                        )}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
}

export function FormCollapse(
    { expanded, categories, onCreate, onCancel }: 
    { 
        expanded: boolean, 
        categories?: SettingsCategories[],
        onCreate: (value: SettingsItem) => void, 
        onCancel: () => void 
    }
) {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2 }}>
                <Form 
                    categories={categories}
                    onSubmit={onCreate}
                    onCancel={onCancel} 
                />
            </Box>
        </Collapse>
    );
}

export function ListItemAction(
    { value, categories, onUpdate, onDelete }: 
    { 
        value: SettingsItem, 
        categories?: SettingsCategories[],
        onUpdate: (value: SettingsItem) => void,
        onDelete: (id: number) => void
    }
) {
    const [open, setOpen] = useState<HTMLButtonElement | null>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);

    const handleEdit = () => {
        setEdit(!edit);
        handleCloseMenu();
    }

    const handleDelete = () => {
        onDelete(value.id);
        handleCloseMenu();
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };

    return (
        <>
           {edit ? (
                <Form 
                    selected={value}
                    categories={categories}
                    onSubmit={onUpdate}
                    onCancel={handleEdit} 
                />
            ) : (
                <ListItem
                    secondaryAction={
                        <IconButton onClick={handleOpenMenu}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    }
                >
                    <ListItemText primary={value.label} secondary={value.category && capitalCase(value.category)} />
                </ListItem>
            )}

            <Divider />

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={() => setDialog(true)} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

            <DeleteDialog 
                open={dialog}
                onClose={() => setDialog(false)}
                onDelete={handleDelete}
            />
        </>
    );
}

export function Form(
    { selected, categories, onSubmit, onCancel }: 
    { 
        selected?: SettingsItem,
        categories?: SettingsCategories[],
        onSubmit: (value: SettingsItem) => void,
        onCancel: () => void 
    }
) {
    const [label, setLabel] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        if (selected) {
            setLabel(selected.label);
            
            if (selected.category) {
                setCategory(selected.category);
            } else if (categories) {
                setCategory(categories[0].value);
            }
        }
    }, [selected, categories]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selected) onSubmit({ id: selected.id, label, category }); // update selected item
        else onSubmit({ id: -1, label, category }); // create new item

        onCancel();
    }

    return (
        <Stack component='form' spacing={3} onSubmit={handleSubmit}>
            <TextField 
                name='name'
                label='Label'
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                variant='outlined'
                required
                fullWidth
            />

            {categories && (
                <TextField
                    name='category'
                    select
                    label="Category"
                    variant='outlined'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    fullWidth
                >
                    {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
            )}
            
            <Stack spacing={2} direction='row' justifyContent='flex-end'>
                <Button onClick={onCancel} color='inherit'>Cancel</Button>
                <Button variant='contained' color='inherit' type='submit'>Save</Button>
            </Stack>
        </Stack>
    );
}