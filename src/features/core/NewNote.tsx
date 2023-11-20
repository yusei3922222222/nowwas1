// NewNote.tsx

import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "./Core.module.css";

import { File } from "../types";

import {
  selectOpenNewNote,
  resetOpenNewNote,
  fetchNoteStart,
  fetchNoteEnd,
  fetchAsyncNewNote,
} from "../Note/noteSlice";

import { Button, TextField, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: 280,
    height: 220,
    padding: "50px",
    transform: "translate(-50%, -50%)",
  },
};

const NewNote: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewNote = useSelector(selectOpenNewNote);

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  const newNote = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { title: title, img: image };
    await dispatch(fetchNoteStart());
    await dispatch(fetchAsyncNewNote(packet));
    await dispatch(fetchNoteEnd());
    setTitle("");
    setImage(null);
    dispatch(resetOpenNewNote());
  };

  return (
    <>
      <Modal
        isOpen={openNewNote}
        onRequestClose={async () => {
          await dispatch(resetOpenNewNote());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>SNS clone</h1>
          <br />
          <TextField
            placeholder="Please enter note title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files![0])}
          />
          <br />
          <IconButton onClick={handlerEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />
          <Button
            disabled={!title || !image}
            variant="contained"
            color="primary"
            onClick={newNote}
          >
            New note
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewNote;
