/* ===== Portfolio shared types (NE PAS importer depuis app/...) ===== */

export type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  href?: string;
  tags?: string[];
};

export type PhotoCategory = {
  key: string;
  title: string;
  desc?: string;          // utilisé par PhotoCategorySection.tsx
  description?: string;   // compat (si ailleurs)
  count: number;          // utilisé par PhotoCategorySection.tsx
  images: GalleryImage[];
};

/* ===== Lightbox ===== */
export type LightboxItem = {
  src: string;
  alt: string;
};

export type LightboxState = {
  isOpen: boolean;
  index: number;
  list: LightboxItem[];
  title: string;
};
