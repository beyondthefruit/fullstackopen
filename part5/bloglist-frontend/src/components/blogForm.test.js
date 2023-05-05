import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './blogForm';

describe('Blog Form tests', () => {
  it('should create the correct blog post', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm addBlog={createBlog} />);

    const inputTitle = container.querySelector('.inputTitle');
    const inputAuthor = container.querySelector('.inputAuthor');
    const inputUrl = container.querySelector('.inputUrl');
    const formButton = screen.getByText(/create/i);

    await user.type(inputTitle, 'title');
    await user.type(inputAuthor, 'author');
    await user.type(inputUrl, 'https:blog');
    await user.click(formButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('title');
    expect(createBlog.mock.calls[0][0].author).toBe('author');
    expect(createBlog.mock.calls[0][0].url).toBe('https:blog');
  });
});
