type Props = {
  name: string;
  onClick: () => void;
};

export default function CategoryCard({ name, onClick }: Props) {
  return (
    <div className="card h-100 text-center shadow-sm" onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src="https://via.placeholder.com/160x120"
        alt={name}
        className="card-img-top"
      />
      <div className="card-body">
        <h6 className="card-title mb-0">{name}</h6>
      </div>
    </div>
  );
}