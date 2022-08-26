import Router from "next/router"

export const reload = () => {
    let reloaded = localStorage.getItem('reloaded')
    if (!reloaded) {
        localStorage.setItem('reloaded', 'reloaded')
        Router.reload()
    }
}