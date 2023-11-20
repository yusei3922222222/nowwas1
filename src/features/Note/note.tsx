// Note.tsx

import React from "react";
import styles from "./Note.module.css";

interface NoteProps {
  noteId: number;
  title: string;
  userImg: string;
  nickName: string;
  onNewPost?: () => void; // 新規投稿ボタンのコールバック関数
}

const Note: React.FC<NoteProps> = ({ noteId, title, userImg, nickName, onNewPost }) => {
  return (
    <div className={styles.note}>
      <div className={styles.userProfile}>
        <img src={userImg} alt="user profile" />
        <p>{nickName}</p>
      </div>

      <div className={styles.noteContent}>
        <p>Note ID: {noteId}</p>
        <p>Title: {title}</p>
        {onNewPost && (
          <button className={styles.newPostButton} onClick={onNewPost}>
            New Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Note;
