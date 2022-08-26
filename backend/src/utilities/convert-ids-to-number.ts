export function convertIdsToNumber(string: string) {
    let stringArray = string.split(',')
    let numberArray = stringArray.map(item => Number(item))
    return numberArray
}