import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.tsx />', () => {
  test('este se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });
  test('Teste se a pagina tem um texto abaixo do Page Request Not Found', () => {
    renderWithRouter(<NotFound />);
    const textInPageNotFound1 = screen.getByText(/This page was not found!/i);
    expect(textInPageNotFound1).toBeInTheDocument();
    const textInPageNotFound2 = screen.getByText(/But don't worry, this has nothing to do with Team Rocket!/i);
    expect(textInPageNotFound2).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);
    expect(imgNotFound.getAttribute('src')).toBe('/404.gif');
  });
});
