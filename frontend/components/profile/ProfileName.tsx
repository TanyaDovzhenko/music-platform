import Image from "next/image"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import ProfileInput from "../common/ProfileInput"
import editIcon from '../../images/icons/edit.svg'
import checkIcon from '../../images/icons/check.svg'
import style from '../../styles/profile/ProfileName.module.scss'
import { UPDATE_PROFILE } from "../../graphql/mutations.js/user.mutations"


interface IProfileNameProps {
    text: string
    isCurrentUser: boolean | undefined
}

export default function ProfileName({ text, isCurrentUser }: IProfileNameProps) {
    const [edPanel, setEdPanel] = useState(false)
    const [name, setName] = useState(text ?? '')
    const [updateProfile, { data }] = useMutation(UPDATE_PROFILE,
        { variables: { updateUserProfileInput: { name } } })

    let nameCheck = (name.split(/\s+/).join('').length) >= 1

    return (
        <div className={style.container}>
            {isCurrentUser ? <>
                {edPanel ?
                    <div className={style.edPanel}>
                        <div className={style.icon}
                            style={{ pointerEvents: `${nameCheck ? 'auto' : 'none'}` }}>
                            <Image
                                src={checkIcon}
                                width={15}
                                height={15}
                                onClick={() => {
                                    setEdPanel(false)
                                    if (nameCheck) updateProfile()
                                }} />
                        </div>
                        <ProfileInput
                            placeholder="your name"
                            maxСharacters={60}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            width={250} />
                    </div> :
                    <div className={style.edPanelTrue} >
                        <div className={style.icon}>
                            <Image
                                src={editIcon}
                                width={12}
                                height={12}
                                onClick={() => setEdPanel(true)} />
                            {!setName && <span>change name</span>}
                        </div>
                        <div className={style.name}>{name}</div>
                    </div>
                }</> : <div className={style.name}> {name} </div>}
        </div>
    )
}