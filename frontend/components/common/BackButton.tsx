import style from '../../styles/common/Button.module.scss'
import arrowIcon from '../../images/icons/arrow-back-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cn from 'classnames'

interface IBackButtonProps {
    text?: string,
    margin?: boolean
}

const BackButton = ({ text, margin }: IBackButtonProps) => {
    const router = useRouter()

    return (
        <span className={cn(style.backButton, { [style.margin]: margin })}
            onClick={() => router.back()}>
            <Image src={arrowIcon} width='13px' />
            {text}
        </span>
    )
}

export default BackButton