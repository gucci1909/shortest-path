import React from "react";

function Controls({ start, end, onFindPath }) {
  return (
    <div className="mt-4">
      <p>Start: {JSON.stringify(start)}</p>
      <p>End: {JSON.stringify(end)}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mt-2"
        onFindPath={onFindPath}
      >
        Find Path
      </button>
    </div>
  );
}

export default Controls;
