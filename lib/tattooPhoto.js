import { randomFrom0To } from './helpers';

export const randomPhoto = [
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587336/tattoo-1_nm4wod.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-10_dbkomu.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-7_onny4w.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-9_jzfjuv.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-8_mg8kka.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-6_eozavg.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-4_d4rhay.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-3_j52teg.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-2_bkkr0h.webp',
	'https://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587335/tattoo-5_uwxdxz.webp'
][randomFrom0To(10)];

export const noImageAvailable =
	'http://res.cloudinary.com/dl9ctj0ul/image/upload/v1703587227/depositphotos_247872612-stock-illustration-no-image-available-icon-vector_nttxwy.webp';

export const updateIcon =
	'http://res.cloudinary.com/dl9ctj0ul/image/upload/v1704551054/upload-img_jh2uex.png';
