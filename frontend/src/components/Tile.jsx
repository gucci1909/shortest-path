import React from 'react'

function Tile({row, col , value, onClick, isPath,}) {
  return (
    <div onClick={()=>onClick(row, col)} className={`w-10 h-10 border flex items-center justify-center ${value ===1 ? "bg-blue-700" : "bg-white"} ${isPath ?  "bg-green-400" : ""} cursor-pointer`}>
        {value === 1 ? "X" : ""}
    </div>
  )
}

export default Tile;