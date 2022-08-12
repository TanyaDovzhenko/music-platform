import cn from 'classnames'
import { useRouter } from 'next/router'
import style from '../../styles/common/SwitchButton.module.scss'

interface ISwitchButtonProps {
    text?: string;
    width: 'small' | 'medium';
    href: string;
}

export default function SwitchButton({ text, width, href }: ISwitchButtonProps) {
    const router = useRouter()
    const activeLink = router.pathname == href

    return (
        <button
            onClick={() => router.push(href)}
            className={cn(style.button, style[width], { [style.active]: activeLink })}>
            {text}
        </button>
    )
}

SwitchButton.defaultProps = {
    width: 'small'
};
