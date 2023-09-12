import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('Teste se existe cada link', () => {
    renderWithRouter(<App />, { route: '/' });
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favoriteLink).toBeInTheDocument();
  });
  test(
    'Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação',
    async () => {
      renderWithRouter(<App />, { route: '/about' });
      const homeLink = screen.getByRole('link', { name: /home/i });
      await userEvent.click(homeLink);
      const textInHome = screen.getByRole('heading', { name: /Encountered Pokémon/i });
      expect(textInHome).toBeInTheDocument();
    },
  );
  test(
    'Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação',
    async () => {
      renderWithRouter(<App />, { route: '/' });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      await userEvent.click(aboutLink);
      const textInAbout = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(textInAbout).toBeInTheDocument();
    },
  );
  test(
    'Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação',
    async () => {
      renderWithRouter(<App />, { route: '/' });
      const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
      await userEvent.click(favoriteLink);
      const textInFavorite = screen.getByRole('heading', { name: /Favorite Pokémon/i });
      expect(textInFavorite).toBeInTheDocument();
    },
  );
});
