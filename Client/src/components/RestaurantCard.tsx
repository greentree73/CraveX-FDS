type Props = {
  name: string;
  image: string;
  onClick: () => void;
};

export default function RestaurantCard({
  name,
  image,
  onClick,
}: Props) {
  return (
    <div
      className="card shadow-sm h-100"
      onClick={onClick}
      style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden" }}
    >
      <img
        src={image}
        alt={name}
        className="card-img-top"
        style={{
          height: "160px",
          objectFit: "cover",
        }}
      />

      <div className="card-body text-center py-2">
        <h6 className="mb-0">{name}</h6>
      </div>
    </div>
  );
}