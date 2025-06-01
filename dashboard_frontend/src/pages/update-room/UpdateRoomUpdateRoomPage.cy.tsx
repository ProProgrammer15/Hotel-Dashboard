import React from 'react';
import { MemoryRouter } from "react-router-dom";
import UpdateRoom from './UpdateRoom'

describe('<UpdateRoomPage />', () => {
  it("renders without routing error", () => {
    cy.mount(
      <MemoryRouter>
        <UpdateRoom />
      </MemoryRouter>
    );
  });
});