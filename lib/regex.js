const taxCode10 = /^[0-9]{10}$/;

const taxCode14 = /^[0-9]{10}\-[0-9]{3}$/;

export const checkTaxCode = (taxCode) => {
	return taxCode10.test(taxCode) || taxCode14.test(taxCode);
};

export const phoneNumberRegex = /^0\d{9}$/;

export const checkPhoneNumber = (phoneNumber) => {
	return phoneNumberRegex.test(phoneNumber);
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const checkEmail = (email) => {
	return emailRegex.test(email);
};
