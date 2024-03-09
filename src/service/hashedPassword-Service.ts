import bcryptjs from "bcryptjs";

export class HashedPassword {
    constructor() {}
    hashPassword = async (password: string) => {
        const slatRounds = 10;
        const hashPassword = await bcryptjs.hash(password, slatRounds);
        return hashPassword;
    };
}
