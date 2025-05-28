// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Buttons";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "dark", "neutral", "white"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    icon: { control: false },
    type: {
      control: { type: "radio" },
      options: ["button", "submit"],
    },
  },
  args: {
    label: "Click Me",
    variant: "primary",
    size: "medium",
    disabled: false,
    type: "button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: "Save",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    label: undefined,
    variant: "secondary",
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} variant="primary" label="Primary" />
      <Button {...args} variant="secondary" label="Secondary" />
      <Button {...args} variant="dark" label="Dark" />
      <Button {...args} variant="neutral" label="Neutral" />
      <Button {...args} variant="white" label="White" />
    </div>
  ),
  args: {
    size: "medium",
    disabled: false,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} size="small" label="Small" />
      <Button {...args} size="medium" label="Medium" />
      <Button {...args} size="large" label="Large" />
    </div>
  ),
  args: {
    variant: "primary",
  },
};
