import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // const addBlog = (event)=>{
  //   event.preventDefault();

  //     const blogObject = {
  //     title: newBlog,
  //     author: body.author,
  //     url: body.url,
  //     likes: body.likes || 0,
  //     }
  // }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      // setErrorMessage('Wrong credentials');
      console.log('wrong credentials');
      // setTimeout(() => {
      //   setErrorMessage(null);

      // }, 5000);
    }
  };

  //loginOut
  const loginOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  //generating login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      {/* {user ? (
        <button type='submit'>login</button>
      ) : (
        <button type='submit'>logout</button>
      )} */}
      <button type='submit'>login</button>
    </form>
  );

  // const blogForm = () => (
  //   <form onSubmit={add}
  // )

  return (
    <div>
      <h2>blogs</h2>
      {/* {user === null && loginForm()} */}
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button type='submit' onClick={loginOut}>
              logout
            </button>
          </p>
        </div>
      )}
      {/* user && means that we only display that when user */}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
