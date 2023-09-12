import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.tsx />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const textAbout = screen.getByRole('heading', { name: /What does this app do?/i });
    expect(textAbout).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(headingAbout).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const text1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon./i,
    );
    expect(text1).toBeInTheDocument();
    const text2 = screen.getByText(
      /One can filter Pokémon by type, and see more details for each one of them./i,
    );
    expect(text2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgAbout = screen.getByAltText(/Pokédex/i);

    expect(imgAbout.getAttribute('src')).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
