import React from "react";
import TextField from "./TextField";

describe("<TextField />", () => {
  it("renders text input and types correctly", () => {
    const handleChange = cy.stub().as("onChange");
    cy.mount(<TextField type="text" label="Name" onChange={handleChange} placeholder="Enter name" />);

    cy.get("input[type=text]").should("exist").type("John");
    cy.get("@onChange").should("have.been.called");
  });

  it("renders textarea when type is 'description'", () => {
    cy.mount(<TextField type="description" label="Bio" placeholder="Enter bio" />);
    cy.get("textarea").should("exist").type("This is a test bio.");
  });

  it("renders file input and handles file selection", () => {
    const handleFileSelect = cy.stub().as("onFileSelect");

    cy.mount(<TextField type="file" label="Upload" onFileSelect={handleFileSelect} />);
    cy.get("input[type=file]").selectFile("cypress/fixtures/sample.pdf", { force: true });

    cy.get("@onFileSelect").should("have.been.calledOnce");
  });

  it("renders label correctly", () => {
    cy.mount(<TextField type="text" label="Email" />);
    cy.contains("label", "Email").should("exist");
  });

  it("disables input when disabled prop is true", () => {
    cy.mount(<TextField type="text" label="Disabled Input" disabled />);
    cy.get("input").should("be.disabled");
  });

  it("shows placeholder if value is empty", () => {
    cy.mount(<TextField type="text" placeholder="Enter something" />);
    cy.get("input").should("have.attr", "placeholder", "Enter something");
  });

  it("shows selected file name", () => {
    cy.mount(<TextField type="file" label="Upload File" />);
    cy.get("input[type=file]").selectFile("cypress/fixtures/sample.pdf", { force: true });
    cy.contains("sample.pdf").should("exist");
  });
});
