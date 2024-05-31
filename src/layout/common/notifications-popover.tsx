import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { Iconify } from '../../components';
import { useAppSelector, useRouter } from '../../hooks';

import { useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS, SUBSCRIBE_OFFICE_EVENTS } from '../../graphql/users';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { uuid } = useAppSelector((state) => state.auth);
  const { data: notifications, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      uuid: uuid as string
    }
  });
  const { data: officeEvents } = useSubscription(SUBSCRIBE_OFFICE_EVENTS);

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [documents, setDocuments] = useState<Notification[]>([]);
  const [reports, setReports] = useState<Notification[]>([]);
  const [events, setEvents] = useState<Notification[]>([]);

  useEffect(() => {
    if (officeEvents) refetch();
  }, [officeEvents, refetch]);

  useEffect(() => {
    if (notifications) {
      setDocuments(notifications.getNotifications.filter(notif => notif.subject.toLowerCase().includes("document")).map(notif => ({
        title: notif.subject,
        description: notif.description,
        createdAt: new Date(notif.timestamp),
        type: "documents"
      })));

      setReports(notifications.getNotifications.filter(notif => notif.subject.toLowerCase().includes("report")).map(notif => ({
        title: notif.subject,
        description: notif.description,
        createdAt: new Date(notif.timestamp),
        type: "reports"
      })));

      setEvents(notifications.getNotifications.filter(notif => notif.subject.toLowerCase() === "event").map(notif => ({
        title: notif.subject,
        description: notif.description,
        createdAt: new Date(notif.timestamp),
        type: "calendar"
      })));
    }
  }, [notifications]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={notifications?.getNotifications.length || 0} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`You have ${notifications?.getNotifications.length || 0} notifications`}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {documents.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Documents
                </ListSubheader>
              }
            >
              {documents.map((document, index) => (
                <NotificationItem 
                  key={index} 
                  notification={document} 
                  onClose={handleClose}
                />
              ))}
            </List>
          )}

          {reports.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Reports
                </ListSubheader>
              }
            >
              {reports.map((report, index) => (
                <NotificationItem 
                  key={index} 
                  notification={report} 
                  onClose={handleClose}
                />
              ))}
            </List>
          )}

          {events.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Events
                </ListSubheader>
              }
            >
              {events.map((report, index) => (
                <NotificationItem 
                  key={index} 
                  notification={report} 
                  onClose={handleClose}
                />
              ))}
            </List>
          )}
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

interface Notification {
    title: string,
    description: string,
    createdAt: Date,
    type: "reports" | "documents" | "calendar"
}

function NotificationItem({ notification, onClose }: { notification: Notification, onClose: () => void }) {
  const router = useRouter();
  const { avatar, title } = renderContent(notification);

  const handleRedirect = () => {
    router.push(`/${notification.type}`);
    onClose();
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px'
      }}
      onClick={handleRedirect}
    >
      <ListItemAvatar>
        {avatar}
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {new Date(notification.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            })}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: Notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.title.toLowerCase().includes('document')) {
    return {
      avatar: <Iconify icon='ant-design:form-outlined' sx={{ width: 40, height: 40 }} />,
      title,
    };
  }
  if (notification.title.toLowerCase().includes('report')) {
    return {
      avatar: <Iconify icon='mdi:report-multiple' sx={{ width: 40, height: 40 }} />,
      title,
    };
  }
  return {
    avatar: <Iconify icon='material-symbols-light:notifications-active' sx={{ width: 40, height: 40 }} />,
    title,
  };
}
