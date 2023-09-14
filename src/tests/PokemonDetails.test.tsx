import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  const routePikachu = '/pokemon/25';

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: routePikachu });
    const pikachu = screen.getByRole('heading', { name: /Pikachu Details/i });
    const summary = screen.getByRole('heading', { name: /Summary/i });
    const textSummary = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i,
    );
    expect(pikachu).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: routePikachu });
    const gameLocations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    const imgsLocations = screen.getAllByAltText('Pikachu location');
    const textLocation1 = screen.getByText(/Kanto Viridian Forest/i);
    const textLocation2 = screen.getByText(/Kanto Power Plant/i);

    expect(gameLocations).toBeInTheDocument();
    expect(textLocation1).toBeInTheDocument();
    expect(textLocation2).toBeInTheDocument();
    expect(imgsLocations).toHaveLength(2);
    expect(imgsLocations[0].getAttribute('src'))
      .toEqual('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocations[1].getAttribute('src'))
      .toEqual('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />, { route: routePikachu });
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    await userEvent.click(favorite);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar.getAttribute('src')).toEqual('/star-icon.png');
  });
  test('', () => {});
});
