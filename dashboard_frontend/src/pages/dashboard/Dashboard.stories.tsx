import type { Meta, StoryObj } from "@storybook/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router-dom";
const mockRooms = [
  {
    id: 1,
    name: "Ocean View Suite",
    description: "Spacious suite with ocean views.",
    facilities: 10,
    created: "2024-04-01",
    updated: "2024-04-10",
  },
  {
    id: 2,
    name: "Mountain Cabin",
    description: "Cozy cabin in the mountains.",
    facilities: 12,
    created: "2024-03-15",
    updated: null,
  },
];

const meta: Meta<typeof Dashboard> = {
  title: "Layouts/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  ),
};
