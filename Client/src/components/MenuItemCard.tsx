type Props = {
  name: string;
  price: number;
  onAdd: () => void;
};

export default function MenuItemCard({ name, price, onAdd }: Props) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src="https://via.placeholder.com/420x260"
        alt={name}
        className="card-img-top"
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