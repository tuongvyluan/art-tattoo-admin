import { fetcher } from "lib";
import { BASE_URL } from "lib/env";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loading } from "ui";

const VerifyPage = () => {
  const router = useRouter();
	const token = router.query.token;
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen">
				Yêu cầu xác thực không hợp lệ.
			</div>
		);
	}
	if (!isSuccess && loading) {
		fetcher(`${BASE_URL}/Auth/Verify?token=${token}`)
			.then(() => {
				setIsSuccess(true);
			})
			.catch(() => {
				setLoading(false);
			});
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading />
			</div>
		);
	}
	if (isSuccess) {
		return (
			<div className="flex items-center justify-center h-screen">
				Bạn đã xác thực và tạo tiệm xăm thành công.
			</div>
		);
	}
	return (
		<div className="flex items-center justify-center h-screen">
			Yêu cầu xác thực không hợp lệ.
		</div>
	);
}

export default VerifyPage;