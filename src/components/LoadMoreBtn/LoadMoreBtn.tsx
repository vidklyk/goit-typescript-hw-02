export default function LoadMoreBtn({ onClick }) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button onClick={onClick}>Load more</button>
    </div>
  );
}
