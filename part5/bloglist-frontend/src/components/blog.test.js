import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog component tests', () => {
  const blogTest = {
    title: 'Best blog ever',
    author: 'Luc ferry',
    url: 'https:luckyblog.com',
    likes: 2,
  };
  const user = {
    username: 'leo',
  };

  it('should render the blog title', () => {
    //practising test by using two methods
    const { container } = render(<Blog blog={blogTest} />);
    const blogBloup = container.querySelector('.bloup');
    expect(blogBloup).toHaveTextContent('Best blog ever');
    const element = screen.getByText(/luc ferry/i);
    expect(element).toBeDefined();

    // expect(blogBloup).toHaveTextContent('Luc');
    expect(screen.queryByText('https:luckyblog.com')).not.toBeInTheDocument();
    expect(screen.queryByText('likes')).not.toBeInTheDocument();
    // expect(blogBloup).not.toHaveStyle('blogStyle');
  });

  it('should display the blog url and likes after clicking on button', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blogTest} setBlogDetail={mockHandler} user={user} />);
    const button = screen.getByRole('button', { name: /view/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    expect(screen.getByText(/https:luckyblog.com/i)).toBeInTheDocument();
    // regex to check a number
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });
  it('should received props twice if like button is clicked twice', async () => {
    const mockHandler = jest.fn();
    const mockLike = jest.fn();
    render(
      <Blog
        blog={blogTest}
        updateLike={mockLike}
        setBlogDetail={mockHandler}
        user={user}
      />
    );
    // first we have to click on the view btn
    const button = screen.getByRole('button', { name: /view/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    // then we have to click on the like btn
    const buttonLike = screen.getByRole('button', { name: /like it/i });
    expect(buttonLike).toBeInTheDocument();
    await userEvent.click(buttonLike);
    await userEvent.click(buttonLike);
    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
