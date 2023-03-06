describe("Projects API", () => {
  it("Returns page 1 with 9 projects as default", () => {
    cy.request("https://voiceover-rental.azurewebsites.net/api/projects")
      .its("status")
      .should("equal", 200);

    cy.request("https://voiceover-rental.azurewebsites.net/api/projects")
      .its("body")
      .should("have.property", "pageIndex")
      .and("equal", 1)

    cy.request("https://voiceover-rental.azurewebsites.net/api/projects")
      .its("body")
      .should("have.property", "data")
      .and("be.an", "array")
      .and("have.length", 9);
  });

  it("Returns page 2 with 6 projects each page", () => {
    cy.request("https://voiceover-rental.azurewebsites.net/api/projects")
      .its("status")
      .should("equal", 200);

    cy.request(
      "https://voiceover-rental.azurewebsites.net/api/projects?pageIndex=2&pageSize=6"
    )
      .its("body")
      .should("have.property", "pageIndex")
      .and("equal", 2);

    cy.request(
      "https://voiceover-rental.azurewebsites.net/api/projects?pageIndex=2&pageSize=6"
    )
      .its("body")
      .should("have.property", "data")
      .and("be.an", "array")
      .and("have.length", 6);
  });
});
