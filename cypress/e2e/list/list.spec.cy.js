describe("Тестирование Списка", () => {
  before(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Проверка кнопок", () => {
    cy.get("input[name='list']").should("have.value", "");
    cy.get("input[name='index']").should("have.value", "");
    cy.get("button").contains("Добавить в head").parent().should("be.disabled");
    cy.get("button").contains("Добавить в tail").parent().should("be.disabled");
    cy.get("button")
      .contains("Добавить по индексу")
      .parent()
      .should("be.disabled");
    cy.get("button")
      .contains("Удалить по индексу")
      .parent()
      .should("be.disabled");
  });

  it("Проверка отрисовки дефолтного списка", () => {
    cy.get('[data-testid="circle"]').should((circles) => {
      expect(circles).to.have.length(4);
      expect(circles.eq(0)).to.contain("0");
      expect(circles.eq(1)).to.contain("34");
      expect(circles.eq(2)).to.contain("8");
      expect(circles.eq(3)).to.contain("1");
    });
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle-box"]').should((item) => {
      expect(item.eq(0)).to.contain("head");
      expect(item.eq(3)).to.contain("tail");
    });
  });

  it("Проверка добавления элемента в head", () => {
    cy.clock();
    cy.get("input[name='list']").type("2");
    cy.get("button").contains("Добавить в head").click();
    cy.get('[data-testid="circle-box"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("2")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("2");
    cy.get('[data-testid="circle-box"]').eq(0).contains("head");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("2");
  });

  it("Проверка добавления элемиента в tail", () => {
    cy.clock();
    cy.get("input[name='list']").type("3");
    cy.get("button").contains("Добавить в tail").click();
    cy.get('[data-testid="circle-box"]')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("3")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(5)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("3");
    cy.get('[data-testid="circle-box"]').eq(5).contains("tail");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(5)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("3");
  });

  it("Проверка добавления элемента по индексу", () => {
    cy.clock();
    cy.get("input[name='list']").type("4");
    cy.get("input[name='index']").type("2");
    cy.get("button").contains("Добавить по индексу").click();
    cy.tick(500);
    cy.get('[data-testid="circle-box"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("4")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="circle-box"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("4")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="circle-box"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("4")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("2");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("0");
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("4");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("4");
    cy.get('[data-testid="circle-box"]').eq(2).contains("2");
  });

  it("Проверка удаления элемента из head", () => {
    cy.clock();
    cy.get("button").contains("Удалить из head").click();
    cy.get('[data-testid="circle-box"]')
      .eq(0)
      .contains("head")
      .parent()
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("2")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle-box"]').eq(0).contains("head");
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("0");
  });

  it("Проверка удаления элемента из tail", () => {
    cy.clock();
    cy.get("button").contains("Удалить из tail").click();
    cy.get('[data-testid="circle-box"]')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("3")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle-box"]').eq(4).contains("tail");
    cy.get('[data-testid="circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
  });

  it("Проверка удаления элемента по индексу", () => {
    cy.clock();
    cy.get("input[name='index']").type("2");
    cy.get("button").contains("Удалить по индексу").click();
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.tick(1000);
    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("34")
      .should("not.exist");
    cy.get('[data-testid="circle-box"]')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="circle"]')
          .contains("34")
          .parent()
          .should("have.css", "border-color", "rgb(210, 82, 225)");
      });
    cy.tick(1000);
    cy.get('[data-testid="circle"]').contains("34").should("not.exist");
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });
});
