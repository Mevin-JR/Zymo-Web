import "./editBlog.scss";
import React from "react";
import { Link } from "react-router-dom";

function EditBlogCard({ editblog }) {
  const slug = editblog?.title
    .split("-")
    .join("_")
    .split(" ")
    .join("-")
    .split("?")
    .join("$");

  // const tags = [
  //   "<h1>",
  //   "<h2>",
  //   "<h3>",
  //   "<h4>",
  //   "<h5>",
  //   "<h6>",
  //   "<span>",

  //   "<p>",
  //   "</h1>",
  //   "</h2>",
  //   "</h3>",
  //   "</h4>",
  //   "</h5>",
  //   "</h6>",
  //   "</span>",
  //   "<br />",
  // ];
  // let blogDesc = blog.description;
  // for (let i = 0; i < tags.length; i++) {
  //   blogDesc = blogDesc.split(tags[i]).join(" ");
  // }

  return (
    <Link className="link" to={`/createblog/${slug}`}>
      {/* <MetaTags> */}
      <meta
        id="meta-description"
        name="description"
        content={editblog.metaDescription || editblog.title}
      />
      {/* </MetaTags> */}

      <div className="edit-blog-card-container">
        <img src={editblog.cover} alt={editblog.altText || "cover"} />
        {editblog.category ? (
          <span>{editblog.category}</span>
        ) : (
          <div className="no-category"></div>
        )}
        <h3>{editblog.title}</h3>

        {/* <p>{blogDesc.substring(0, 350)}...</p> */}
        <p>{editblog.metaDescription}</p>
      </div>
    </Link>
  );
}

export default EditBlogCard;