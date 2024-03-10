import { checkSchema } from "express-validator";

export default checkSchema({
    post: {
        trim: true,
        errorMessage: "Please enter a content",
        notEmpty: true,
    },
});
