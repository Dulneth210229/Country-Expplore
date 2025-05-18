import { render, screen } from '@testing-library/react';
import Countries from '../../pages/Countries';

test('renders Countries page', () => {
    render(<Countries />);
    const headingElement = screen.getByText(/Countries/i);
    expect(headingElement).toBeInTheDocument();
});

test('fetches and displays country data', async () => {
    render(<Countries />);
    const countryElement = await screen.findByText(/Country Name/i);
    expect(countryElement).toBeInTheDocument();
});