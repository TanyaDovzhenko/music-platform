export const setTemporaryMessage = (setMessageStateFunc: any) => {
    setMessageStateFunc(true)
    setTimeout(() => setMessageStateFunc(false), 4000)
}