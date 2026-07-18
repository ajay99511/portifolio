/**
 * Application feature flags.
 * Toggle these values to enable or disable specific features.
 */
export const FEATURES = {
  enableResume: false, // Toggle true to show resume preview & option in navigation bar
  enableLinkedIn: false, // Toggle false to hide LinkedIn icon from navbar, mobile menu & footer
  enableCustomCursor: false, // Toggle true to restore the animated custom cursor (hides the native pointer)
};
export type Features = typeof FEATURES;
