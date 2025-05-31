import React from "react";
import Dates from "./Dates";

describe("<Dates />", () => {
  it("renders both createdAt and updatedAt correctly", () => {
    cy.mount(<Dates createdAt="2025-05-30T08:00:00Z" updatedAt="2025-05-30T12:30:00Z" />);
    cy.get("#created_at_date").contains("May 30, 2025").should("exist");
    cy.get("#updated_at_date").contains("May 30, 2025").should("exist");
  });

  it("shows '-' for missing createdAt", () => {
    cy.mount(<Dates updatedAt="2025-05-30T12:30:00Z" />);
    cy.get("#created_at_date").contains("-").should("exist");
    cy.get("#updated_at_date").contains("May 30, 2025").should("exist");
  });

  it("shows '-' for missing updatedAt", () => {
    cy.mount(<Dates createdAt="2025-05-30T08:00:00Z" />);
    cy.get("#created_at_date").contains("May 30, 2025").should("exist");
    cy.get("#updated_at_date").contains("-").should("exist");
  });

  it("shows '-' for both createdAt and updatedAt missing", () => {
    cy.mount(<Dates />);
    cy.get("#created_at_date").contains("-").should("exist");
    cy.get("#updated_at_date").contains("-").should("exist");
  });
});
