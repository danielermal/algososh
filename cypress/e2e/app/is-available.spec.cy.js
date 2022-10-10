describe("Приложение запущено", () => {
  it("переходим по адресу localhost:3000", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("МБОУ АЛГОСОШ");
  });
});
