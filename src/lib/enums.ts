export const WINDOWS = {
  ABOUT: "ABOUT",
  PROJECTS: "PROJECTS",
  CONTACT: "CONTACT",
  GITHUB: "GITHUB",
};
export const LINKS = {
  COMMA: "https://comma.orhandogan.com.tr",
}
export type WINDOW_TYPE = (typeof WINDOWS)[keyof typeof WINDOWS];
export type LINK_TYPE = (typeof LINKS)[keyof typeof LINKS];