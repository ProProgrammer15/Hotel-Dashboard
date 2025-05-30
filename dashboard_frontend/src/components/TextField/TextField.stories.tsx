// CustomField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextFields",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["text", "description"],
      description: "Type of the input field",
      defaultValue: "text",
    },
    label: {
      control: "text",
      description: "Label for the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    className: {
      control: "text",
      description: "Additional class names for styling",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input field",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const TextInput: Story = {
  args: {
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const DescriptionInput: Story = {
  args: {
    type: "description",
    label: "Description",
    placeholder: "Enter description here",
  },
};

export const DisabledField: Story = {
  args: {
    type: "text",
    label: "Disabled Input",
    placeholder: "Cannot type here",
    disabled: true,
  },
};
