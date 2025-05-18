const { render, screen } = require('@testing-library/react');
const { FavoritesContextProvider } = require('../../context/FavoritesContext');
const FavoritesContext = require('../../context/FavoritesContext');

describe('FavoritesContext', () => {
    test('should provide initial state', () => {
        render(
            <FavoritesContextProvider>
                <FavoritesContext.Consumer>
                    {value => <div>{JSON.stringify(value)}</div>}
                </FavoritesContext.Consumer>
            </FavoritesContextProvider>
        );
        expect(screen.getByText(/initial state/i)).toBeInTheDocument();
    });

    test('should update favorites', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => {
            result.current.addFavorite('Country A');
        });
        expect(result.current.favorites).toContain('Country A');
    });
});