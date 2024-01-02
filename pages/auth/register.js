import Button from 'components/Button';
import MyModal from 'components/MyModal';
import Register from 'components/Register';
import { fetcher, fetcherPost } from 'lib';
import { BASE_URL, TAX_CODE_API } from 'lib/env';
import { checkPhoneNumber, checkTaxCode } from 'lib/regex';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { MdCheck, MdOutlineErrorOutline } from 'react-icons/md';
import { Loading } from 'ui';

const RegisterPage = () => {
	const { status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			Router.replace('/');
		}
	}, [status]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		password: '',
		cpassword: '',
		studioName: '',
		studioAddress: '',
		studioCity: 79,
		studioTaxCode: '',
		studioOpenTime: '09:00:00',
		studioCloseTime: '21:00:00',
		studioBioContent: '',
		role: ROLE.STUDIO
	});

	const [avatar, setAvatar] = useState('/images/upload-img.png');
	const [showModal, setShowModal] = useState(false);

	const [modalContent, setModalContent] = useState({
		title: '',
		content: '',
		isWarn: 0
	});

	const handleSetUser = (newUser) => {
		handleModal(false, '', '');
		setUser(newUser);
	};

	const handleModal = (state, title, content, status = 0) => {
		setShowModal((prev) => state);
		setModalContent({
			title: title,
			content: content,
			isWarn: status
		});
	};

	const getModalIcon = () => {
		switch (modalContent.isWarn) {
			case 1:
				return <MdCheck className="text-green-500" size={30} />;
			case 2:
				return <MdOutlineErrorOutline className="text-red-500" size={30} />;
			default:
				return <Loading size={30} />;
		}
	};

	const handleCloseModal = () => {
		if (modalContent?.isWarn === 2) {
			setShowModal(false);
		} else {
			Router.replace('/auth/signin');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleModal(true, 'Đang đăng ký tài khoản.', '', 0);
		if (user.cpassword !== user.password) {
			handleModal(
				true,
				'Đăng ký tài khoản thất bại.',
				'Mật khẩu xác nhận không trùng khớp.',
				2
			);
		} else if (!checkTaxCode(user.studioTaxCode)) {
			handleModal(
				true,
				'Đăng ký tài khoản thất bại.',
				'Mã số thuế không hợp lệ.',
				2
			);
		} else if (!checkPhoneNumber(user.phoneNumber)) {
			handleModal(
				true,
				'Đăng ký tài khoản thất bại.',
				'Số điện thoại không hợp lệ.',
				2
			);
		} else {
			try {
				fetcher(`${TAX_CODE_API}/${user.studioTaxCode}`).then((data) => {
					let validTax = false;
					if (data.code === '00') {
						validTax = true;
					}
					fetcherPost(`${BASE_URL}/Auth/RegisterWithStudio`, {
						accountCreateModel: {
							email: user.email,
							avatar: avatar,
							password: user.password,
							fullName: user.name,
							phoneNumber: user.phoneNumber,
							role: ROLE.STUDIO
						},
						studioViewModelForCreate: {
							studioName: user.studioName,
							taxCode: user.studioTaxCode,
							address: user.studioAddress,
							city: user.studioCity,
							bioContent: user.studioBioContent,
							openTime: user.studioOpenTime,
							closeTime: user.studioCloseTime,
							isAuthorized: validTax
						}
					})
						.then((data) => {
							console.log(data);
							handleModal(
								true,
								'Đăng ký tài khoản thành công.',
								'Bạn hãy kiểm tra mail để xác thực tài khoản nhé.',
								1
							);
						})
						.catch((e) => {
							console.log(e);
							let mesageTitle = 'Đăng ký tài khoản thất bại.';
							let messageContent = '';
							if (e.message.includes('already an account')) {
								messageContent = 'Email hoặc số điện thoại này đã tồn tại.';
							}
							handleModal(true, mesageTitle, messageContent, 2);
						});
				});
			} catch (e) {
				console.log(e);
				let mesageTitle = 'Đăng ký tài khoản thất bại.';
				let messageContent = '';
				if (e.message.includes('already an account')) {
					messageContent = 'Email hoặc số điện thoại này đã tồn tại.';
				}
				handleModal(true, mesageTitle, messageContent, 2);
			}
		}
	};

	return (
		<div className="relative">
			<MyModal
				noHeader={true}
				openModal={showModal}
				setOpenModal={setShowModal}
				title={'Đăng ký tài khoản'}
				noFooter={true}
			>
				<div className="flex justify-center">
					<div className="text-center">
						<div className="flex flex-wrap gap-2 items-center pb-4">
							<div>{getModalIcon()}</div>
							<div className="text-2xl">{modalContent?.title}</div>
						</div>
						<div className="text-base">{modalContent?.content}</div>
					</div>
				</div>
				{modalContent?.isWarn !== 0 && (
					<div className="pt-6 mt-6 border-t border-gray-300 flex justify-center">
						<Button outline onClick={handleCloseModal}>
							{modalContent?.isWarn === 2 ? 'Đóng' : 'Trở lại trang đăng nhập'}
						</Button>
					</div>
				)}
			</MyModal>
			<Register
				avatar={avatar}
				setAvatar={setAvatar}
				user={user}
				setUser={handleSetUser}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

RegisterPage.getInitialProps = async () => ({
	namespacesRequired: ['register']
});

export default RegisterPage;
