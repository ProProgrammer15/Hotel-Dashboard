import { MemoryRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

describe("Navbar", () => {
  it("renders without routing error", () => {
    cy.mount(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
  });
});
