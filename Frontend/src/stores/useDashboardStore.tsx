import { create } from "zustand";

type Room = {
  id: number;
  name: string;
  description: string;
  facilities: number;
  created: string;
  updated: string | null;
};

type RoomStore = {
  rooms: Room[];
  addRoom: (room: Omit<Room, "id" | "created" | "updated">) => void;
  updateRoom: (
    id: number,
    updates: Partial<Omit<Room, "id" | "created">>
  ) => void;
  deleteRoom: (id: number) => void;
  getRoomById: (id: number) => Room | undefined;
};

const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [
    {
      id: 1,
      name: "No. 4 King Junior Suite",
      description:
        "Modern luxury with kingsized bed, walk-in shower, double sinks, sitting area and air conditioning.",
      facilities: 12,
      created: "17/03/25",
      updated: null,
    },
    {
      id: 2,
      name: "No. 3 Luxury Double Room",
      description:
        "Style and beauty with double bed, walk-in shower and daily servicing.",
      facilities: 12,
      created: "17/03/25",
      updated: null,
    },
    {
      id: 3,
      name: "No. 2 Luxury Double Room",
      description:
        "Luxury and comfort with double bed, walk-in shower and daily servicing.",
      facilities: 12,
      created: "17/03/25",
      updated: "18/03/25",
    },
    {
      id: 4,
      name: "No. 1 The Apartment",
      description:
        "Two spacious bedrooms with kingsized beds, full bathroom, kitchen and living area set across two levels.",
      facilities: 14,
      created: "17/03/25",
      updated: "18/03/25",
    },
  ],

  addRoom: (room) =>
    set((state) => ({
      rooms: [
        ...state.rooms,
        {
          ...room,
          id: Date.now(),
          created: new Date().toLocaleDateString("en-GB"),
          updated: null,
        },
      ],
    })),

  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id
          ? {
              ...room,
              ...updates,
              updated: new Date().toLocaleDateString("en-GB"),
            }
          : room
      ),
    })),

  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
    })),

  getRoomById: (id) => get().rooms.find((room) => room.id === id),
}));

export default useRoomStore;
