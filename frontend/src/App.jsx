import { useEffect, useState } from "react";
import "./App.css";
import NewPost from "./components/NewPost";
import PostList from "./components/PostList";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    quote: "",
    author: "",
  });

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/posts");
      const data = await res.json();
      setPosts(data.posts);
      setIsLoading(false);
    }
    getPosts();
  }, []);

  const handleAddNewPost = async () => {
    try {
      let hasError = false;
      const res = await fetch("http://localhost:3000/post", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        hasError = true;
      }
      const data = await res.json();
      if (hasError) {
        throw new Error(data.message);
      }
      const newPost = data.post;
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setFormData({ title: "", quote: "", author: "" });
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  const handleEditPost = (id) => {
    setEditId(id);
    const { title, quote, author } = posts.find((post) => post.id === id);
    setFormData({
      title,
      quote,
      author,
    });
  };

  const handleUpdatePost = async () => {
    try {
      const updatedFormData = {
        ...formData,
      };

      const res = await fetch(`http://localhost:3000/posts?id=${editId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      const data = await res.json();
      const updatedPost = data.post;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === editId ? updatedPost : post))
      );
      setEditId(null);
      setFormData({
        title: "",
        quote: "",
        author: "",
      });
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  const handleDeletePost = async (id) => {
    const res = await fetch(`http://localhost:3000/posts?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="app">
      <NewPost
        editId={editId}
        formData={formData}
        setFormData={setFormData}
        onAddNewPost={handleAddNewPost}
        onUpdatePost={handleUpdatePost}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : posts?.length !== 0 ? (
        <PostList
          posts={posts}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          editId={editId} // Pass editId to PostList
        />
      ) : (
        <p className="no-posts">No posts to display.</p>
      )}
    </div>
  );
}

export default App;
