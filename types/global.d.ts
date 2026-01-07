export {};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget?: (opts: { url: string }) => void;
    };
  }
}
