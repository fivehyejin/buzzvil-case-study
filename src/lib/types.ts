export type Screen = "hub" | "weekly";

export type NavProps = {
  go: (s: Screen) => void;
  back: () => void;
};
