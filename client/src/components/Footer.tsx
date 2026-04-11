export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container d-flex flex-wrap justify-content-between gap-3">
        <div>
          <h5 className="mb-1">CraveX</h5>
          <small>Delicious food delivered fast</small>
        </div>
        <div className="d-flex gap-3">
          <a href="#" className="text-white text-decoration-none">About</a>
          <a href="#" className="text-white text-decoration-none">Contact</a>
          <a href="#" className="text-white text-decoration-none">Privacy</a>
        </div>
      </div>
    </footer>
  );
}