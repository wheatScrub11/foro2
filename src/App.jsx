import { useEffect, useState } from 'react'
import Post from './assets/Post'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const [dataFromAppInventor, setDataFromAppInventor] = useState('vacio');

  // useEffect(() => {
  //   // Read data from local storage
  //   const data = localStorage.getItem('appInventorData');
  //   if (data) {
  //     setDataFromAppInventor(data);
  //   }

  // }, []);

  const obtenerDatos = () =>{
    const data = localStorage.getItem('appInventorData');
    if (data) {
      setDataFromAppInventor(data);
    }else{
      setDataFromAppInventor("error!!!")
    }
  }

  return (
    <div id='MAIN-CONTAINER'>
      <div className="main">
        <div>hola {dataFromAppInventor}</div>
        <button onClick={obtenerDatos}>ObtenerDatos</button>
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default App
