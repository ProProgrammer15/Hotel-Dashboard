import React from 'react'
import Button from './Buttons'

// Button.cy.tsx

describe("Button", () => {
  it("renders label and responds to click", () => {
    const onClick = cy.stub().as("clickHandler");

    cy.mount(<Button label="Click Me" onClick={onClick} />);
    cy.contains("Click Me").click();
    cy.get("@clickHandler").should("have.been.calledOnce");
  });

  it("renders icon-only button", () => {
    cy.mount(<Button icon={<span data-testid="icon">✓</span>} />);
    cy.get('[data-testid="icon"]').should("exist");
  });

  it("applies disabled styles", () => {
    cy.mount(<Button label="Disabled" disabled />);
    cy.get("button").should("be.disabled");
  });
});