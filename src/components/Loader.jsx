import { useEffect, useState } from 'react'

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 4
        if (next >= 100) {
          clearInterval(iv)
          setDone(true)
          setTimeout(() => onLoaded?.(), 800)
          return 100
        }
        return next
      })
    }, 80)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '28px', zIndex: 99999,
      opacity: done ? 0 : 1,
      transition: 'opacity 0.8s ease',
      pointerEvents: done ? 'none' : 'all'
    }}>
      <div style={{ position: 'relative', width: '72px', height: '160px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '12px 12px 10px 10px',
          background: '#111', border: '1.5px solid #333',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${progress}%`,
            background: 'red',
            transition: 'height 0.1s ease'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 2
          }}>
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#c0f000', letterSpacing: '-4px' }}>M</span>
            <span style={{ fontSize: '9px', color: '#fff', letterSpacing: '3px' }}>DEMON JUICE</span>
          </div>
        </div>
      </div>
      <span style={{ color: 'green', fontSize: '13px', letterSpacing: '2px' }}>
        {Math.round(progress)}%
      </span>
    </div>
  )
}