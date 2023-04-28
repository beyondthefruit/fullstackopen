import { useState } from 'react';

const NewBlogForm = ({ addBlog, setLoginVisible, loginVisible }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [newBlogLikes, setNewBlogLikes] = useState('');

  const addBlogEvent = (event) => {
    event.preventDefault();
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes || 0,
    });
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
    setNewBlogLikes('');
  };

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

  // have to use a setTimeOut to close the form or else it was closing the form before submiting
  const closeForm = () => {
    setTimeout(() => {
      setLoginVisible(!loginVisible);
    }, 500);
  };
  const blogForm = () => (
    <form onSubmit={addBlogEvent}>
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
      <button onClick={() => closeForm()} type='submit'>
        create
      </button>
    </form>
  );
  return <div>{blogForm()}</div>;
};

export default NewBlogForm;
