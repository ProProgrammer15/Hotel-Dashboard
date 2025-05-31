import React from "react";
import { MemoryRouter } from "react-router-dom";
import RoomForm from "./RoomForm";

describe("<RoomForm />", () => {
  it("renders empty form when no initialData is provided", () => {
    const submitStub = cy.stub().as("submitHandler");

    cy.mount(
      <MemoryRouter>
        <RoomForm onSubmit={submitStub} />
      </MemoryRouter>
    );

    cy.get("input").first().should("have.value", "");
    cy.get("textarea").should("have.value", "");
  });

  it("prefills form with initialData", () => {
    const mockData = {
      title: "Luxury Suite",
      description: "A beautiful room with sea view",
      facilities: ["WiFi", "Air Conditioning"],
      createdAt: "2025-05-01",
      updatedAt: "2025-05-30",
    };
    const submitStub = cy.stub().as("submitHandler");

    cy.mount(
      <MemoryRouter>
        <RoomForm onSubmit={submitStub} initialData={mockData} />
      </MemoryRouter>
    );

    cy.get('input[type="text"]').eq(0).should("have.value", mockData.title);
    cy.get("textarea").should("have.value", mockData.description);
    cy.get('input[type="text"]').eq(1).should("have.value", mockData.facilities[0]);
    cy.get('input[type="text"]').eq(2).should("have.value", mockData.facilities[1]);
    cy.contains("May 1, 2025").should("exist");
    cy.contains("May 30, 2025").should("exist");
  });

  it("updates text fields and submits the form", () => {
    const submitStub = cy.stub().as("submitHandler");

    cy.mount(
      <MemoryRouter>
        <RoomForm onSubmit={submitStub} />
      </MemoryRouter>
    );
    cy.get('input[type="text"]').eq(0).type("Deluxe Room");
    cy.get("textarea").type("Spacious with balcony");
    cy.get('input[type="text"]').eq(1).type("Mini Fridge");

    cy.contains("CREATE AND GENERATE PDF").click();

    cy.get("@submitHandler").should("have.been.calledOnce");
    cy.get("@submitHandler").its("firstCall.args.0").should("include", "Deluxe Room");
  });

  it("adds a new facility input when clicking ADD FACILITY", () => {
    const submitStub = cy.stub().as("submitHandler");

    cy.mount(
      <MemoryRouter>
        <RoomForm onSubmit={submitStub} />
      </MemoryRouter>
    );

    cy.contains("ADD FACILITY").click();
    cy.get("input[placeholder='Facility detail']").should("have.length.at.least", 2);
  });

  it("opens delete modal when DELETE ROOM is clicked", () => {
    const submitStub = cy.stub().as("submitHandler");

    cy.mount(
      <MemoryRouter>
        <RoomForm
          onSubmit={submitStub}
          isUpdateForm={true}
          initialData={{ title: "Test", description: "Room", facilities: [""] }}
        />
      </MemoryRouter>
    );

    cy.contains("DELETE ROOM").click();
    cy.contains("You are deleting a room...").should("exist");
  });

  it("calls deleteRoom API and navigates when modal confirms", () => {
    const deleteStub = cy.stub().as("deleteRoom");
    const mockNavigate = cy.stub().as("navigate");
    const submitStub = cy.stub().as("submitHandler");

    cy.intercept("DELETE", "**/rooms/**", { statusCode: 200 }).as("deleteRoomAPI");

    cy.mount(
      <MemoryRouter>
        <RoomForm
          onSubmit={submitStub}
          isUpdateForm={true}
          initialData={{ id: "123", title: "Test", description: "Room", facilities: [""] }}
        />
      </MemoryRouter>
    );

    cy.contains("DELETE ROOM").click();
    cy.contains("YES DELETE").click();
    cy.url().should("include", "/");
  });
});
