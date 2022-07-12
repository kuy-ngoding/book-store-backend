export enum NotificationType {
  WAITING_FOR_APPROVAL = 'waiting_for_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',

  /* Registration Notification */
  REGISTRATION_SUCCESS = 'registration_success',
  REGISTRATION_FAILED = 'registration_failed',
  COMPANY_REGISTRATION_SUCCESS = 'company_registration_success',
  COMPANY_REGISTRATION_FAILED = 'company_registration_failed',

  /* Order Notification */
  ORDER_WAITING_FOR_PAYMENT = 'order_waiting_for_payment',
  ORDER_PAYMENT_SUCCESS = 'order_payment_success',
  ORDER_PAYMENT_FAILED = 'order_payment_failed',
  ORDER_ON_PROCESS = 'order_on_process',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_PAID = 'order_paid',
  ORDER_EXPIRED = 'order_expired',
  ORDER_COMPLETED = 'order_completed',
  ORDER_RECCURING_SUCCESS = 'order_recurring_success',
  ORDER_RECCURING_FAILED = 'order_recurring_failed',
  ORDER_RECCURING_CANCELLED = 'order_recurring_cancelled',
  ORDER_RECCURING_EXPIRED = 'order_recurring_expired',
}
