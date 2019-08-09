
export function validUsername(str) {
    return /^[a-zA-Z0-9]{2,20}$/.test(str);
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
