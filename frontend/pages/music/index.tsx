import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import { useEffect } from "react";
import { checkAuth } from "../../utilities/auth/checkAuth";
import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import SwitchButton from "../../components/common/SwitchButton";
import MusicSwitchers from "../../components/music/MusicSwitchers";


export default function Music({ users }: any) {

    return (<MainLayout>
        <MusicSwitchers />
    </MainLayout >)
}

export async function getServerSideProps(ctx: NextPageContext) {

    return { props: {} }
}




