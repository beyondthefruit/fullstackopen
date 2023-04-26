const NewBlogForm = ({
  newBlogTitle,
  setNewBlogUrl,
  setNewBlogTitle,
  setNewBlogLikes,
  setNewBlogAuthor,
  newBlogAuthor,
  newBlogLikes,
  newBlogUrl,
  addBlog,
}) => {
  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };
  const handleLikesChange = (event) => {
    setNewBlogLikes(event.target.value);
  };
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newBlogTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newBlogAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url:
        <input value={newBlogUrl} onChange={handleUrlChange} />
      </div>
      <div>
        Likes:
        <input value={newBlogLikes} onChange={handleLikesChange} />
      </div>
      <button type='submit'>save</button>
    </form>
  );
  return <div>{blogForm()}</div>;
};

export default NewBlogForm;
