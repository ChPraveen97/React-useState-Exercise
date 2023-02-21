export default function ListItems({ children }) {
  const listElements = children.map((item) => <li key={item.id}>{item.name}</li>);
  return <ul>{listElements}</ul>;
}
