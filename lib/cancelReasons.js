import { BOOKING_STATUS } from './status'

const cancelReasons = [
  {
    status: BOOKING_STATUS.CUSTOMER_CANCEL,
    reason: 'Khách hàng không đến'
  },
  {
    status: BOOKING_STATUS.CUSTOMER_CANCEL,
    reason: 'Khách hàng không ưng thiết kế'
  },
  {
    status: BOOKING_STATUS.CUSTOMER_CANCEL,
    reason: 'Khách hàng có dị ứng về da'
  },
  {
    status: BOOKING_STATUS.CUSTOMER_CANCEL,
    reason: 'Khách hàng đổi ý, không muốn xăm nữa'
  },
  {
    status: BOOKING_STATUS.STUDIO_CANCEL,
    reason: 'Studio hoặc nghệ sĩ không sắp xếp được lịch'
  },
  {
    status: BOOKING_STATUS.STUDIO_CANCEL,
    reason: 'Studio có lí do bất khả kháng'
  },
  {
    status: BOOKING_STATUS.STUDIO_CANCEL,
    reason: 'Studio có lý do khác'
  },
]

export default cancelReasons;