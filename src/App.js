
import { useEffect, useState } from 'react';
import Card from './components/card/card';

import axios from 'axios'
import './App.css'

import Loader from './components/loader/Loader';
function App() {
  const [search,setSearch]=useState("")
    const [bookData,setData]=useState([])
    const [category, setCategory] = useState('')
    const [sort,setSort] =useState('relevance')
    const [startIndex, setStartIndex] = useState(0);
    const [loading,setLoading]=useState(false)
    const [showLoad,setShowLoad]=useState(false)

  
   const loadMoreBooks = () => {
       setLoading(true)
      const url = 'https://www.googleapis.com/books/v1/volumes?q='+search+'+subject:'+category+'&key=AIzaSyD6xWWlrvAG3v2401YkX92P7Or3YtgB6-I'+'&startIndex='+startIndex+'&maxResults=40';
      
      axios.get(url)
        .then(res=> 
          setData(res.data.items),
          setStartIndex(prevIndex => prevIndex + 30),
          setLoading(false)
        )
        .catch(error => {
          console.log(error);
        });
    };

const enterSearchBook=(event)=>{
 
  setLoading(true)
    if (event.key ==='Enter'){
      
      axios.get( 'https://www.googleapis.com/books/v1/volumes?q='+search+'+subject:'+category+'&key=AIzaSyD6xWWlrvAG3v2401YkX92P7Or3YtgB6-I'+'&maxResults=30'+'&orderBy='+sort)
        .then(res=>
          setData(res.data.items),
          setCategory(category),
          setSort(sort),
          setLoading(false),
          )
        .catch(err=>console.log(err))
        
    }
}
const handleSortingChange=(e)=>{
  setSort(e.target.value)
}
const handleCategoryChange = (e) => {
  
  setCategory(e.target.value)
};
const handlerClick=(event)=>{
  setLoading(true)
  axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'+subject:'+category+'&key=AIzaSyD6xWWlrvAG3v2401YkX92P7Or3YtgB6-I'+'&orderBy='+sort)
  .then(res=>setData(res.data.items),
  setCategory(category),
  setSort(sort),
  setLoading(false))
  .catch(err=>console.log(err))
  }

  return (
    <div>
    <div className='header'>
        <div className='header-wrapper'>
            <h1>Поиск книг</h1>
                <div className='header-searching'>
                    <input  type='text'className='header-searching-input' placeholder='Название книги'
                    value={search} onChange={e=>setSearch(e.target.value)}
                    onKeyDown={enterSearchBook}
                    />
                    <button onClick={handlerClick}className='header-searching-btn'>Поиск</button>
                </div>
            <div className='header-sorting'>
                <select value={sort}onChange={handleSortingChange} onClick={handlerClick}>
                    <option value=''>relevance</option>
                    <option value="newest"> newest</option>
                </select>

                <select value={category} onChange={handleCategoryChange} onClick={handlerClick}>
                    <option value="" >All</option>
                    <option  value="Biography" > biography</option>
                    <option value="Computers" >computers</option>
                    <option value="History">history </option>
                    <option value="Medical">medical</option>
                     <option value="Poetry">poetry </option>
                    <option value="Art">art </option>
                </select>
             
                    
                    
                
                
            </div>
          
        </div>
    </div>
 
   {loading  || bookData===null
   ?<Loader/>
  : <div className='card-container '>
   {
   <Card book={bookData}/>
  }
  
</div>}
  <div className='card-container '>
    {
   <Card book={bookData}/>
    }
    
  </div>
  
  <div className="load-more">
            <button  className="load-more-btn"onClick={loadMoreBooks}>{loading ? "loading...":"LoadMore"}</button>
          </div>
    </div>
  )
}

export default App;
