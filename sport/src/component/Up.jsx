import React from 'react'
import upIcon from'../Assets/icons/up.png'
import { useEffect , useState } from 'react'
import { Link, Element } from 'react-scroll';


const Up = () => {
    const [stickyUp , setstickyUp] = useState(true)

  const handlestickyUp = () => {
    if(window.pageYOffset >  480){
        setstickyUp(false)
    }else{
        setstickyUp(true)
    }
  }

  useEffect(()=> {
    window.addEventListener('scroll' , handlestickyUp);
    return () => {
      window.removeEventListener('scroll' , handlestickyUp)
    }
  })
  return (
  <Link to="fleche" smooth={true} duration={1000}>
    <div className={`wrap_up${stickyUp ? 'up-sticky' : ''}` }>
        <div className='up'>
            <img src={upIcon} alt="" />
        </div>
    </div>
    </Link>

  )
}

export default Up
