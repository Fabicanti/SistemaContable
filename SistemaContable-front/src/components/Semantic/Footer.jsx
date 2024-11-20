import React from 'react'
import "../../styles/Footer.css"

// style={ { marginLeft : ` ${auth ? "14%" : "0"}  `}
export const Footer = ({auth = false}) => {
  return (
    <footer className="container-footer" >
        <div className='content-footer'>
            <div className='content-footer-one'>
                <div className='text-logo-foot'>
                    SSAA II 
                </div>
                <div className='marg-footer'>
                    Sistemas Administrativos II - 2024
                </div>
            </div>
            <div className='content-footer-two'>
                GGGG
            </div>
        </div>
    </footer>
  )
}
