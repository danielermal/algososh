describe("Тестирование роутинга", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Проверка отрисовки страницы", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Переход на страницу Разворот строки", () => {
    cy.get("a[href*=recursion]").click();
    cy.contains("Строка");
    cy.get("button").contains("К оглавлению").click();
  });

  it("Переход на страницу Фибоначчи", () => {
    cy.get("a[href*=fibonacci]").click();
    cy.contains("Последовательность Фибоначчи");
    cy.get("button").contains("К оглавлению").click();
  });

  it("Переход на страницу Сортировка", () => {
    cy.get("a[href*=sorting]").click();
    cy.contains("Сортировка массива");
    cy.get("button").contains("К оглавлению").click();
  });

  it("Переход на страницу Стека", () => {
    cy.get("a[href*=stack]").click();
    cy.contains("Стек");
    cy.get("button").contains("К оглавлению").click();
  });

  it("Переход на страницу Очередь", () => {
    cy.get("a[href*=queue]").click();
    cy.contains("Очередь");
    cy.get("button").contains("К оглавлению").click();
  });

  it("Переход на страницу Список", () => {
    cy.get("a[href*=list]").click();
    cy.contains("Связный список");
    cy.get("button").contains("К оглавлению").click();
  });
});
