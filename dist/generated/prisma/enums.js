"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.BookingStatus = exports.Role = void 0;
exports.Role = {
    CUSTOMER: 'CUSTOMER',
    WASHER: 'WASHER',
    ADMIN: 'ADMIN'
};
exports.BookingStatus = {
    PENDING: 'PENDING',
    ASSIGNED: 'ASSIGNED',
    EN_ROUTE: 'EN_ROUTE',
    ARRIVED: 'ARRIVED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
exports.PaymentStatus = {
    UNPAID: 'UNPAID',
    PENDING: 'PENDING',
    PAID: 'PAID',
    FAILED: 'FAILED'
};
//# sourceMappingURL=enums.js.map