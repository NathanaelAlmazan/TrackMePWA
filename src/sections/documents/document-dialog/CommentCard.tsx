import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import JoditEditor, { Jodit } from "jodit-react";

import { useAppSelector } from "../../../hooks";

const config = {
  readonly: true, // all options from https://xdsoft.net/jodit/doc/
  toolbar: false,
  minHeight: 250,
  maxHeight: 250,
  style: {
    "& .jodit .jodit-status-bar": {
      background: "#29572E",
      color: "rgba(255,255,255,0.5)",
    },
  },
};

export default function CommentCard({
  senderId,
  senderName,
  recipientId,
  recipientName,
  message,
}: {
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  message: string;
}) {
  const { uuid } = useAppSelector((state) => state.auth);

  const editor = useRef<Jodit>(null);

  return (
    <Box sx={uuid === senderId ? { pl: "5%" } : { pr: "5%" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack direction="row" spacing={2}>
            <Avatar>
              {senderName
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")}
            </Avatar>
           <Box>
           <Typography variant="subtitle1" component="div">
              {senderName}
            </Typography>
            <Typography variant="body2" component="div">
              {`To ${recipientName}`}
            </Typography>
           </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <JoditEditor ref={editor} value={message} config={config} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
