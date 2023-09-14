import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.tsx />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });
    const pikachu = screen.getByTestId('pokemon-name');
    const eletric = screen.getByTestId('pokemon-type');
    const peso = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByAltText(/pikachu sprite/i);

    expect(pikachu.textContent).toEqual('Pikachu');
    expect(eletric.textContent).toEqual('Electric');
    expect(peso.textContent).toEqual('Average weight: 6.0 kg');
    expect(imgPokemon.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });
    const pikachu = screen.getByTestId('pokemon-name');
    const linkDetails = screen.getByRole('link', { name: /More details/i });

    expect(pikachu.textContent).toEqual('Pikachu');
    expect(linkDetails).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se, ao clicar no link, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    renderWithRouter(<App />, { route: '/' });
    const linkDetails = screen.getByRole('link', { name: /More details/i });

    await userEvent.click(linkDetails);

    const summary = screen.getByRole('heading', { name: /Summary/i });
    const textSummary = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i,
    );
    const gameLocations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    const imgsLocations = screen.getAllByAltText('Pikachu location');
    const textLocation1 = screen.getByText(/Kanto Viridian Forest/i);
    const textLocation2 = screen.getByText(/Kanto Power Plant/i);

    expect(summary).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
    expect(gameLocations).toBeInTheDocument();
    expect(textLocation1).toBeInTheDocument();
    expect(textLocation2).toBeInTheDocument();
    expect(imgsLocations).toHaveLength(2);
    expect(imgsLocations[0].getAttribute('src'))
      .toEqual('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocations[1].getAttribute('src'))
      .toEqual('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', async () => {
    renderWithRouter(<App />, { route: '/' });
    const linkDetails = screen.getByRole('link', { name: /More details/i });

    await userEvent.click(linkDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    await userEvent.click(favorite);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar.getAttribute('src')).toEqual('/star-icon.png');
  });
});
