type Props = {
  onClick: () => void;
};

export default function LoadMoreBtn({ onClick }: Props) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button onClick={onClick}>Load more</button>
    </div>
  );
}
