import React from 'react'
import { MemoryRouter } from "react-router-dom";
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it("renders without routing error", () => {
    cy.mount(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    cy.contains("All rooms").should("exist");
    cy.contains("CREATE A ROOM").should("exist");
  });

  it("clicks on 'CREATE A ROOM' button", () => {
    cy.mount(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    cy.contains("CREATE A ROOM").click();
  });
});
