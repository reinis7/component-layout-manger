
export const mystorage = {
    setItem: (name, state) => {
        localStorage.setItem(name, state);
    },
    getItem: (name) => {
        return localStorage.getItem(name);
    },
    removeItem: (name) => {
        localStorage.removeItem(name);
    },
    clearAllItems: () => {
        localStorage.clear();
    }
}