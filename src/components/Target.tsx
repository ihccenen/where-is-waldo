export default function Target({
  value,
  list,
  handleChange,
  handleClick,
  style,
}: {
  value?: string;
  list?: { name: string; id: number }[];
  handleChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleClick?: () => void;
  style?: { top: string; left: string };
}) {
  return (
    <div className="target" style={style}>
      <select value={value} onChange={handleChange}>
        <option value="">Select a Character</option>
        {list?.map(({ name, id }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleClick}>
        Confirm
      </button>
    </div>
  );
}

Target.defaultProps = {
  value: '',
  list: [],
  handleChange: () => {},
  handleClick: () => {},
  style: { top: '', left: '' },
};
