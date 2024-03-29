import React from "react";

export default function ArrowDownIcon(props) {
  const { color } = props;

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill={color}
      >
        <path d="m448.413-384.174-104-104q-21.631-21.63-9.696-49.478 11.935-27.848 42.522-27.848h206q30.587 0 42.522 27.848 11.935 27.848-9.696 49.478l-104 104q-6.717 6.718-14.793 10.076-8.076 3.359-17.033 3.359-8.956 0-17.033-3.359-8.076-3.358-14.793-10.076Z" />
      </svg>
    </div>
  );
}
