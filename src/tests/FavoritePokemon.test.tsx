import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao favoritar a partir da página de detalhes, teste se:', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<FavoritePokemon />, { route: '/favorites' });
    const textNoFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(textNoFavorite).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />, { route: '/' });
    const linkDetails1 = screen.getByRole('link', { name: /More details/i });
    await userEvent.click(linkDetails1);
    const FavoritePokemon1 = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    await userEvent.click(FavoritePokemon1);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    await userEvent.click(homeLink);
    const isFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await userEvent.click(favoriteLink);
    const textFavorite = screen.getByText(/Pikachu/i);
    expect(textFavorite).toBeInTheDocument();
  });
});
