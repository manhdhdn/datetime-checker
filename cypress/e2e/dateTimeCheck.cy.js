describe("Date Time Checker", () => {
  beforeEach(() => {
    cy.visit("https://datetime-checker.onrender.com/");
  });

  it("checks the input fields are present", () => {
    cy.get("#txtDay").should("be.visible");
    cy.get("#txtMonth").should("be.visible");
    cy.get("#txtYear").should("be.visible");
  });

  it("checks if the input field works", () => {
    cy.get("#txtDay").type("12");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("#txtDay").should("have.value", "12");
    cy.get("#txtMonth").should("have.value", "01");
    cy.get("#txtYear").should("have.value", "2022");
  });

  it("checks if the clear button works", () => {
    cy.get("#txtDay").type("12");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Clear").click();
    cy.get("#txtDay").should("have.value", "");
    cy.get("#txtMonth").should("have.value", "");
    cy.get("#txtYear").should("have.value", "");
  });

  //checks if the "Check" button works
  it("checks if the check button works", () => {
    cy.get("#txtDay").type("12");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "12/01/2022");
  })
  

  //checks Check button works when all fields are empty
  it("checks submit button works when all fields are empty", () => {
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Please fill all the fields.");
  });

  //checks Check button works when txtDay field is empty
  it("checks submit button works when txtDay field is empty", () => {
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Please fill all the fields.");
  });

  //checks Check button works when txtMonth field is empty
  it("checks submit button works when txtMonth field is empty", () => {
    cy.get("#txtDay").type("12");

    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Please fill all the fields.");
  });

  //checks Check button works when txtYear field is empty
  it("checks submit button works when txtYear field is empty", () => {
    cy.get("#txtDay").type("12");
    cy.get("#txtMonth").type("01");

    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Please fill all the fields.");
  });

  //checks if the fields do not accept non numeric values
  it("checks if the fields do not accept non numeric values", () => {
    cy.get("#txtDay").type("a");
    cy.get("#txtMonth").type("b");
    cy.get("#txtYear").type("c");
    cy.get("#txtDay").should("have.value", "");
    cy.get("#txtMonth").should("have.value", "");
    cy.get("#txtYear").should("have.value", "");
  });

  it("checks if the date check function works", () => {
    cy.get("#txtDay").type("12");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 12/01/2022 is valid.");
  });

  it("checks if the date check function works", () => {
    cy.get("#txtDay").type("33");
    cy.get("#txtMonth").type("02");
    cy.get("#txtYear").type("2023");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 33/02/2023 is invalid.");
  });

//check non integer numbers
  it("checks non integer numbers", () => {
    cy.get("#txtDay").type("55.77");
    cy.get("#txtMonth").type("45.66");
    cy.get("#txtYear").type("2022.33");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "You can only input integer values.");
  })

  it("checks for txtDay lower bound of 1", () => {
    cy.get("#txtDay").type("0");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 00/01/2022 is invalid.");
  });

  it("checks for leap year", () => {
    cy.get("#txtDay").type("29");
    cy.get("#txtMonth").type("02");
    cy.get("#txtYear").type("2024");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 29/02/2024 is valid.");
  });

  it("checks for non-leap year", () => {
    cy.get("#txtDay").type("29");
    cy.get("#txtMonth").type("02");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 29/02/2022 is invalid.");
  });

  it("checks for an invalid leap year", () => {
    cy.get("#txtDay").type("30");
    cy.get("#txtMonth").type("02");
    cy.get("#txtYear").type("2020");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 30/02/2020 is invalid.");
  });

  it("checks for lower bound of txtMonth", () => {
    cy.get("#txtDay").type("29");
    cy.get("#txtMonth").type("0");
    cy.get("#txtYear").type("2020");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 29/00/2020 is invalid.");
  });

  it("checks for upper bound of txtMonth", () => {
    cy.get("#txtDay").type("29");
    cy.get("#txtMonth").type("13");
    cy.get("#txtYear").type("2020");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 29/13/2020 is invalid.");
  });

  it("checks txtYear lower bound of 1000", () => {
    cy.get("#txtDay").type("15");
    cy.get("#txtMonth").type("08");
    cy.get("#txtYear").type("999");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should(
      "have.text",
      "Year must be more than 999 and less than 3001."
    );
  });

  it("checks txtYear upper bound of 3000", () => {
    cy.get("#txtDay").type("15");
    cy.get("#txtMonth").type("08");
    cy.get("#txtYear").type("3001");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should(
      "have.text",
      "Year must be more than 999 and less than 3001."
    );
  });

  // txtMonth = 4
  it("checks for txtDay upper bound of 30 with txtMonth 4", () => {
    cy.get("#txtDay").type("31");
    cy.get("#txtMonth").type("04");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 31/04/2022 is invalid.");
  });

  // txtMonth = 6
  it("checks for txtDay upper bound of 30 with txtMonth 6", () => {
    cy.get("#txtDay").type("31");
    cy.get("#txtMonth").type("06");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 31/06/2022 is invalid.");
  });

  // txtMonth = 9
  it("checks for txtDay upper bound of 30 with txtMonth 9", () => {
    cy.get("#txtDay").type("31");
    cy.get("#txtMonth").type("09");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 31/09/2022 is invalid.");
  });

  // txtMonth = 11
  it("checks for txtDay upper bound of 30 with txtMonth 11", () => {
    cy.get("#txtDay").type("31");
    cy.get("#txtMonth").type("11");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 31/11/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 1", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("01");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/01/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 3", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("03");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/03/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 5", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("05");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/05/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 7", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("07");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/07/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 8", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("08");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/08/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 10", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("10");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/10/2022 is invalid.");
  });

  it("checks for txtDay upper bound of 31 with txtMonth 12", () => {
    cy.get("#txtDay").type("32");
    cy.get("#txtMonth").type("12");
    cy.get("#txtYear").type("2022");
    cy.get("button").contains("Check").click();
    cy.get("#lblResult").should("have.text", "Date: 32/12/2022 is invalid.");
  });
});
