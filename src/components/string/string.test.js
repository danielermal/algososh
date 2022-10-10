import { reverseString } from "./utils";

describe("Тестирование алгоритма разворота строки", () => {
  test("с чётным количеством символов", () => {
    const reverse = reverseString("тест")
    expect(reverse).toBe('тсет')
  });

  test("с нечётным количеством символов", () => {
    const reverse = reverseString("тест1")
    expect(reverse).toBe('1тсет')
  });

  test("с одним символом", () => {
    const reverse = reverseString("1")
    expect(reverse).toBe('1')
  });

  test("пустая строка", () => {
    const reverse = reverseString("")
    expect(reverse).toBe("")
  })
});
