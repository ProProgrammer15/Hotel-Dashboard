import React from 'react'
import { MemoryRouter } from "react-router-dom";
import RoomDetailsPage from './CreateRoom'

describe('<RoomDetailsPage />', () => {
  it("renders without routing error", () => {
    cy.mount(
      <MemoryRouter>
        <RoomDetailsPage />
      </MemoryRouter>
    );
  });
});
