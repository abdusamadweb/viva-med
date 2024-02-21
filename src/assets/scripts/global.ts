// login params
const sortedParams = localStorage.getItem('loginParams')
export const userParams = JSON.parse(sortedParams)


// format price
export const formatPrice = Intl.NumberFormat('de-RU')


// format phone number
export const formatPhone = (str: string) => {
    const mask = "+### ## ### ## ##"
    if (!mask) return str
    const numeric = str?.replaceAll(/[^\d]/g, "")
    let idx = 0
    const formatted = mask?.split("").map((el) => {
        if (el === "#") {
            el = numeric[idx]
            idx++
        }
        return el
    })
    return formatted.join("")
}