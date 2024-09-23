import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import "./NewPost.css";

function NewPost({
  formData,
  setFormData,
  onAddNewPost,
  editId,
  onUpdatePost,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "quote") {
      // Check if the value starts and ends with quotation marks
      const trimmedValue = value.trim();
      if (trimmedValue.startsWith('"')) {
        newValue = trimmedValue.slice(1);
      }
      if (trimmedValue.endsWith('"')) {
        newValue = trimmedValue.slice(0, -1);
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    editId ? onUpdatePost() : onAddNewPost();
  }

  return (
    <div className="newpost">
      <h3>Post your favourite Quote here!</h3>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={formData.title}
        />
        <TextArea
          required={true}
          placeholder="Quote..."
          onChange={handleChange}
          name="quote"
          value={formData.quote}
        />
        <Input
          placeholder="Author"
          onChange={handleChange}
          name="author"
          value={formData.author}
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
}

export default NewPost;
