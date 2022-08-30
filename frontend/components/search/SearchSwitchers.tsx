import SwitchButton from "../common/SwitchButton";

export default function SearchSwitchers() {
    return (<div>
        <SwitchButton href="/search" text="all" />
        <SwitchButton href="/search/musicians" text="musicians" />
        <SwitchButton href="/search/listeners" text="listeners" />
        <SwitchButton href="/search/tracks" text="tracks" />
        <SwitchButton href="/search/albums" text="albums" />
    </div >
    )
}