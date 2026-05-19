interface GalleryCardProps {
  title: string;
}

const GalleryCard = ({ title }: GalleryCardProps) => (
  <div className="group">
    <div className="aspect-square bg-placeholder mb-2" />
    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
      {title}
    </p>
  </div>
);

export default GalleryCard;
