import { Game } from '../../main/server/game/Game.ts';

describe('Game increment from', () => {
  test('0-0', () => {
    const underTest = new Game();

    underTest.incPoint(0);

    const expectedGame = [15, 0];

    expect(underTest.points).toStrictEqual(expectedGame);
  });

  test('30-0', () => {
    const underTest = new Game();
    underTest.points = [30, 0];

    underTest.incPoint(0);

    const expectedGame = [40, 0];

    expect(underTest.points).toStrictEqual(expectedGame);
  });

  test('40-40', () => {
    const underTest = new Game();
    underTest.points = [40, 40];

    underTest.incPoint(0);

    const expectedGame = [40.5, 40];

    expect(underTest.points).toStrictEqual(expectedGame);
  });

  test('40-40.5', () => {
    const underTest = new Game();
    underTest.points = [40, 40.5];

    underTest.incPoint(0);

    const expectedGame = [40, 40];

    expect(underTest.points).toStrictEqual(expectedGame);
  });

  test('40.5-40', () => {
    const underTest = new Game();
    underTest.points = [40.5, 40];

    underTest.incPoint(1);

    const expectedGame = [40, 40];

    expect(underTest.points).toStrictEqual(expectedGame);
  });
});
