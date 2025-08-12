// import { useEffect, useState } from 'react'
// import React from 'react';
// import './App.css'
// import axios from 'axios';

// function App() {
//   const[handle, setHandle] = useState('')
//   const [count, setCount] = useState(0)
//   const[data,setData] = useState(null)

// const fetchData = async()=>{
//   try{
//     const res = await axios.get(`http://localhost:3000/api/${handle}`)
//     setData(res.data);
//     console.log(res.data);
//   }catch(err){
//     console.log(err);
//   }
// }
//   return (
//     <>
//     <div>
//       <h1>This is one place</h1>
//       <input type="text" 
//         placeholder='Username'
//         onChange={(e)=>setHandle(e.target.value)}
//       />
//       <button onClick={fetchData} >Get Rating</button>
//     </div>
//       {data && (
//         <div>
//           <h2>Current rating for {handle}</h2>
//           <h3>{data.result[data.result.length-1].newRating}</h3>
//         </div>
//       )}
//     </>
//   )
// }

// export default App
