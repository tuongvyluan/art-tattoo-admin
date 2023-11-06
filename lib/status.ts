export const enum ROLE {
  CUSTOMER = 0,
  ARTIST = 1,
  STUDIO = 2,
  ADMIN = 3
}

export const enum ACCOUNT_STATUS {
  NOT_VERIFIED = 0,
  VERIFIED = 1,
  SUSPENDED = 2,
  DELETED = 3
}

export const enum CUSTOMER_STATUS {
  NOT_VERIFIED = 0,
  VERIFIED = 1,
  DELETED = 2
}

export const enum STUDIO_STATUS {
  NOT_VERIFIED = 0,
  VERIFIED = 1,
  DELETED = 2
}

export const enum SERVICE_SIZE {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  EXTRA = 3
}

export const enum PACKAGE_STATUS {
  PENDING = 0,
  AVAILABLE = 1,
  EXPIRED = 2,
  CANCELLED = 3
}

export const enum PACKAGE_TYPE_STATUS {
  AVAILABLE = 0,
  UNAVAILABLE = 1,
  DELETED = 2
}

export const enum ARTIST_STATUS {
  AVAILABLE = 0,
  UNAVAILABLE = 1
}

export const enum BOOKING_STATUS {
  PENDING = 0,
  COMPLETED = 1,
  CANCELLED = 2,
  DELETED = 3
}

export const stringBookingStatuses = ['Đang thực hiện', 'Đã hoàn thành', 'Đã huỷ', 'Đã xoá']

export const enum TATTOO_ART_STATUS {
  AVAILABLE = 0,
  UNAVAILABLE = 1,
  DELETED = 2
}

export const enum TATTOO_ART_STAGE_STATUS {
  AVAILABLE = 0,
  UNAVAILABLE = 1,
  DELETED = 2
}