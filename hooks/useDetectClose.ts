import { useEffect, useState } from 'react'

export default function useDetectClose(elem: any, initialState: any) {
    const [isOpen, setIsOpen] = useState(initialState)

    useEffect(() => {
        const onClick = (e: any) => {
            if (elem.current && !elem.current.contains(e.target)) {
                setIsOpen(!isOpen)
            }
        }

        if (isOpen) {
            window.addEventListener('mousedown', onClick)
        }

        return () => {
            window.removeEventListener('mousedown', onClick)
        }
    }, [isOpen, setIsOpen])

    return [isOpen, setIsOpen]
}
