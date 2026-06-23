import bgImage from '../assets/frosty.jpg'
import { useMediaQuery } from 'react-responsive';

const Chilled = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div id="section3" className="h-screen w-full relative">
      <div 
          id="bg-overlay" 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
            opacity: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} 
        />
      <div>
       <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isTabletOrMobile ? '60px' : '120px',
          letterSpacing: isTabletOrMobile ? '3px' : '6px',
          position: 'absolute',
          top: isTabletOrMobile ? '18%' : '25%',
          left: isTabletOrMobile ? '78%' : '23%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          color: 'white',
        }}>
          Best Served <br /> Chilled
        </h1>
      </div>
      </div>
  )
}

export default Chilled