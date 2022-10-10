describe("Тестирование Стека", () => {
  before(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("Проверка кнопки", () => {
    cy.get("form").within(() => {
      const input = cy.get("input[name='stack']");
      cy.get("button").should("have.length", 3);
      input.should("have.value", "");
      cy.get("button").contains("Добавить").parent().should("be.disabled");
      cy.get("button").contains("Удалить").parent().should("be.disabled");
      cy.get("button").contains("Очистить").parent().should("be.disabled");
    });
  });
  it("Проверка добавления элемента", () => {
    cy.clock();
    cy.get("form").within(() => {
      const input = cy.get("input[name='stack']");
      cy.get("button").should("have.length", 3);
      input.type("1");
      const addButton = cy.get("button").contains("Добавить");
      addButton.click();
    });
    cy.get('[data-testid="circle"]')
      .should("have.length", 1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("1");
    cy.get('[data-testid="circle-box"]')
      .should("have.length", 1)
      .contains("top");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
    const addButton = cy.get("button").contains("Добавить").parent();
    addButton.should("be.disabled");
    cy.get("input[name='stack']").type("2");
    addButton.click();
    cy.get('[data-testid="circle"]')
      .should("have.length", 2)
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("2");
    cy.get('[data-testid="circle-box"]')
      .should("have.length", 2)
      .eq(1)
      .contains("top");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("2");
  });

  it("Проверка удаления элемента", () => {
    cy.clock();
    const deleteButton = cy.get("button").contains("Удалить").parent();
    deleteButton.click();
    cy.get('[data-testid="circle"]')
      .should("have.length", 2)
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("2");
    cy.get('[data-testid="circle-box"]')
      .should("have.length", 2)
      .eq(1)
      .contains("top");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .should("have.length", 1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
    cy.get('[data-testid="circle-box"]')
      .should("have.length", 1)
      .contains("top");
  });

  it("Проверка очистки стека", () => {
    cy.get("input[name='stack']").type("3");
    cy.get("button").contains("Добавить").click();
    cy.get("button").contains("Очистить").click();
    cy.get('[data-testid="circle"]').should("have.length", 0);
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
    cy.get("input[name='stack']").should("have.value", "");
  });
});
