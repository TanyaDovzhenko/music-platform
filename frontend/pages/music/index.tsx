import Router from 'next/router'
import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import MusicSwitchers from "../../components/music/MusicSwitchers";


export default function Music() {
    useEffect(() => { Router.push('/people/followed') }, [])
    return (<MainLayout><MusicSwitchers /></MainLayout >)
}


