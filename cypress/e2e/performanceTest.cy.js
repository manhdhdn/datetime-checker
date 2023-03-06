describe("Performance testing for https://datetime-checker.onrender.com/", () => {
  it("Should load the page in under 5 seconds", () => {
    cy.intercept("GET", "/").as("getPage");
    cy.visit("https://datetime-checker.onrender.com/");

    cy.wait("@getPage").then(() => {
      cy.window().then((win) => {
        const timing = win.performance.timing;
        if (timing) {
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          cy.log(`Page load time: ${loadTime} ms`);
          expect(loadTime).to.be.lessThan(5000);
        } else {
          cy.log("Performance timing data not available");
        }
      });
    });
  });

  it("inputs values and checks result", () => {
    // visit the website
    cy.visit("https://datetime-checker.onrender.com/");

    // measure the time it takes to load the page
    cy.window().then((win) => {
      cy.clock();
      win.performance.mark("start");

      // input values in the day, month, and year fields
      cy.get("#txtDay").type("05");
      cy.get("#txtMonth").type("03");
      cy.get("#txtYear").type("2023");

      // click the check button
      cy.get("#btCheck").click();

      // verify that the result is visible in the <p></p> element
      cy.get("#lblResult").should("have.text", "Date: 05/03/2023 is valid.");

      // measure the time it takes to get the result
      win.performance.mark("end");
      win.performance.measure("loadingTime", "start", "end");
      const measures = win.performance.getEntriesByName("loadingTime");
      if (measures.length > 0) {
        const measure = measures[0];
        cy.log(`Time to get result: ${measure.duration}ms`);
      } else {
        cy.log("Failed to measure loading time");
      }
    });
  });
});
