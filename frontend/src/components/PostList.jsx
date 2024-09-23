import PostItem from "./PostItem";
import "./PostList.css";

function PostList({ posts, onEdit, onDelete, editId }) {
  if (!posts) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id} // Ensure key is unique
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          editId={editId} // Pass editId to PostItem
        />
      ))}
    </div>
  );
}

export default PostList;
