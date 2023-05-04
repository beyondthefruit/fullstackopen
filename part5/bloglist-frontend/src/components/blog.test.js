import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { prettyDOM, fireEvent } from '@testing-library/dom';
import Blog from './Blog';

describe('Blog component', () => {
  const blogTest = {
    title: 'Best blog ever',
    author: 'Luc ferry',
    url: 'https:luckyblog.com',
    likes: 2,
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
});
