import bcrypt from "bcrypt";

export const hashPassword = async (plaintextPW: string) => {
    const SALT: number = Number(process.env.SALT_ROUNDS) || 10;
    return await bcrypt.hash(plaintextPW, SALT);
}
export const compareHashedPassword = async (plainPW: string, hashedPW: string) => {
    return await bcrypt.compare(plainPW, hashedPW);
}