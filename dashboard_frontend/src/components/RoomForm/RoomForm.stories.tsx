import type { Meta, StoryObj } from "@storybook/react";
import RoomForm from "./RoomForm";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof RoomForm> = {
  title: "Forms/RoomForm",
  component: RoomForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="min-h-screen bg-gray-50 p-4">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    onSubmit: async () => {
      console.log("submit called");
    },
  },
};

export default meta;

type Story = StoryObj<typeof RoomForm>;

export const EmptyForm: Story = {
  args: {
    isUpdateForm: false,
  },
};

export const PrefilledForm: Story = {
  args: {
    isUpdateForm: true,
    initialData: {
      title: "Ocean View Suite",
      description: "Spacious room with sea-facing balcony.",
      facilities: ["WiFi", "Mini Bar", "AC"],
      createdAt: "2025-05-01",
      updated: "2025-05-30",
    },
  },
};

export const WithImage: Story = {
  args: {
    isUpdateForm: true,
    initialData: {
      title: "Luxury King Room",
      description: "King-sized bed, smart TV, and private Jacuzzi.",
      facilities: ["Smart TV", "Jacuzzi", "Air Conditioning"],
      image: "/uploads/sample-room.jpg", // Replace with a valid relative path or mock
      createdAt: "2025-04-15",
      updated: "2025-05-28",
    },
  },
};

export const WithErrors: Story = {
  args: {
    errors: {
      title: "Title is required",
      description: "Description can't be empty",
      facilities: "At least one facility is required",
      image: "Image must be a JPG or PNG",
    },
  },
};
