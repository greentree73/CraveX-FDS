type Props = {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
};

export default function MenuItemCard({ name, price, image, onAdd }: Props) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image}
        alt={name}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">${price.toFixed(2)}</p>
        <button className="btn btn-danger" onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}