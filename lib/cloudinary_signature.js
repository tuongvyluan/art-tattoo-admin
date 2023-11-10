import crypto from "crypto";

export const generateSHA1 =(data) => {
	const hash = crypto.createHash("sha1");
	hash.update(data);
	return hash.digest("hex");
}

export const generateSignature = (publicId, apiSecret) => {
const timestamp = new Date().getTime();
return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
