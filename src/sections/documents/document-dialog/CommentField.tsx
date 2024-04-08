import React, { useState, useRef, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import JoditEditor, { Jodit } from "jodit-react";

import { Snackbar, Iconify } from "../../../components";
import { Officers } from "../../../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../../graphql/documents";

export type Uploads = {
  fileUrl: string;
  filePath: string;
  fileName: string;
  fileType: string;
};

type MediaFiles = {
  files: Uploads[];
};

interface EditorProps {
  officerId?: string;
  documentId: string;
  message?: string;
  recipients?: Officers[];
  onComment: () => void;
}

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  toolbar: true,
  minHeight: 250,
  maxHeight: 250,
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "paragraph",
    "|",
    "image",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "selectall",
    "cut",
    "copy",
    "|",
    "hr",
    "|",
    "print",
    "symbol",
    "about",
  ],
  uploader: {
    url: process.env.REACT_APP_UPLOAD_URL as string,
    imagesExtensions: ["jpg", "png", "jpeg", "gif"],
    withCredentials: false,
    format: "json",
    method: "POST",
    prepareData: function (formData: any) {
      const files = Array.from(formData.values()).filter(
        (obj) => obj instanceof File
      );

      // reset form data
      Array.from(formData.keys()).forEach((key) => {
        formData.delete(key);
      });

      // add files
      files.forEach((file) => {
        formData.append("files", file);
      });

      return formData;
    },
    isSuccess: function (resp: MediaFiles) {
      return resp.files.length > 0;
    },
    process: function (resp: MediaFiles) {
      return {
        files: resp.files.map((file) => file.filePath),
        path: "/",
        baseurl: process.env.REACT_APP_MEDIA_URL as string,
        error: 0,
        msg: "",
      };
    },
    error: function (error: Error) {
      console.log("Failed to upload files.");
    },
  },
  style: {
    "& .jodit .jodit-status-bar": {
      background: "#29572E",
      color: "rgba(255,255,255,0.5)",
    },
  },
};

export default function CommentField(props: EditorProps) {
  const editor = useRef<Jodit>(null);
  const [content, setContent] = useState<string>("");
  const [formError, setFormError] = useState<string>();
  const [recipientId, setRecipientId] = useState<string>("");

  const [createComment, { error }] = useMutation(CREATE_COMMENT);

  useEffect(() => {
    if (props.message) setContent(props.message);
  }, [props.message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.officerId) {
      setFormError("Not logged in.");
      return;
    }

    // create comment
    await createComment({
      variables: {
        documentId: props.documentId,
        message: content,
        recipientId: recipientId,
        senderId: props.officerId,
      },
    });

    props.onComment(); // reload
    setRecipientId("");
    setContent(""); // reset message
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {props.recipients && (
            <TextField
              name="recipientId"
              select
              label="Recipient"
              value={recipientId}
              onChange={(event) => setRecipientId(event.target.value)}
              required
              fullWidth
            >
              {props.recipients.map((option) => (
                <MenuItem key={option.uuid} value={option.uuid}>
                  {option.firstName + " " + option.lastName}
                </MenuItem>
              ))}
            </TextField>
          )}

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(value) => setContent(value)}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<Iconify icon="ic:baseline-send" />}
            >
              Send
            </Button>
          </Box>
        </Stack>
      </Box>

      <Snackbar severity="error" message={formError || error?.message} />
    </>
  );
}
