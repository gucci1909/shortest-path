import React, { useState } from 'react'
import axios from "axios";
import Layout from './components/layout';
import Controls from './components/Controls';

const initialGrid =[
  [0,0,0,1,0],
  [0,1,0,1,0],
  [0,1,0,0,0],
  [0,0,0,1,0],
  [1,1,0,0,0]
]

function App() {
  const [grid, setGrid] = useState(initialGrid)
  const [start,setStart] = useState(null)
  const [end,setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleClick = (row, col) =>{
    if(!start){
      setStart([row, col]);
    } else if(!end) {
      setEnd([row, col]);
    }
  };

  const findPath = async()=>{
    if(!start || !end) return alert("select start and end");

    try {
      const res = await axios.post("http://localhost:4000/find-path", {
        start,end
      })
      setPath(res.data.path || []) 
    } catch (error) {
      alert("no path found");
    }
  }

  return (
    <div className='p-6 flex flex-col items-center'>
      <h1 className='text-xl font-bold mb-4'>DFS PATH FIND</h1>
      <Layout grid={grid} onCellClick={handleClick} path={path}></Layout>
      <Controls start={start} end={end} onFindPath={findPath}></Controls>
    </div>
  )
}

export default App