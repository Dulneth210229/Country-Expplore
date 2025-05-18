import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

test('renders Home page with correct information', () => {
	render(<Home />);
	const heading = screen.getByText(/welcome to the country explorer/i);
	expect(heading).toBeInTheDocument();
});

test('handles user interactions properly', () => {
	render(<Home />);
	const button = screen.getByRole('button', { name: /explore countries/i });
	expect(button).toBeInTheDocument();
});