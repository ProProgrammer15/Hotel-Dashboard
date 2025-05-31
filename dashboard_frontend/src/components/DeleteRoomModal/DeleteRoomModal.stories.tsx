import type { Meta, StoryObj } from "@storybook/react";
import DeleteRoomModal from "./DeleteRoomModal";

const meta: Meta<typeof DeleteRoomModal> = {
  title: "Components/DeleteRoomModal",
  component: DeleteRoomModal,
  tags: ["autodocs"],
  argTypes: {
    visible: {
      control: "boolean",
    },
    onOk: { action: "Confirmed Delete" },
    onCancel: { action: "Cancelled Delete" },
  },
  args: {
    visible: true,
  },
};

export default meta;

type Story = StoryObj<typeof DeleteRoomModal>;

export const Default: Story = {};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};
