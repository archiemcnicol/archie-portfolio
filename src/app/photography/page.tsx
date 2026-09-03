import Image from "next/image";
import Link from "next/link";
import { PortfolioArchive } from "@/components/portfolio-archive";
import { PORTFOLIO_ARCHIVE_PHOTOS } from "@/lib/portfolio-archive";
import {
  PORTFOLIO_ARCHIVE,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PHOTOS,
} from "@/lib/portfolio";

export const metadata = {
  title: "Photography — Archie McNicol",
  description:
    "Selected photography and the complete visual archive from Archie McNicol.",
};

export default function PhotographyPage() {
  const availablePhotoCount = PORTFOLIO_ARCHIVE_PHOTOS.length;

  return (
    <main className="photo-page">
      <section className="photo-hero">
        <div className="wrap photo-hero-grid">
          <div>
            <div className="eyebrow">Photography / visual archive</div>
            <h1>The visual archive, curated.</h1>
          </div>
          <div className="photo-hero-side">
            <p>
              Selected travel, architecture and still-life studies, followed by an expanded
              visual archive of {availablePhotoCount} photographs.
            </p>
            <div className="photo-hero-actions">
              <Link className="photo-button photo-button-primary" href="/contact">
                Discuss a project
              </Link>
              <span>619 photographs in the source archive</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap photo-index" aria-label="Photography index">
        <div>
          <strong>{availablePhotoCount}</strong>
          <span>Photographs available to browse</span>
        </div>
        <div>
          <strong>{PORTFOLIO_CATEGORIES.length - 1}</strong>
          <span>Working categories from the archive</span>
        </div>
        <div>
          <strong>EXIF</strong>
          <span>Camera and capture dates retained where available</span>
        </div>
      </section>

      <section className="photo-gallery-section">
        <div className="wrap">
          <div className="photo-gallery-heading">
            <div>
              <div className="section-title">Featured edit</div>
              <p>Ten selected frames from travel, architecture and still life.</p>
            </div>
            <div className="photo-category-list" aria-label="Photography categories">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          </div>

          <div className="photo-grid">
            {PORTFOLIO_PHOTOS.map((photo, index) => (
              <figure
                className={`photo-card photo-card-${photo.orientation}`}
                key={photo.id}
              >
                <div className="photo-card-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  <span className="photo-card-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <figcaption>
                  <div>
                    <strong>{photo.title}</strong>
                    <span>{photo.category}</span>
                  </div>
                  <small>
                    {photo.capturedAt} · {photo.camera}
                  </small>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="photo-gallery-note">
            A focused selection from <em>{PORTFOLIO_ARCHIVE.folderName}</em>, with the complete
            archive available below.
          </p>
        </div>
      </section>

      <section className="archive-section" id="expanded-archive">
        <div className="wrap">
          <div className="archive-heading">
            <div>
              <div className="section-title">Expanded archive</div>
              <h2>{availablePhotoCount} photographs.</h2>
            </div>
            <p>
              Browse the available image collection in Drive order. Open any photograph for a
              full-screen view, then use the arrow keys or on-screen controls to move through the
              archive.
            </p>
          </div>
          <PortfolioArchive photos={PORTFOLIO_ARCHIVE_PHOTOS} />
        </div>
      </section>

      <section className="photo-enquiry">
        <div className="wrap photo-enquiry-inner">
          <div className="eyebrow">Photography enquiries</div>
          <h2>Have a place, project or story in mind?</h2>
          <Link className="photo-button photo-button-primary" href="/contact">
            Contact Archie
          </Link>
        </div>
      </section>
    </main>
  );
}
