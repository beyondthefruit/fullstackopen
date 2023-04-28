import { useState } from 'react';
const Blog = ({ blog }) => {
  const [blogDetail, setBlogDetail] = useState(null);
  const { title, author, likes, url } = blog;

  const blogStyle = {
    paddingTop: '1rem',
    paddingLeft: '1rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '0.5rem',
  };

  const blogBtnStyle = {
    backgroundColor: 'grey',
    color: 'white',
    margin: '0.5rem',
  };
  const blogExtraStyle = {
    paddingLeft: '1rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '0.5rem',
  };
  return (
    <div>
      <div style={blogStyle}>
        {title}
        <button style={blogBtnStyle} onClick={() => setBlogDetail(!blogDetail)}>
          {!blogDetail ? 'view' : 'hide'}
        </button>
      </div>
      {blogDetail && (
        <div style={blogExtraStyle}>
          <p>{author}</p>
          <p>link: {url}</p>
          <p>
            likes: {likes} <button>Like</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
