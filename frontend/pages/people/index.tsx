import Router from "next/router";
import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import PeopleSwitchers from "../../components/people/PeopleSwitchers";


export default function People() {
    useEffect(() => { Router.push('/people/followed') }, [])
    return (<MainLayout><PeopleSwitchers /></MainLayout>)
}