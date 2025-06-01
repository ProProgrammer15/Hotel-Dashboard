import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders without routing error", () => {
    cy.mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });
});
