import React from 'react';
// import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Login from './login';

describe('Header', () => {
  it('should display Login', () => {
    render(<Login />);
    const LoginTitle = screen.getByText(/login/i);
    expect(LoginTitle).toBeInTheDocument();
  });
});
