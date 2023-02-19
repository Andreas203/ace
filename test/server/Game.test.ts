import { Game } from "../../src/server/Game";

test('test game increment from 0-0', () => {
    var underTest = new Game()

    underTest.incPoint(0)

    var expectedGame = [15,0]

    expect(underTest.points).toStrictEqual(expectedGame);
});

test('test game increment from 30-0', () => {
    var underTest = new Game()
    underTest.points = [30,0]

    underTest.incPoint(0)

    var expectedGame = [40,0]

    expect(underTest.points).toStrictEqual(expectedGame);
});

test('test game increment from 40-40', () => {
    var underTest = new Game()
    underTest.points = [40,40]

    underTest.incPoint(0)

    var expectedGame = [40.5,40]

    expect(underTest.points).toStrictEqual(expectedGame);
});

test('test game increment from 40-40.5', () => {
    var underTest = new Game()
    underTest.points = [40,40.5]

    underTest.incPoint(0)

    var expectedGame = [40,40]

    expect(underTest.points).toStrictEqual(expectedGame);
});

test('test game increment from 40.5-40', () => {
    var underTest = new Game()
    underTest.points = [40.5,40]

    underTest.incPoint(1)

    var expectedGame = [40,40]

    expect(underTest.points).toStrictEqual(expectedGame);
});

test('test game increment from 40.5-40', () => {
    var underTest = new Game()
    underTest.points = [40.5,40]

    underTest.incPoint(1)

    var expectedGame = [40,40]

    expect(underTest.points).toStrictEqual(expectedGame);
});