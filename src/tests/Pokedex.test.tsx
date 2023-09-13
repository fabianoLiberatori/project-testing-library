import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.tsx />', () => {
  const pokType = 'pokemon-type';

  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />, { route: '/' });
    const textHeading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(textHeading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />, { route: '/' });
    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();
    await userEvent.click(buttonNext);

    const pikachuAgain = screen.getByText(/pikachu/i);
    expect(pikachuAgain).toBeInTheDocument();

    const showOnePokemon = screen.getAllByText(/pikachu/i);
    expect(showOnePokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', async () => {
    renderWithRouter(<App />, { route: '/' });

    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const allBtn = screen.getByRole('button', { name: /all/i });

    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilter).toHaveLength(7);

    // btnFilter  / 0 = eletric / 1 = fire / 2 = bug / 3 = poison / 4 = psychic / 5 = normal / 6 = dragon

    await userEvent.click(btnFilter[0]);
    const pikachu = screen.getByText(/pikachu/i);
    const eletric = screen.getByTestId(pokType);

    expect(pikachu).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(eletric.textContent).toEqual(btnFilter[0].textContent);
    expect(buttonNext).toBeDisabled();

    await userEvent.click(btnFilter[1]);
    const charmander = screen.getByText(/charmander/i);
    const fire1 = screen.getByTestId(pokType);

    expect(charmander).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(fire1.textContent).toEqual(btnFilter[1].textContent);

    await userEvent.click(buttonNext);
    const rapidash = screen.getByText(/rapidash/i);
    const fire2 = screen.getByTestId(pokType);

    expect(rapidash).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(fire2.textContent).toEqual(btnFilter[1].textContent);

    await userEvent.click(btnFilter[2]);
    const caterpie = screen.getByText(/caterpie/i);
    const bug = screen.getByTestId(pokType);

    expect(caterpie).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(bug.textContent).toEqual(btnFilter[2].textContent);
    expect(buttonNext).toBeDisabled();

    await userEvent.click(btnFilter[3]);
    const ekans = screen.getByText(/ekans/i);
    const poison = screen.getByTestId(pokType);

    expect(ekans).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(poison.textContent).toEqual(btnFilter[3].textContent);
    expect(buttonNext).toBeDisabled();

    await userEvent.click(btnFilter[4]);
    const alakazam = screen.getByText(/alakazam/i);
    const psychic1 = screen.getByTestId(pokType);

    expect(alakazam).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(psychic1.textContent).toEqual(btnFilter[4].textContent);

    await userEvent.click(buttonNext);
    const mew = screen.getByText(/mew/i);
    const psychic2 = screen.getByTestId(pokType);

    expect(mew).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(psychic2.textContent).toEqual(btnFilter[4].textContent);

    await userEvent.click(btnFilter[5]);
    const snorlax = screen.getByText(/snorlax/i);
    const normal = screen.getByTestId(pokType);

    expect(snorlax).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(normal.textContent).toEqual(btnFilter[5].textContent);
    expect(buttonNext).toBeDisabled();

    await userEvent.click(btnFilter[6]);
    const dragonair = screen.getByText(/dragonair/i);
    const dragon = screen.getByTestId(pokType);

    expect(dragonair).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(dragon.textContent).toEqual(btnFilter[6].textContent);
    expect(buttonNext).toBeDisabled();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />, { route: '/' });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });

    await userEvent.click(buttonNext);
    await userEvent.click(allBtn);
    const pikachu = screen.getByText(/pikachu/i);
    const eletric = screen.getByTestId(pokType);

    expect(pikachu).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(allBtn.textContent).toEqual('All');
    expect(eletric.textContent).toEqual('Electric');

    await userEvent.click(buttonNext);
    const charmander = screen.getByText(/charmander/i);
    const fire = screen.getByTestId(pokType);

    expect(charmander).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(allBtn.textContent).toEqual('All');
    expect(fire.textContent).toEqual('Fire');
  });
});
