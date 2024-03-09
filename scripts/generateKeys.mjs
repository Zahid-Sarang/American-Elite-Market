/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Function to create directory recursively
const mkdirSync = (directory) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Get current module's file path and extract directory name
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const parentDir = path.resolve(__dirname, ".."); // Resolve parent directory
const certsFolder = path.join(parentDir, "certs"); // Create path for certs folder in parent directory

// Create certs folder if it doesn't exist
mkdirSync(certsFolder);

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

// Write private and public keys to files
fs.writeFileSync(path.join(certsFolder, "private.pem"), privateKey);
fs.writeFileSync(path.join(certsFolder, "public.pem"), publicKey);
