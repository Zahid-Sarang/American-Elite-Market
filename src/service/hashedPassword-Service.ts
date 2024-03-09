import bcryptjs from "bcryptjs";

export class HashedPasswordService {
    constructor() {}
    hashPassword = async (password: string) => {
        const slatRounds = 10;
        const hashPassword = await bcryptjs.hash(password, slatRounds);
        return hashPassword;
    };

    async comparePassword(userPassword: string, hashedPassword: string) {
        return await bcryptjs.compare(userPassword, hashedPassword);
    }
}
