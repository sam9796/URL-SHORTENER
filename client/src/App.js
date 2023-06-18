import React, {useState, useEffect} from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';


import Spinner from './components/Spinner';
import InputURL from './components/InputURL';
import URList from './components/urlList.js';

const App = () => {

  // Autoinit All JS components
  useEffect(()=> {
    M.AutoInit();
  });

  // Input Initialization
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  
  // Call APIs
  const shortenURL = async (url,note) => {
    try {
      setLoading(true);
      console.log(url,note)
      const storeData=async ()=>{
        let resp= await fetch('http://localhost:8081/api/v2/shorten',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({longURL:url,note:note})
        })
        let resp1=await resp.json();
        setResult(resp1.shortURL);
      }
      storeData()
      setLoading(false);
    } catch (e) {
      M.toast({html: 'Sorry! Server Error occurred'});
    }
  };

  // handling Submit
  const handleInput = (e) => {
    const {url,note} = e;
    shortenURL(url,note);
  };

  return (
    <div className="container">
      <InputURL sendURL={handleInput}/>
      <div className="row center">
        {
          loading ? <Spinner/> : <URList result={result}/>
        }
      </div>
    </div>
  );
}

export default App;
