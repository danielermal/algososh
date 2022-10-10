import {
  selectionSortUp,
  selectionSortDown,
  bubbleSortUp,
  bubbleSortDown,
} from "./utils";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  test("Пустой массив", () => {
    const arr = [];
    const sortUp = selectionSortUp(arr);
    const sortDown = selectionSortDown(arr);
    const sortUpByBubble = bubbleSortUp(arr);
    const sortDownByBubbble = bubbleSortDown(arr);
    expect(sortDown).toBe(arr);
    expect(sortUp).toBe(arr);
    expect(sortUpByBubble).toBe(arr);
    expect(sortDownByBubbble).toBe(arr);
  });

  test("массив из одного элемента", () => {
    const arr = [1];
    const sortUp = selectionSortUp(arr);
    const sortDown = selectionSortDown(arr);
    const sortUpByBubble = bubbleSortUp(arr);
    const sortDownByBubbble = bubbleSortDown(arr);
    expect(sortDown).toBe(arr);
    expect(sortUp).toBe(arr);
    expect(sortUpByBubble).toBe(arr);
    expect(sortDownByBubbble).toBe(arr);
  });

  test("массив из нескольких элементов", () => {
    const arr = [5, 3, 8, 2, 9, 5, 1];
    const sortArrUp = [1, 2, 3, 5, 5, 8, 9];
    const sortArrDown = [9, 8, 5, 5, 3, 2, 1];
    const sortUp = selectionSortUp([...arr]);
    const sortDown = selectionSortDown([...arr]);
    const sortUpByBubble = bubbleSortUp([...arr]);
    const sortDownByBubbble = bubbleSortDown([...arr]);
    expect(JSON.stringify(sortDown)).toBe(JSON.stringify(sortArrDown));
    expect(JSON.stringify(sortUp)).toBe(JSON.stringify(sortArrUp));
    expect(JSON.stringify(sortUpByBubble)).toBe(JSON.stringify(sortArrUp));
    expect(JSON.stringify(sortDownByBubbble)).toBe(JSON.stringify(sortArrDown));
  });
});
