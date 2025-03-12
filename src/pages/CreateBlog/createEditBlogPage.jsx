import "./createEditBlog.scss";
import React, { useEffect, useState } from "react";
import EditBlogCard from "./EditBlogCard";
import { webDB } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { PasswordDialog } from "./PasswordDialog";

function CreateEditBlogPage() {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const navigate = useNavigate();
  const blogsCollectionRef = collection(webDB, "blogs");
  const [open, setOpen] = useState(true);
  const [isPageVisible, setPageVisible] = useState(false);
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getBlogsList = async () => {
      try {
        const data = await getDocs(blogsCollectionRef);
        const filteredBlogsList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredBlogsList);
        setBlogsList(filteredBlogsList);
      } catch (e) {
        console.error(e);
      }
    };

    getBlogsList();
  }, []);

  function handleCreateBlogClick() {
    navigate("/createblog/create");
  }

  return (
    <div>
      <PasswordDialog
        open={open}
        setOpen={setOpen}
        isPageVisible={isPageVisible}
        setPageVisible={setPageVisible}
      />
      {isPageVisible && (
        <div className="create-button">
          <h1>Blogs</h1>
          <h2>Read the latest blogs or post your own</h2>
          <button className="create-new-button" onClick={handleCreateBlogClick}>
            Create Your Own Blog
          </button>
        </div>
      )}

      {isPageVisible && (
        <div className="edit-blogs-container">
          <div className="edit-blogs-cards-container">
            {blogsList.map((editblog, id) => {
              return <EditBlogCard editblog={editblog} key={id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEditBlogPage;
