import { render, screen } from '@testing-library/react';
import Location from '../Components/Location/Location.tsx';
import '@testing-library/jest-dom';


test('renders the location name when data is fetched', async () => {
    render(<Location />);

    // Check for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Use findByText to wait for the location name to appear
    const locationText = await screen.findByText('Location: New York City');
    expect(locationText).toBeInTheDocument();
});

