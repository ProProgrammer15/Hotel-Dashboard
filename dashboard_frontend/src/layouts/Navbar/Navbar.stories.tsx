import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import type { NavbarProps } from "./NavbarProps";
import { action } from "@storybook/addon-actions";

const meta: Meta<NavbarProps> = {
  title: "Layouts/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  args: {
    activeItem: "room-list",
  },
};

export default meta;
type Story = StoryObj<NavbarProps>;

export const WithItemClick: Story = {
  render: (args) => (
    <MemoryRouter>
      <Navbar {...args} />
    </MemoryRouter>
  ),
  args: {
    activeItem: "room-list",
    onItemClick: action("Navbar item clicked"),
  },
};
