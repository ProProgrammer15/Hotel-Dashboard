import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Dashboard from "./Dashboard";
import useRoomStore from "../../stores/useDashboardStore";

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

const ZustandProviderDecorator = (Story: React.FC) => {
  // Set mock rooms in the Zustand store state before rendering the story
  useRoomStore.setState({ rooms: mockRooms });
  return <Story />;
};

const meta: Meta = {
  title: "Layouts/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
  decorators: [ZustandProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  render: () => <Dashboard />,
};
