import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useState, FC } from "react";
import { IPost } from "../../models/IPost";

const UploadDialog: FC<any> = ({ open, toggleOpen, isAdult, loggedUser }) => {
  const [form, setForm] = React.useState<IPost>({
    description: "",
    title: "",
    isAdult: false,
    file: new Blob(),
    userEmail: "",
    fileName: "",
    fileType: "",
    mediaType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: any) => ({
      ...form,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheckbox = (e: any) => {
    setForm((form: any) => ({
      ...form,
      [e.target.id]: e.target.checked,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files![0]) {
      let file: File = e.target.files![0];
      const types: string[] = file.type.split("/");

      setForm((form) => ({
        ...form,
        fileName: file.name.split(".")[0].replace(" ", ""),
        fileType: types[1],
        mediaType: types[0][0].toUpperCase() + types[0].substring(1),
        file: file,
      }));
    }
  };

  const upload = () => {
    const formData = formToFormData();

    axios({
      method: "POST",
      data: formData,
      responseType: "json",
      headers: {
        ApiKey: "12345",
      },
      url: "https://localhost:4131/post/create",
    })
      .then((response: AxiosResponse) => {
        window.location.reload();
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  };

  const handleBackdropClick = (_: any, reason: string) => {
    if (reason && reason == "backdropClick") {
      toggleOpen(false);
    }
  };

  const formToFormData = () => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }

    formData.set("userEmail", loggedUser.username);

    return formData;
  };

  return (
    <Dialog open={open} onClose={handleBackdropClick}>
      <DialogContent>
        <Typography variant="h5">Upload media</Typography>
        <TextField
          id="title"
          label="Title"
          type="text"
          value={form!.title}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <TextField
          id="description"
          label="Description"
          value={form!.description}
          type="text"
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        {isAdult && isAdult == true && (
          <FormControlLabel
            control={<Checkbox id="isAdult" />}
            value={form.isAdult === true ? "off" : "on"}
            onChange={handleCheckbox}
            label="Is adult?"
            sx={{ display: "block" }}
          />
        )}
        <input
          style={{ display: "none" }}
          id="file-upload"
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Choose file
          </Button>
        </label>
        <Button
          sx={{ backgroundColor: "red" }}
          variant="contained"
          onClick={() => {
            upload();
          }}
          disabled={!form.fileName}
        >
          Upload
        </Button>
        {form.fileName && (
          <Typography sx={{ display: "block", mt: 2 }}>
            File: {form.fileName + "." + form.fileType}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
