import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import checkIcon from '../../images/icons/check.svg'
import addIcon from '../../images/icons/add.svg'
import style from '../../styles/common/UploadInput.module.scss'

interface IUploadInputProps {
    fileType: "image" | "audio"
    onChange: (e: any) => void
    title: string
    state?: any
}

export default function UploadInput({ fileType, onChange, title, state }: IUploadInputProps) {
    const [file, setFile] = useState<any>(null)
    const ref = useRef<HTMLInputElement>()

    useEffect(() => { if (!state) setFile(null) }, [state])
    return (
        <div className={style.uploadItem} onClick={() => ref.current.click()}>
            {file?.length ? <Image src={checkIcon} /> : <Image src={addIcon} />}
            <span>{title}</span>
            <input ref={ref}
                type='file'
                accept={fileType + "/*"}
                onChange={(e) => { onChange(e); setFile(e.target.files) }}
                style={{ display: "none" }}
            />
        </div>
    )
}

UploadInput.defaultProps = {
    fileType: "image"
};
