import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from '../../../components';

export function extractFileName(url: string) {
    const paths = url.split('_');
    return paths[paths.length - 1];
}

export default function SubmissionCard({ 
    message,
    files,
    onEdit,
    onClose
}: 
{ 
    message?: string | null,
    files?: string[] | null,
    onEdit: () => void,
    onClose: () => void
}) {
    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader 
                    action={
                        <Tooltip title='Edit Report'>
                            <IconButton aria-label="settings" onClick={onEdit}>
                                <Iconify icon='akar-icons:edit' />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    <Typography variant='body1'>
                        {message}
                    </Typography>
                </CardContent>
                {files && files.length > 0 && (
                    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ maxWidth: '100%', overflow: 'auto', display: 'flex', flexDirection: 'row' }}>
                            {files.map(file => (
                                <Typography 
                                    key={file} 
                                    component='a' 
                                    variant='body2' 
                                    href={file.trim()}
                                    target='_blank'
                                    sx={{ mx: '5px'}}
                                >
                                    {extractFileName(file)}
                                </Typography>
                            ))}
                        </Box>
                    </CardActions>
                )}
            </Card>

            <Stack direction='row' spacing={2} alignItems='end' justifyContent='flex-end'>
                <Button color='inherit' onClick={onClose}>Close</Button>
            </Stack>
        </Stack>
    );
}