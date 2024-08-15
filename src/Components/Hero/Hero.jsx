import React from 'react'
import './Hero.css'
import deadpool2 from './../../assets/deadpool2.jpeg'
function Hero() {
  return (
    <div className='Cards_Conainer'>
        <div className='Main_card'>

        </div>

        <div className='Second_Card'>
            <h1 className='Title'>Recent Movies</h1>

            <div className='items'>
                <img src={deadpool2} alt="Deadpool" className="thumbnail" />
                <div className="text-content">
                    <h1>Deadpool</h1>
                    <h3>Action. Drama</h3>
                </div>
            </div>
            
            <div className='items'>
                <img src={deadpool2} alt="Deadpool" className="thumbnail" />
                <div className="text-content">
                    <h1>Deadpool</h1>
                    <h3>Action. Drama</h3>
                </div>
            </div>

            <div className='items'>
                <img src={deadpool2} alt="Deadpool" className="thumbnail" />
                <div className="text-content">
                    <h1>Deadpool</h1>
                    <h3>Action. Drama</h3>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Hero