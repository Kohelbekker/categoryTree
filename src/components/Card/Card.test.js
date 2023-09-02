import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    const childElement = screen.getByText('Test Content');
    expect(childElement).toBeInTheDocument();
  });
});
