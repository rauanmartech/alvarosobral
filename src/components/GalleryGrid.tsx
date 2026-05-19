import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  items: string[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map((title, i) => (
      <GalleryCard key={i} title={title} />
    ))}
  </div>
);

export default GalleryGrid;
