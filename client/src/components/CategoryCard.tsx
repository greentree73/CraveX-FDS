type Props = {
  name: string;
  onClick: () => void;
  image: string;
};

export default function CategoryCard({ name, onClick, image }: Props) {
  return (
    <div className="card h-100 text-center shadow-sm" onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src={image}
        alt={name}
        className="card-img-top"
        style={{ height: "120px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h6 className="card-title mb-0">{name}</h6>
      </div>
    </div>
  );
}