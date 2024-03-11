import { checkSchema } from "express-validator";

export default checkSchema({
    loggedInUserId: {
        errorMessage: "User Id is required!",
        notEmpty: true,
        trim: true,
    },
});
