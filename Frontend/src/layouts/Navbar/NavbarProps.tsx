export interface NavbarItemDetails {
  id: string;
  label: string;
  icon: string;
  route: string;
}

export interface NavbarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}
