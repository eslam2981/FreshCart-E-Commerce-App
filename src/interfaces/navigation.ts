export interface NavLinkItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  badge?: string;
  isActive?: boolean;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface HeaderProps {
  user?: UserSession | null;
  wishlistCount?: number;
  cartCount?: number;
  onSignOut?: () => void;
}
