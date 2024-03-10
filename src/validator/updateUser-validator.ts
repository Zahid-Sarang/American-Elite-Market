import { checkSchema } from "express-validator";

interface FileValidationOptions {
    optional?: {
        options: {
            nullable: boolean;
        };
    };
    custom?: {
        options: (value: string | undefined) => boolean;
        errorMessage: string;
    };
}

const fileValidationOptions: FileValidationOptions = {
    optional: { options: { nullable: true } },
    custom: {
        options: (value) => {
            // Custom validation for image file (you can implement your own logic here)
            if (value) {
                const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
                const fileExtension = value.split(".").pop()?.toLowerCase();
                return allowedExtensions.includes(fileExtension as string);
            }
            return true; // No validation if no file is provided
        },
        errorMessage:
            "Invalid profile photo format. Allowed formats: jpg, jpeg, png, gif",
    },
};

export default checkSchema({
    email: {
        trim: true,
        errorMessage: "Email is required!",
        optional: { options: { nullable: true } },
        isEmail: {
            errorMessage: "Email should be a valid email",
        },
    },
    userName: {
        errorMessage: "First name is required!",
        optional: { options: { nullable: true } },
        trim: true,
    },
    bio: {
        optional: { options: { nullable: true } },
        isString: {
            errorMessage: "Bio should be a string",
        },
    },
    profileImage: fileValidationOptions,
});
