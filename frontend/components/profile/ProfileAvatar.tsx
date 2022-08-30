import style from '../../styles/profile/ProfileAvatar.module.scss';
import { BASE_SERVER_URL } from '../../utilities/constants';

export default function ProfileAvatar({ avatar }: any) {

    return (
        <div className={style.avatar}
            style={{ backgroundImage: `url(${BASE_SERVER_URL + avatar})` }}>
        </div>
    )
}