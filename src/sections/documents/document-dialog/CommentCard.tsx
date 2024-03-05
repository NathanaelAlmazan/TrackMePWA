import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '../../../hooks';

function extractFileName(url: string) {
    const paths = url.split('/');
    const filename = paths[paths.length - 1].split('_');
    filename.shift();

    return filename.join(' ');
}

export default function CommentCard({ 
    senderId,
    message,
    senderName,
    files,
    avatar
}: 
{ 
    avatar: string,
    senderId: string,
    senderName: string,
    message: string,
    files?: string[] | null
}) {
    const { uuid } = useAppSelector((state) => state.auth);

    return (
        <Box sx={uuid === senderId ? { pl: '5%' } : { pr: '5%' }}>
            <Card>
                <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Avatar
                            src={avatar}
                            alt={senderName}
                            sx={{
                                width: 50,
                                height: 50,
                                border: (theme) => `solid 2px ${theme.palette.background.default}`,
                            }}
                        />

                        <Box>
                            <Typography variant='subtitle1'>
                                {senderName}
                            </Typography>
                            <Typography variant='body1'>
                                {message}
                            </Typography>
                        </Box>
                    </Stack>
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
        </Box>
    );
}