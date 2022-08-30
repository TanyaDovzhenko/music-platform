import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import ProfileInput from "../common/ProfileInput";
import editIcon from '../../images/icons/edit.svg'
import checkIcon from '../../images/icons/check.svg'
import style from '../../styles/profile/ProfileStatus.module.scss';
import { UPDATE_PROFILE } from "../../graphql/mutations.js/user.mutations";

interface IProfileStatusProps {
    text: string
    isCurrentUser: boolean | undefined
}

export default function ProfileStatus({ text, isCurrentUser }: IProfileStatusProps) {
    const [edPanel, setEdPanel] = useState(false)
    const [status, setStatus] = useState(text ?? '')

    const [updateProfile, { data }] = useMutation(UPDATE_PROFILE,
        { variables: { updateUserProfileInput: { status } } })

    return (
        <div >
            {isCurrentUser ?
                <>
                    {edPanel ?
                        <div className={style.edPanel}>
                            <div className={style.icon}>
                                <Image
                                    src={checkIcon}
                                    width={15}
                                    height={15}
                                    onClick={() => {
                                        setEdPanel(false)
                                        updateProfile()
                                    }} />
                            </div>
                            <ProfileInput
                                placeholder="your status"
                                maxСharacters={100}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                width={300} />
                        </div>
                        :
                        <div className={style.edPanelTrue} >
                            <div className={style.icon}>
                                <Image
                                    src={editIcon}
                                    width={12}
                                    height={12}
                                    onClick={() => setEdPanel(true)} />
                                {!status && <span>add status</span>}
                            </div>
                            <div className={style.status}>
                                {status && status}
                            </div>
                        </div>
                    }
                </>
                : <div className={style.status}>
                    {status && status}
                </div>}
        </div>
    )
}