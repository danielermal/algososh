describe("Тестирование страницы Фибоначчи", () => {
  before(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Проверка кнопки", () => {
    cy.get("form").within(() => {
      const input = cy.get("input[name='fibonacci']");
      const button = cy.get("button");
      input.should("have.value", "");
      button.should("be.disabled");
    });
  });

  it("Проверка разворота чисел Фибоначчи", () => {
    cy.clock();
    cy.get("form").within(() => {
      const input = cy.get("input[name='fibonacci']");
      const button = cy.get("button");
      input.type(7);
      button.click();
    });
    cy.tick(500);
    cy.get('[data-testid="circle"]').should("have.length", 1).contains("0");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 2)
      .eq(1)
      .contains("1");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 3)
      .eq(2)
      .contains("1");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 4)
      .eq(3)
      .contains("2");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 5)
      .eq(4)
      .contains("3");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 6)
      .eq(5)
      .contains("5");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 7)
      .eq(6)
      .contains("8");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 8)
      .eq(7)
      .contains("13");
    cy.tick(1000);
  });
});
