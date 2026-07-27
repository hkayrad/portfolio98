export const WINDOWS = {
  ABOUT: "ABOUT",
  PROJECTS: "PROJECTS",
  CONTACT: "CONTACT",
};
export type WINDOW_TYPE = (typeof WINDOWS)[keyof typeof WINDOWS];