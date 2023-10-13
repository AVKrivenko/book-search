import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

export default function FullCard({show,item,onClose}) {
    if (!show){
        return null;
    }
    let imageLink=item.volumeInfo.imageLinks&&item.volumeInfo.imageLinks.smallThumbnail
    let title=item.volumeInfo.title
    let authors=item.volumeInfo.authors
    let categories=item.volumeInfo.categories
    let descrioptin=item.volumeInfo.description
  return (
    <div>
        <div className='overlay'>
            <div className='overlay-inner'>
                <button className='close' onClick={onClose}><AiFillCloseCircle/></button>
                <div className='inner-box'>
                    <img src={imageLink}alt=''/>
                    <div className='info'>
                    <h3 >{title} </h3>
                    <p className='categories'> {categories} </p>
                    <p >{authors}</p>
                    <p>{item.volumeInfo.publishedDate}</p>
                    <p className='description'>{descrioptin}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
