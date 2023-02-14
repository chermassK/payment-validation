describe("Number input", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1000, 1000);
  });
  it("TC01 - when input is noting should show error massage", () => {
    cy.get("#number-input").click();
    cy.get("#name-input").click();
    cy.get("#number-input-error").should("have.text", "Invalid Card Number");
  });

  it("TC02 - when input is not a number of 16 digits should show error massage", () => {
    cy.get("#number-input").click().type("123456");
    cy.get("#name-input").click();
    cy.get("#number-input-error").should("have.text", "Invalid Card Number");
  });

  it("TC03 - when input is charater should show error massage", () => {
    cy.get("#number-input").click().type("ABCD");
    cy.get("#name-input").click();
    cy.get("#number-input-error").should("have.text", "Invalid Card Number");
  });

  it("TC04 - when input is mix of charater and number value should show error massage", () => {
    cy.get("#number-input").click().type("123ABC2");
    cy.get("#name-input").click();
    cy.get("#number-input-error").should("have.text", "Invalid Card Number");
  });
});

describe("Cardholder Name input", () => {
  beforeEach(() => {
    cy.visit("/");
     cy.viewport(1000, 1000);
  });
  it("TC01 - when input is noting should show error massage", () => {
    cy.get("#name-input").click();
    cy.get("#month-input").click();
    cy.get("#name-input-error").should("have.text", "Invalid Cardholder Name");
  });

  it("TC02 - when input is a number should show error massage", () => {
    cy.get("#name-input").click().type("123456");
    cy.get("#month-input").click();
    cy.get("#name-input-error").should("have.text", "Invalid Cardholder Name");
  });

  it("TC04 - when input is mix of charater and number value should show error massage", () => {
    cy.get("#name-input").click().type("123ABC2");
    cy.get("#month-input").click();
    cy.get("#name-input-error").should("have.text", "Invalid Cardholder Name");
  });
});

describe("Month input", () => {
  beforeEach(() => {
    cy.visit("/");
     cy.viewport(1000, 1000);
  });

  it("TC01 - when input only one number show error massage", () => {
    cy.get("#month-input").click().type("5");
    cy.get("#month-input").should("have.value", "05");
  });

  it("TC02 - when input is noting should show error massage", () => {
    cy.get("#month-input").click();
    cy.get("#year-input").click();
    cy.get("#month-input-error").should("have.text", "Invalid Month");
  });

  it("TC03 - when input is a number more than 2 digits should show error massage", () => {
    cy.get("#month-input").click().type("123456");
    cy.get("#year-input").click();
    cy.get("#month-input-error").should("have.text", "Invalid Month");
  });
});

describe("Year input", () => {
  beforeEach(() => {
    cy.visit("/");
     cy.viewport(1000, 1000);
  });

  it("TC01 - when input only one number show error massage", () => {
    cy.get("#year-input").click().type("5");
    cy.get("#year-input").should("have.value", "0005");
  });

  it("TC02 - when input is noting should show error massage", () => {
    cy.get("#year-input").click();
    cy.get("#cvv-input").click();
    cy.get("#year-input-error").should("have.text", "Invalid Year");
  });

  it("TC03 - when input is a number more than 2 digits should show error massage", () => {
    cy.get("#year-input").click().type("123456");
    cy.get("#cvv-input").click();
    cy.get("#year-input-error").should("have.text", "Invalid Year");
  });

  it("TC04 - when input is not greater than or equal to current year", () => {
    cy.get("#year-input").click().type("2000");
    cy.get("#cvv-input").click();
    cy.get("#year-input-error").should("have.text", "Invalid Year");
  });
});

describe("CVV/CVC input", () => {
  beforeEach(() => {
    cy.visit("/");
     cy.viewport(1000, 1000);
  });

  it("TC01 - when input only one number show error massage", () => {
    cy.get("#cvv-input").click().type("5");
    cy.get("#cvv-input").should("have.value", "005");
  });

  it("TC01 - when input two number show error massage", () => {
    cy.get("#cvv-input").click().type("25");
    cy.get("#cvv-input").should("have.value", "025");
  });

  it("TC02 - when input is noting should show error massage", () => {
    cy.get("#cvv-input").click();
    cy.get("#year-input").click();
    cy.get("#cvv-input-error").should("have.text", "Invalid CVV/CVC");
  });

  it("TC03 - when input is a number more than 2 digits should show error massage", () => {
    cy.get("#cvv-input").click().type("123456");
    cy.get("#year-input").click();
    cy.get("#cvv-input-error").should("have.text", "Invalid CVV/CVC");
  });
});

describe("submit-button", () => {
  beforeEach(() => {
    cy.visit("/");
     cy.viewport(1000, 1000);
  });

  it("TC01 - when all input valid", () => {
    cy.get("#number-input").click().type("1111222233334444");
    cy.get("#name-input").click().type("name ABC");
    cy.get("#month-input").click().type("7");
    cy.get("#year-input").click().type("2023");
    cy.get("#cvv-input").click().type("123");

    cy.get("#submit-button").should("be.enable");
  });
});
