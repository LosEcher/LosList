/** @format */

export function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function setLocalStorage(key, value) {
   return localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key));
}
