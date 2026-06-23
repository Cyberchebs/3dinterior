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
         fontFamily: "'MonsterEnergy', sans-serif",
          fontSize: isTabletOrMobile ? '40px' : '120px',
          letterSpacing: isTabletOrMobile ? '1px' : '4px',
          position: 'absolute',
          top: isTabletOrMobile ? '18%' : '27%',
          left: isTabletOrMobile ? '78%' : '30%',
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