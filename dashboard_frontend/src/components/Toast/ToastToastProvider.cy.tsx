import React from "react";
import { ToastProvider, showToast } from "./Toast";
import { mount } from "cypress/react"; // Assuming you use Cypress Component Testing

describe("Toast System", () => {
  beforeEach(() => {
    mount(<ToastProvider />);
  });

  it("shows success toast", () => {
    showToast({ type: "success", message: "Saved successfully!" });

    cy.contains("Saved successfully!").should("exist");
  });

  it("shows error toast", () => {
    showToast({ type: "error", message: "Something went wrong" });

    cy.contains("Something went wrong").should("exist");
  });

  it("auto-dismisses toast after delay", () => {
    showToast({ type: "success", message: "Auto dismiss" });

    cy.contains("Auto dismiss").should("exist");
    cy.wait(4100);
    cy.contains("Auto dismiss").should("not.exist");
  });
});
