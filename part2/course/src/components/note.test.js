import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './note';
describe('Note component', () => {
  const note = [
    {
      content: 'Component testing is done with react-testing-library',
      important: true,
    },
  ];

  test('renders content', () => {
    render(<Note notesToShow={note} />);
    screen.debug();
    const element = screen.getByText(
      'Component testing is done with react-testing-library'
    );
    expect(element).toBeDefined();
  });
  test('renders content other way', () => {
    const { container } = render(<Note notesToShow={note} />);
    const div = container.querySelector('.note');
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    );
  });

  test('clicking the button calls event handler once', async () => {
    const mockHandler = jest.fn();

    render(<Note notesToShow={note} toggleImportanceOf={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('make not important');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
