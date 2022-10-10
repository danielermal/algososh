describe("Тестирование разворота строки", () => {
  before(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Проверка кнопки", () => {
    cy.get("form").within(() => {
      const input = cy.get("input[name='string']");
      const button = cy.get("button");
      input.should("have.value", "");
      button.should("be.disabled");
    });
  });

  it("Проверка разворота строки", () => {
    cy.clock();
    cy.get("form").within(() => {
      const input = cy.get("input[name='string']");
      const button = cy.get("button");
      input.type("тест1");
      button.click();
    });
    cy.get('[data-testid="circle"]').should("have.length", 5);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("т");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("е");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("с");
    cy.get('[data-testid="circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("т");
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
    cy.tick(2000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("1");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("е");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("с");
    cy.get('[data-testid="circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("т");
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("т");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("1");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("т");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("с");
    cy.get('[data-testid="circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("е");
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("т");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("1");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("т");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("с");
    cy.get('[data-testid="circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("е");
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("т");
  });
});
