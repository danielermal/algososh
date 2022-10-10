describe("Тестирование Очереди", () => {
  before(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("Проверка кнопки", () => {
    const input = cy.get("input[name='queue']");
    input.should("have.value", "");
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
    cy.get('[data-testid="circle"]').should("have.length", 7);
  });

  it("Проверка добавления элемента", () => {
    cy.clock();
    const input = cy.get("input[name='queue']");
    input.type("1");
    const addButton = cy.get("button").contains("Добавить").parent();
    addButton.click();
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("1");
    cy.get('[data-testid="circle-box"]')
      .eq(0)
      .contains("head")
      .parent()
      .contains("tail");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
    input.type("2");
    addButton.click();
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("2");
    cy.get('[data-testid="circle-box"]').eq(1).contains("tail");
    cy.get('[data-testid="circle-box"]').eq(0).contains("head");
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
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("1");
    cy.get('[data-testid="circle-box"]').eq(0).contains("head");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle-box"]')
      .eq(1)
      .contains("head")
      .parent()
      .contains("tail");
    deleteButton.click();
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("2");
    cy.get('[data-testid="circle-box"]')
      .eq(1)
      .contains("head")
      .parent()
      .contains("tail");
    cy.tick(500);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("2")
      .should("not.exist");
    cy.get('[data-testid="circle-box"]')
      .contains(/tail|head/)
      .should("not.exist");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
  });

  it("Проверка очистки очереди", () => {
    const input = cy.get("input[name='queue']");
    input.type("1");
    const addButton = cy.get("button").contains("Добавить").parent();
    addButton.click();
    input.type("2");
    addButton.click();
    input.type("3");
    addButton.click();
    cy.get("button").contains("Очистить").click();
    cy.get('[data-testid="circle-box"]')
      .contains(/tail|head/)
      .should("not.exist");
    cy.get('[data-testid="circle"]').contains(/1|2|3/).should("not.exist");
    cy.get("button").contains("Добавить").parent().should("be.disabled");
    cy.get("button").contains("Удалить").parent().should("be.disabled");
    cy.get("button").contains("Очистить").parent().should("be.disabled");
  });
});
