import "./PostItem.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function PostItem({ post, onEdit, onDelete, editId }) {
  return (
    <div className="post">
      <div className="post-head">
        <h4 className="title">{post.title}</h4>
        <p>{post.time}</p>
      </div>
      <q className="quote">{post.quote}</q>
      <cite className="author">- {post.author} -</cite>
      <div className="post-icons">
        <a onClick={() => onEdit(post.id)}>
          <MdModeEditOutline className="icon" />
        </a>
        <a
          onClick={() => onDelete(post.id)}
          className={editId === post.id ? "disabled-link" : ""}
        >
          <MdDelete className="icon" />
        </a>
      </div>
    </div>
  );
}

export default PostItem;
