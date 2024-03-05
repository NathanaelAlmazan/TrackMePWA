import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import axios from 'axios';

import { useMutation } from '@apollo/client';
import { Iconify, Snackbar } from '../../../components';
import { CREATE_COMMENT } from '../../../graphql/documents';

import { useAppSelector } from '../../../hooks';

export type Uploads = {
    fileUrl: string;
    fileName: string;
    fileType: string;
}

function convertFileListToArray(fileList: FileList): File[] {
    const filesArray: File[] = [];
    
    // Convert FileList to array
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (file) {
        filesArray.push(file);
      }
    }
  
    return filesArray;
}

export default function CommentField({ referenceNum, onComment }: { referenceNum: string, onComment: () => void }) {
    const theme = useTheme();
    const { uuid } = useAppSelector((state) => state.auth);

    const [message, setMessage] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [formError, setFormError] = useState<string>();

    const [createComment, { error: createError }] = useMutation(CREATE_COMMENT);


    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {

            setFiles(previous => previous.concat(convertFileListToArray(fileList)));
        }
    }

    const handleDelete = (fileName: string) => {
        setFiles(previous => previous.filter(file => file.name !== fileName));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!uuid) {
            setFormError("Not logged in.");
            return
        }

        // upload files
        let uploaded: Uploads[] = [];
        if (files.length > 0) {
            try {
                const form = new FormData();
                files.forEach((file) => {
                    form.append("files", file);
                });

                const result = await axios.post(process.env.REACT_APP_MEDIA_URL as string, form);
                uploaded = result.data.files;
            } catch (err) {
                setFormError("Failed to upload files.");
                return
            }
        }

        // create comment
        await createComment({
            variables:{
                documentId: referenceNum,
                senderId: uuid,
                message: message,
                files: uploaded.map(file => file.fileUrl)
            }
        });

        onComment(); // reload
        setMessage(""); // reset message
        setFiles([]); // reset files
    }

    return (
        <>
        <Box 
            component='form'
            onSubmit={handleSubmit}
            sx={{ 
                position: 'absolute', 
                backgroundColor: theme.palette.background.paper,
                bottom: 0, 
                left: 0, 
                right: 0, 
                px: 3,
                pt: 1 
            }}
        >
            <Stack spacing={2}>
                <Box sx={{ maxWidth: '100%', overflow: 'auto', display: 'flex', flexDirection: 'row' }}>
                    {files.map(file => (
                        <Chip key={file.name} label={file.name} variant="outlined" onDelete={() => handleDelete(file.name)} sx={{ mx: '5px' }} />
                    ))}
                </Box>

                <TextField 
                    variant='outlined'
                    placeholder='Comment...' 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    fullWidth 
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <Stack direction='row'>
                                    <Tooltip title='Insert File'>
                                        <IconButton component='label'>
                                            <Iconify icon='material-symbols:attach-file-add-rounded' />

                                            <input 
                                                type='file' 
                                                multiple
                                                hidden 
                                                style={{ display: 'none' }}
                                                onChange={handleFilesChange}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    
                                    <Tooltip title='Send'>
                                        <IconButton type='submit'>
                                            <Iconify icon='ic:baseline-send' />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </InputAdornment>,
                    }}
                />
            </Stack>
        </Box>

        <Snackbar 
            severity='error' 
            message={createError?.message || formError} 
        />

        </>
    );
}