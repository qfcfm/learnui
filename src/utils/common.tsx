
export const ValidatePass = (password: string) => {
    if (!password) {
        return false;
    }
    if (password.length < 8) {
        return false;
    }
    return true;
}