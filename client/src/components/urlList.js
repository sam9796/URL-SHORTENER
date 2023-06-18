import React,{useEffect,useState} from 'react'
import M from 'materialize-css/dist/js/materialize';

function UrlList({result}) {
    const [search,setSearch]=useState('')
    const [urls,setUrls]=useState({list:[]})

    const load=async ()=>{
        let result=await fetch('http://localhost:8081/api/getAllUrls',{
            method:"GET",
            headers:{
              'Content-Type':'application/json'
            },
        })
        let resp=await result.json()
        if(resp.urls.length>0){
         setUrls({list:resp.urls})
        }
    }
    const Search=async ()=>{
        const toSearch=search.trim()
        if(toSearch===""){load();return;}
        const resp=await fetch('http://localhost:8081/api/search',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({toSearch:toSearch})
        }) 
        const resp1=await resp.json()
        if(resp1.urls.length>0){
            setUrls({list:resp1.urls})
        }
        else {
            load()
        }
    }

    const Change=(e)=>{
        setSearch(e.target.value)
    }

    useEffect(()=>{
        M.AutoInit()
        Search()
},[search,result])
  return (
    <div className="row">
      <div className="col s12 m8" style={{paddingBottom:"1.5vw"}}>
      <div className="input-field">
        <i className="material-icons prefix">search</i>
          <input
              id="short"
              placeholder="Enter text to search" 
              value={search}
              onChange={Change}
              type="text"
            />
        </div>
    </div>
      {urls.list.map((val)=>{
        return (val.shortID===''?<></>:<>
        <div className="row" style={{paddingTop:"1.5vw"}}>
        <div className="col s12 m8" >
      <div className="input-field">
        <i className="material-icons prefix">share</i>
          <input
              placeholder="Enter text to search" 
              value={val.shortID}
              type="text"
            />
        </div>
    </div>
        <div className="col s12 m8" >
      <div className="input-field">
        <i className="material-icons prefix">share</i>
          <input
              placeholder="Enter text to search" 
              value={val.longURL}
              type="text"
            />
        </div>
    </div>
        <div className="col s12 m8">
      <div className="input-field">
        <i className="material-icons prefix">note</i>
          <input
              value={val.Note}
              type="text"
            />
        </div>
    </div>
        </div>
        </>)
      })
      }
    </div>
  )
}

export default UrlList
