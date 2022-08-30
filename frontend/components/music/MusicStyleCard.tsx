import style from '../../styles/Music/MusicStyleCard.module.scss'
import cn from 'classnames'
import { useState } from 'react'

interface IMusicStyleCardProps {
    name: string
    id?: number
    chooseStyle?: any
    limit?: boolean
    auth?: boolean
}

export default function MusicStyleCard({ name, id, chooseStyle, limit, auth }: IMusicStyleCardProps) {
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div className={cn(style.card,
            { [style.auth]: auth, [style.selected]: isSelected })}
            onClick={() => {
                if (isSelected) setIsSelected(false)
                else if (limit && !isSelected) setIsSelected(true)
                chooseStyle(id, !isSelected)
            }}>
            {name}
        </div >
    )
}