// Password: zymo@01234
import React from "react";
import { useEffect, useState } from "react";
import { webStorage, webDB } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import {
  addDoc,
  collection,
  where,
  query,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

export function PasswordDialog({
  open,
  setOpen,
  values,
  image,
  description,
  operation,
  setPageVisible,
  blogSlug,
}) {
  const navigate = useNavigate();
  const blogsCollectionRef = collection(webDB, "blogs");
  const blogsDbRef = collection(webDB, "blogs");
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  function uploadImage() {
    if (image == null) {
      uploadData(
        "https://firebasestorage.googleapis.com/v0/b/zymo-prod.appspot.com/o/blogsimage%2FzymoCover.jpg0dc3aca9-2f91-494c-bc91-8c09e9129b8f?alt=media&token=1a2d7caf-f69b-446f-ba87-9c762170eb66"
      );
      return;
    }

    const imageRef = ref(webStorage, `blogsimage/${image.name + v4()}`);

    uploadBytes(imageRef, image)
      .then((res) => {
        alert("Image successfully uploaded");
        return getDownloadURL(res.ref);
      })
      .then((downloadURL) => {
        uploadData(downloadURL);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }

  async function uploadData(url) {
    try {
      await addDoc(blogsDbRef, {
        title: values.title,
        subheading: values.subheading || "",
        category: values.category || "",
        description: description,
        cover: url,
        altText: values.altText || "",
        metaDescription: values.metaDescription || values.title || "",
      });

      alert("Blog Uploaded Successfully");
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    setOpen(false);
  }

  async function updateData() {
    // Find the document with the given title
    const getBlogQuery = query(
      blogsCollectionRef,
      where("title", "==", blogSlug)
    );

    try {
      const querySnapshot = await getDocs(getBlogQuery);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      // Assuming there is only one document with the specified title
      const document = querySnapshot.docs[0];
      const docRef = doc(webDB, "blogs", document.id);

      await updateDoc(docRef, {
        title: values.title,
        subheading: values.subheading || "",
        category: values.category || "",
        description: description,
        // cover: url,
        altText: values.altText || "",
        metaDescription: values.metaDescription || values.title || "",
      });

      alert("Blog updated successfully.");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Blog update failed");
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDialogConfirm() {

    if (password === "zymo@01234") {
      setLoading(true);

      if (setPageVisible) setPageVisible(true);
      console.log(setPageVisible);

      setOpen(false);

      alert("Password Confirmed");

      if (operation === "create") {
        uploadImage();
      }
      if (operation === "edit") {
        updateData();
      }
    } else {
      alert("Invalid password");
      setOpen(true);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enter Password"}</DialogTitle>

        <DialogContent>
          <TextField
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </DialogContent>

        <DialogActions>
          {operation === "create" ? (
            <Button onClick={handleClose}>Cancel</Button>
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}

          <Button onClick={handleDialogConfirm} disabled={loading} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
