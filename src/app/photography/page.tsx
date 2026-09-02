import Image from "next/image";
import Link from "next/link";
import {
  PORTFOLIO_ARCHIVE,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PHOTOS,
} from "@/lib/portfolio";

export const metadata = {
  title: "Photography — Archie McNicol",
  description:
    "A first edit of travel, architecture and still-life photography from Archie McNicol's visual archive.",
};

export default function PhotographyPage() {
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
              A first public edit from Archie&apos;s wider portfolio: travel, built spaces and
              quieter still-life studies, selected with the original capture metadata retained.
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
          <strong>{PORTFOLIO_ARCHIVE.publicEditCount}</strong>
          <span>Images in this first public edit</span>
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
              <div className="section-title">The first edit</div>
              <p>Travel, architecture and still life, laid out as a working visual archive.</p>
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
            This is the first public edit from <em>{PORTFOLIO_ARCHIVE.folderName}</em>. The full
            source archive remains available for the next round of project grouping and client
            gallery selection.
          </p>
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
