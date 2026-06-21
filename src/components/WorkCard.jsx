export default function WorkCard({ href, image, title, note }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="work-card">
      <img src={image} alt={title} />
      <span className="card-title">{title}</span>
      <span className="scroll-text">{note}</span>
    </a>
  );
}
