describe("Concurrent Users Test", () => {
  it("Visits website with multiple users", () => {
    const numUsers = 100;
    const url = "https://datetime-checker.onrender.com/";
    const visits = [];

    for (let i = 0; i < numUsers; i++) {
      visits.push(cy.visit(url));
    }

    return Promise.all(visits).then(() => {
      // all users have finished their tests
    });
  });
});
