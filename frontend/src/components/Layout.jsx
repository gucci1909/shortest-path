import React from "react";
import Tile from "./Tile";

function Layout({ grid, onCellClick, path }) {
  return (
    <div className="grid grid-cols-20 gap-1">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <Tile
            key={`${i}-${j}`}
            row={i}
            col={j}
            value={cell}
            onClick={onCellClick}
            isPath={path.some(([x, y]) => x === i && y === j)}
          ></Tile>
        ))
      )}
    </div>
  );
}

export default Layout;
