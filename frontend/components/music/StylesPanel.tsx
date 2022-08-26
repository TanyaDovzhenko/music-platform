import style from '../../styles/music/StylesPanel.module.scss';
import MusicStyleCard from './MusicStyleCard';

interface IStylesPanelProps {
    styles: any
}

export default function StylesPanel({ styles }: IStylesPanelProps) {

    return (
        <div className={style.styles}>
            {styles?.map((item, index) =>
                <MusicStyleCard name={item.name} key={index} />)}
        </div>
    )
}