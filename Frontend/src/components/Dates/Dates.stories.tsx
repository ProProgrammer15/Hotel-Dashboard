import type { Meta, StoryObj } from "@storybook/react";
import Dates from "./Dates";

const meta: Meta<typeof Dates> = {
  title: "Components/Dates",
  component: Dates,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dates>;

export const Default: Story = {
  args: {
    createdAt: "2025-05-30T08:00:00Z",
    updatedAt: "2025-05-30T12:30:00Z",
  },
};

export const MissingCreatedDate: Story = {
  args: {
    updatedAt: "2025-05-30T12:30:00Z",
  },
};

export const MissingUpdatedDate: Story = {
  args: {
    createdAt: "2025-05-30T08:00:00Z",
  },
};

export const NoDates: Story = {
  args: {},
};
