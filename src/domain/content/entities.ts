export type NavigationTarget =
  | "transmit"
  | "inventory"
  | "quest"
  | "character"
  | "tavern";

export interface NavigationItem {
  readonly id: NavigationTarget;
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface CategoryTag {
  readonly label: string;
}

export interface SelectedWork {
  readonly id: string;
  readonly title: string;
  readonly statement: string;
  readonly tags: readonly string[];
  readonly year: string;
  readonly image: string;
  readonly imageAlt: string;
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly year: string;
  readonly discipline: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}
