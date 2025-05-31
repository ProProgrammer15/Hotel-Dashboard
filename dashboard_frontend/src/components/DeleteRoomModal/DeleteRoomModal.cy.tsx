import React from "react";
import DeleteRoomModal from "./DeleteRoomModal";

describe("<DeleteRoomModal />", () => {
  it("should not render when visible is false", () => {
    cy.mount(
      <DeleteRoomModal visible={false} onOk={cy.stub()} onCancel={cy.stub()} />
    );
    cy.get(".ant-modal").should("not.exist");
  });

  it("renders correctly when visible is true", () => {
    cy.mount(
      <DeleteRoomModal visible={true} onOk={cy.stub()} onCancel={cy.stub()} />
    );

    cy.get(".ant-modal").should("exist");
    cy.contains("Are you sure?").should("exist");
    cy.contains("You are deleting a room...").should("exist");
    cy.contains("YES DELETE").should("exist");
    cy.contains("NO TAKE ME BACK").should("exist");
  });

  it("calls onOk when YES DELETE is clicked", () => {
    const onOk = cy.stub().as("onOkHandler");

    cy.mount(
      <DeleteRoomModal visible={true} onOk={onOk} onCancel={cy.stub()} />
    );

    cy.contains("YES DELETE").click();
    cy.get("@onOkHandler").should("have.been.calledOnce");
  });

  it("calls onCancel when NO TAKE ME BACK is clicked", () => {
    const onCancel = cy.stub().as("onCancelHandler");

    cy.mount(
      <DeleteRoomModal visible={true} onOk={cy.stub()} onCancel={onCancel} />
    );

    cy.contains("NO TAKE ME BACK").click();
    cy.get("@onCancelHandler").should("have.been.calledOnce");
  });
});
