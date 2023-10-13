import React, { useState } from 'react'

import FullCard from '../FullCard';
export default function Card({book}) {
    const [show,setShow]= useState(false)
    const [bookItem,setItem]=useState()
  return (
    <div>
        {
            book.map((item,id)=>{
                let imageLink=item.volumeInfo.imageLinks&&item.volumeInfo.imageLinks.smallThumbnail
                let title=item.volumeInfo.title
                let authors=item.volumeInfo.authors
                let categories=item.volumeInfo.categories
                 console.log(item.volumeInfo.categories,item.volumeInfo.publishedDate );
                if ( imageLink!==undefined){
                    return(
                        <>
                        <div className='card-wrapper'>
                        <div key ={id} className='card' onClick={()=>{ return setShow(true),setItem(item)}}>
                        <img src ={imageLink} alt=''/>
                        <div className='card-bottom'>
                            <p className='card-bottom-categories'> {categories} </p>
                            <h3 className='card-bottom_title'>{title} </h3>
                            <p className='card-bottom-author'>{authors}</p>
                        </div>
                    
                        </div> 
                    <FullCard show={show} item={bookItem} onClose={()=>setShow(false)}/>
                   
                    </div>
                    </>
                    )
                }
                
            })
        }
        
    </div>
  )
}
