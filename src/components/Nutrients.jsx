import { useMediaQuery } from 'react-responsive';

const Nutrients = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div id="section2" className="h-screen w-full relative">
      <div id='nuitrents' className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 style={{
         fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isTabletOrMobile ? '30px' : '100px',
          letterSpacing: isTabletOrMobile ? '3px' : '4px',
          lineHeight: isTabletOrMobile ? '50px' : '85px',
          textAlign: isTabletOrMobile ?"left" : "center",         
          margin: 0,
          color: 'red',
        }}>
          All Natural <br /> Nutrients
        </h1>
        <p style={{
          fontSize: isTabletOrMobile ? '16px' : '20px',
          lineHeight: isTabletOrMobile ? '24px' : '30px',
          margin: '20px 0 0 0',
          color: 'black',
          textAlign: isTabletOrMobile ?"right" : "center"
        }}>
          Every can of Demon Juice is forged with a blend of ancient essences and modern science. Our proprietary Demon Core Complex™ combines electrolytes, B-vitamins, and infernal taurine — ingredients drawn from the edge of the supernatural to fuel your body beyond its natural limits.
        </p>
      </div>
    </div>
  )
}

export default Nutrients