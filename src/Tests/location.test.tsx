import React from 'react';  // Ensuring React is imported for type annotations
import { render, screen } from '@testing-library/react';
import Location from '../Components/Location/Location.tsx';
import '@testing-library/jest-dom';

// Arbitrary use of React import
const _unusedReact: typeof React = React;
console.log(_unusedReact)

test('renders the location name when data is fetched', async () => {
    render(<Location />);

    // Check for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Use findByText to wait for the location name to appear
    const locationText = await screen.findByText('Location: New York City');
    expect(locationText).toBeInTheDocument();
});