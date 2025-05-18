const { render, screen, fireEvent } = require('@testing-library/react');
const SearchAndFilter = require('../../components/SearchAndFilter');

test('renders SearchAndFilter component', () => {
    render(<SearchAndFilter />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
});

test('filters results based on input', () => {
    const mockData = ['Apple', 'Banana', 'Cherry'];
    render(<SearchAndFilter data={mockData} />);
    
    const inputElement = screen.getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: 'Ban' } });
    
    const filteredItem = screen.getByText(/Banana/i);
    expect(filteredItem).toBeInTheDocument();
    
    const nonExistentItem = screen.queryByText(/Apple/i);
    expect(nonExistentItem).not.toBeInTheDocument();
});