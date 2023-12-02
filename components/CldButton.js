import { UPLOAD_PRESET } from 'lib/env';
import { CldUploadButton } from 'next-cloudinary';

const CldButton = ({ children, onSuccess }) => {
	return (
		<CldUploadButton
			onSuccess={onSuccess}
			uploadPreset={UPLOAD_PRESET}
			className="text-gray-800 bg-white ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
		>
      {children}
    </CldUploadButton>
	);
};

export default CldButton;
