import { BOOKING_STATUS } from './status'

const cancelReasons = [
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
    reason: 'Lý do khác'
  },
]

export default cancelReasons;