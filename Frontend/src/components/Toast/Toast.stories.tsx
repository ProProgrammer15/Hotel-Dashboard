import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, showToast } from "./Toast";

const meta: Meta = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <div className="p-4 space-y-4">
      <ToastProvider />
      <button
        className="bg-green-600 text-white py-2 px-4 rounded"
        onClick={() =>
          showToast({ type: "success", message: "Success toast!" })
        }
      >
        Show Success Toast
      </button>
      <button
        className="bg-red-600 text-white py-2 px-4 rounded"
        onClick={() => showToast({ type: "error", message: "Error toast!" })}
      >
        Show Error Toast
      </button>
    </div>
  ),
};
