export type PortfolioPhoto = {
  id: string;
  src: string;
  title: string;
  category: "Travel" | "Still life" | "Architecture";
  orientation: "portrait" | "landscape";
  capturedAt: string;
  camera: string;
  originalName: string;
  alt: string;
};

/**
 * First public edit from the 619-image Google Drive archive. The source
 * filenames and capture metadata stay attached so the edit can be expanded
 * into projects without losing provenance.
 */
export const PORTFOLIO_ARCHIVE = {
  folderName: "My Website Portfolio Photos",
  folderId: "1tvIoVrk3UEeKXRTnvvIlxDFoepq3gTmj",
  sourcePhotoCount: 619,
  publicEditCount: 10,
};

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {
    id: "20250530-215358",
    src: "/portfolio/web/20250530_215358.jpg",
    title: "Acropolis, Athens",
    category: "Travel",
    orientation: "portrait",
    capturedAt: "30 May 2025",
    camera: "Samsung Galaxy S25 Ultra",
    originalName: "20250530_215358.jpg",
    alt: "The Parthenon under a clear blue sky",
  },
  {
    id: "20260611-093538",
    src: "/portfolio/web/20260611_093538.jpg",
    title: "Statue of Liberty",
    category: "Travel",
    orientation: "portrait",
    capturedAt: "11 June 2026",
    camera: "Samsung Galaxy S26 Ultra",
    originalName: "20260611_093538.jpg",
    alt: "The Statue of Liberty against a bright blue sky",
  },
  {
    id: "20251114-144521",
    src: "/portfolio/web/20251114_144521.jpg",
    title: "Aegean light",
    category: "Travel",
    orientation: "landscape",
    capturedAt: "14 November 2025",
    camera: "Samsung Galaxy S25 Ultra",
    originalName: "20251114_144521.jpg",
    alt: "A waterfront city scene photographed in soft daylight",
  },
  {
    id: "20250214-123915",
    src: "/portfolio/web/20250214_123915.jpg",
    title: "Winter city",
    category: "Travel",
    orientation: "portrait",
    capturedAt: "14 February 2025",
    camera: "Samsung Galaxy S25 Ultra",
    originalName: "20250214_123915.jpg",
    alt: "A historic European cityscape beside a river",
  },
  {
    id: "dsc03611",
    src: "/portfolio/web/DSC03611.jpg",
    title: "Folded form",
    category: "Still life",
    orientation: "landscape",
    capturedAt: "6 January 2025",
    camera: "Sony ZV-1M2",
    originalName: "DSC03611.jpg",
    alt: "A sculptural folded form photographed against black",
  },
  {
    id: "dsc03777",
    src: "/portfolio/web/DSC03777.jpg",
    title: "Citrus study",
    category: "Still life",
    orientation: "landscape",
    capturedAt: "6 January 2025",
    camera: "Sony ZV-1M2",
    originalName: "DSC03777.jpg",
    alt: "A sliced lemon photographed as a monochrome still life",
  },
  {
    id: "dsc04631",
    src: "/portfolio/web/DSC04631.jpg",
    title: "Street geometry",
    category: "Architecture",
    orientation: "portrait",
    capturedAt: "22 February 2025",
    camera: "Sony ZV-1M2",
    originalName: "DSC04631.jpg",
    alt: "A high-contrast view of a modern city facade",
  },
  {
    id: "dsc05991",
    src: "/portfolio/web/DSC05991.jpg",
    title: "Interior lines",
    category: "Architecture",
    orientation: "portrait",
    capturedAt: "25 February 2026",
    camera: "Sony ZV-1M2",
    originalName: "DSC05991.jpg",
    alt: "Architectural interior with timber beams and strong perspective",
  },
  {
    id: "photo-6553867",
    src: "/portfolio/web/Photo_6553867_DJI_267_jpg_4637425_0_202112818318_photo_original.jpg",
    title: "Coastal town",
    category: "Travel",
    orientation: "landscape",
    capturedAt: "9 December 2021",
    camera: "DJI camera archive",
    originalName: "Photo_6553867_DJI_267_jpg_4637425_0_202112818318_photo_original.jpg",
    alt: "A coastal town surrounded by green hills",
  },
  {
    id: "photo-6553875",
    src: "/portfolio/web/Photo_6553875_DJI_275_jpg_4447555_0_2021129174952_photo_original.jpg",
    title: "Island bay",
    category: "Travel",
    orientation: "landscape",
    capturedAt: "9 December 2021",
    camera: "DJI camera archive",
    originalName: "Photo_6553875_DJI_275_jpg_4447555_0_2021129174952_photo_original.jpg",
    alt: "Aerial view of a quiet island bay at dusk",
  },
];

export const PORTFOLIO_CATEGORIES = ["All", "Travel", "Architecture", "Still life"] as const;
