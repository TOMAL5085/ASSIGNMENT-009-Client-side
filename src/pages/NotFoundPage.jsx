import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("Not Found");

  return (
    <section className="section-gap">
      <div className="main-container max-w-3xl">
        <div className="glass-card rounded-[34px] px-6 py-16 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--brand)]">404</p>
          <h1 className="page-title mt-4">This learning route could not be found.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 muted-text">
            The page may have moved, the URL may be incorrect, or the content is no longer available in the current app flow.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
