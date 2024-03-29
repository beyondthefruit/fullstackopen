import { useState } from 'react';

const Blog = ({ blog, blogs, updateLike, deleteBlogPost, user }) => {
  const [blogDetail, setBlogDetail] = useState(null);
  // const [userPoster, setUserPoster] = useState('root');
  const { title, author, likes, url, id } = blog;

  // console.log(blogs);
  // // console.log(blogs.user);
  // console.log(user);
  // console.log(blog.user);

  // const userName = (e) => {
  //   if (e === '643ccad1fbea2971c91c27ec') {
  //     return 'root';
  //   }
  // };

  // const userNamed = (e) => {
  //   user.find((useri) => {
  //     console.log(blogs.user);
  //     console.log(useri);
  //     const nam = useri.id == e;
  //     console.log(nam.username);
  //     console.log(nam);
  //     return nam.username;
  //   });
  // };

  // userNamed('643ccad1fbea2971c91c27ecx');
  // const test = () => {
  //   blogs.user.find((b) => {
  //     b.id === '643ccad1fbea2971c91c27ec';
  //     return b.username;
  //   });
  // };
  // const test = blogs.find((b) => b.user.id === '643ccad1fbea2971c91c27ec');
  // console.log(test);

  // const userName = (e) => {
  //   // console.log(blogs);
  //   // console.log(blogs.user.find((useri) => useri.id === e));
  //   console.log(blogs);
  //   console.log(blogs.user.find((useri) => useri.id === e));
  // };

  // const person = blogs.user.filter((e) => {
  //   return user === e.id;
  // });
  // const post = () => {
  //   setUserPoster(user);
  //   return userPoster;
  // };

  // setUserPoster(blog.user?.username);

  const blogStyle = {
    paddingTop: '1rem',
    paddingLeft: '1rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '0.5rem',
  };

  const introStyle = {
    padding: '0 5px',
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
    <div className='bloup'>
      <div style={blogStyle}>
        <span style={introStyle}>{title}</span>
        <span style={introStyle}>{author}</span>

        <button style={blogBtnStyle} onClick={() => setBlogDetail(!blogDetail)}>
          {!blogDetail ? 'view' : 'hide'}
        </button>
      </div>
      {blogDetail && (
        <div style={blogExtraStyle}>
          {/* <p>author: {author}</p> */}
          <p>link {url}</p>
          <p>
            likes: {likes}{' '}
            <button onClick={() => updateLike(id)}>Like it</button>
          </p>
          <p>
            user:
            {blog.user?.username || blog.user}
          </p>
          {console.log(user)}
          {/* means that we only display remove when user is also the creator */}
          {user.username === blog.user?.username && (
            <button onClick={() => deleteBlogPost(id, title)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
