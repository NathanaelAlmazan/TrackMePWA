import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Iconify, Snackbar } from '../../../components';

import axios from 'axios';

import { useMutation } from '@apollo/client';
import { SUBMIT_REPORT } from '../../../graphql/reports';


export type MessageFiles = {
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

export default function SubmissionField(
{ 
    content,
    reportId, 
    onReport, 
    onCancel 
}: { 
    content?: string | null,
    reportId: number, 
    onReport: () => void, 
    onCancel: () => void 
}) {
    const [message, setMessage] = useState<string>(content || "");
    const [files, setFiles] = useState<File[]>([]);
    const [formError, setFormError] = useState<string>();

    const [submitReport, { error: submitError }] = useMutation(SUBMIT_REPORT);


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

        // upload files
        let uploadedFiles: MessageFiles[] = [];
        if (files.length > 0) {
            try {
                const form = new FormData();
                files.forEach((file) => {
                    form.append("files", file);
                });

                const result = await axios.post(process.env.REACT_APP_UPLOAD_URL as string, form);
                uploadedFiles = result.data.files;
            } catch (err) {
                setFormError("Failed to upload files.");
                return
            }
        }

        // create comment
        await submitReport({
            variables:{
                id: reportId,
                message: message,
                files: uploadedFiles.map(file => file.fileUrl)
            }
        });

        onReport(); // reload
        setMessage(""); // reset message
        setFiles([]); // reset files
        onCancel();
    }

    return (
        <>
        <Box 
            component='form'
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <Box sx={{ maxWidth: '100%', overflow: 'auto', display: 'flex', flexDirection: 'row' }}>
                    {files.map(file => (
                        <Chip key={file.name} label={file.name} variant="outlined" onDelete={() => handleDelete(file.name)} sx={{ mx: '5px' }} />
                    ))}
                </Box>

                <TextField 
                    variant='outlined'
                    placeholder='Report...' 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    rows={3}
                    required
                    fullWidth 
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
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
                            </InputAdornment>,
                    }}
                />

                <Stack direction='row' spacing={2} alignItems='end' justifyContent='flex-end'>
                    <Button color='inherit' onClick={onCancel}>Cancel</Button>
                    <Button type='submit' variant='contained' color='inherit'>Submit</Button>
                </Stack>
            </Stack>
        </Box>

        <Snackbar 
            severity='error' 
            message={submitError?.message || formError} 
        />

        </>
    );
}