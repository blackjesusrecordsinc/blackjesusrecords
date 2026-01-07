// components/portfolio/types.ts

export type PhotoCategoryKey =
  | "portrait"
  | "food"
  | "couple"
  | "corporate"
  | "editorial"
  | "family";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type PhotoCategory = {
  id: PhotoCategoryKey;
  title: string;
  desc: string;
  count: number;
};

export type LightboxState =
  | {
      list: GalleryImage[];
      index: number;
      title: string;
    }
  | null;
