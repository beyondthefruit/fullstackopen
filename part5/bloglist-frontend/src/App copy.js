import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/blogForm';
import Notification from './components/notification';
import Error from './components/error';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [newBlogLikes, setNewBlogLikes] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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

  const timeOut = () => {
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 5000);
  };

  const addBlog = (event) => {
    event.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes || 0,
    };
    blogService.create(blogObject).then((returnedNote) => {
      setBlogs(blogs.concat(returnedNote));
      setSuccessMessage(
        `a new blog ${newBlogTitle} from ${newBlogAuthor} has been added`
      );
      timeOut();
      // setTimeout(() => {
      //   setSuccessMessage(null);
      // }, 5000);
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      setNewBlogLikes('');
    });
  };

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
      setSuccessMessage(`${user.name} is logged in`);
      timeOut();

      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or passwords');
      console.log('Wrong username or passwords');
      timeOut();
    }
  };

  //generating login form
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //       <input
  //         type='text'
  //         value={username}
  //         name='Username'
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //       <input
  //         type='password'
  //         value={password}
  //         name='Password'
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // );

  //loginOut
  const loginOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setSuccessMessage('You have logout');
    timeOut();
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
      <button type='submit'>login</button>
    </form>
  );

  return (
    <div>
      <Notification successMessage={successMessage} />
      <Error errorMessage={errorMessage} />
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
      {/* {BlogForm()} */}
      {/* means we can access our new blog creation only when user is true and loginVisible is true */}
      {user && (
        <>
          {loginVisible && (
            <>
              <NewBlogForm
                newBlogTitle={newBlogTitle}
                setNewBlogTitle={setNewBlogTitle}
                newBlogAuthor={newBlogAuthor}
                setNewBlogAuthor={setNewBlogAuthor}
                newBlogLikes={newBlogLikes}
                setNewBlogLikes={setNewBlogLikes}
                newBlogUrl={newBlogUrl}
                setNewBlogUrl={setNewBlogUrl}
                addBlog={addBlog}
                setLoginVisible={setLoginVisible}
                loginVisible={loginVisible}
              />
            </>
          )}
          <button onClick={() => setLoginVisible(!loginVisible)}>
            {loginVisible ? 'Cancel' : 'New form'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
