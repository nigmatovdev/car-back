import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingPayload>;
export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
export type BookingAvgAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type BookingSumAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type BookingMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    serviceId: string | null;
    washerId: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    date: Date | null;
    time: string | null;
    status: $Enums.BookingStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookingMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    serviceId: string | null;
    washerId: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    date: Date | null;
    time: string | null;
    status: $Enums.BookingStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookingCountAggregateOutputType = {
    id: number;
    userId: number;
    serviceId: number;
    washerId: number;
    latitude: number;
    longitude: number;
    date: number;
    time: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BookingAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type BookingSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type BookingMinAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    date?: true;
    time?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookingMaxAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    date?: true;
    time?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookingCountAggregateInputType = {
    id?: true;
    userId?: true;
    serviceId?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    date?: true;
    time?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BookingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingCountAggregateInputType;
    _avg?: BookingAvgAggregateInputType;
    _sum?: BookingSumAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
    [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBooking[P]> : Prisma.GetScalarType<T[P], AggregateBooking[P]>;
};
export type BookingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithAggregationInput | Prisma.BookingOrderByWithAggregationInput[];
    by: Prisma.BookingScalarFieldEnum[] | Prisma.BookingScalarFieldEnum;
    having?: Prisma.BookingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingCountAggregateInputType | true;
    _avg?: BookingAvgAggregateInputType;
    _sum?: BookingSumAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type BookingGroupByOutputType = {
    id: string;
    userId: string;
    serviceId: string;
    washerId: string | null;
    latitude: runtime.Decimal;
    longitude: runtime.Decimal;
    date: Date;
    time: string;
    status: $Enums.BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]>;
}>>;
export type BookingWhereInput = {
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    serviceId?: Prisma.StringFilter<"Booking"> | string;
    washerId?: Prisma.StringNullableFilter<"Booking"> | string | null;
    latitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    time?: Prisma.StringFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    service?: Prisma.XOR<Prisma.ServiceScalarRelationFilter, Prisma.ServiceWhereInput>;
    washer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
};
export type BookingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    washerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    service?: Prisma.ServiceOrderByWithRelationInput;
    washer?: Prisma.UserOrderByWithRelationInput;
    payment?: Prisma.PaymentOrderByWithRelationInput;
};
export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    userId?: Prisma.StringFilter<"Booking"> | string;
    serviceId?: Prisma.StringFilter<"Booking"> | string;
    washerId?: Prisma.StringNullableFilter<"Booking"> | string | null;
    latitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    time?: Prisma.StringFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    service?: Prisma.XOR<Prisma.ServiceScalarRelationFilter, Prisma.ServiceWhereInput>;
    washer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
}, "id">;
export type BookingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    washerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BookingCountOrderByAggregateInput;
    _avg?: Prisma.BookingAvgOrderByAggregateInput;
    _max?: Prisma.BookingMaxOrderByAggregateInput;
    _min?: Prisma.BookingMinOrderByAggregateInput;
    _sum?: Prisma.BookingSumOrderByAggregateInput;
};
export type BookingScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    serviceId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    washerId?: Prisma.StringNullableWithAggregatesFilter<"Booking"> | string | null;
    latitude?: Prisma.DecimalWithAggregatesFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalWithAggregatesFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    time?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
};
export type BookingCreateInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    service: Prisma.ServiceCreateNestedOneWithoutBookingsInput;
    washer?: Prisma.UserCreateNestedOneWithoutWasherBookingsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateInput = {
    id?: string;
    userId: string;
    serviceId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutBookingInput;
};
export type BookingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    service?: Prisma.ServiceUpdateOneRequiredWithoutBookingsNestedInput;
    washer?: Prisma.UserUpdateOneWithoutWasherBookingsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutBookingNestedInput;
};
export type BookingCreateManyInput = {
    id?: string;
    userId: string;
    serviceId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingListRelationFilter = {
    every?: Prisma.BookingWhereInput;
    some?: Prisma.BookingWhereInput;
    none?: Prisma.BookingWhereInput;
};
export type BookingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type BookingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type BookingScalarRelationFilter = {
    is?: Prisma.BookingWhereInput;
    isNot?: Prisma.BookingWhereInput;
};
export type BookingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingCreateNestedManyWithoutWasherInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput> | Prisma.BookingCreateWithoutWasherInput[] | Prisma.BookingUncheckedCreateWithoutWasherInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutWasherInput | Prisma.BookingCreateOrConnectWithoutWasherInput[];
    createMany?: Prisma.BookingCreateManyWasherInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutWasherInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput> | Prisma.BookingCreateWithoutWasherInput[] | Prisma.BookingUncheckedCreateWithoutWasherInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutWasherInput | Prisma.BookingCreateOrConnectWithoutWasherInput[];
    createMany?: Prisma.BookingCreateManyWasherInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUpdateManyWithoutWasherNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput> | Prisma.BookingCreateWithoutWasherInput[] | Prisma.BookingUncheckedCreateWithoutWasherInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutWasherInput | Prisma.BookingCreateOrConnectWithoutWasherInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutWasherInput | Prisma.BookingUpsertWithWhereUniqueWithoutWasherInput[];
    createMany?: Prisma.BookingCreateManyWasherInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutWasherInput | Prisma.BookingUpdateWithWhereUniqueWithoutWasherInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutWasherInput | Prisma.BookingUpdateManyWithWhereWithoutWasherInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutWasherNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput> | Prisma.BookingCreateWithoutWasherInput[] | Prisma.BookingUncheckedCreateWithoutWasherInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutWasherInput | Prisma.BookingCreateOrConnectWithoutWasherInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutWasherInput | Prisma.BookingUpsertWithWhereUniqueWithoutWasherInput[];
    createMany?: Prisma.BookingCreateManyWasherInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutWasherInput | Prisma.BookingUpdateWithWhereUniqueWithoutWasherInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutWasherInput | Prisma.BookingUpdateManyWithWhereWithoutWasherInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutServiceInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput> | Prisma.BookingCreateWithoutServiceInput[] | Prisma.BookingUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutServiceInput | Prisma.BookingCreateOrConnectWithoutServiceInput[];
    createMany?: Prisma.BookingCreateManyServiceInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutServiceInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput> | Prisma.BookingCreateWithoutServiceInput[] | Prisma.BookingUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutServiceInput | Prisma.BookingCreateOrConnectWithoutServiceInput[];
    createMany?: Prisma.BookingCreateManyServiceInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutServiceNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput> | Prisma.BookingCreateWithoutServiceInput[] | Prisma.BookingUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutServiceInput | Prisma.BookingCreateOrConnectWithoutServiceInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutServiceInput | Prisma.BookingUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: Prisma.BookingCreateManyServiceInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutServiceInput | Prisma.BookingUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutServiceInput | Prisma.BookingUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput> | Prisma.BookingCreateWithoutServiceInput[] | Prisma.BookingUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutServiceInput | Prisma.BookingCreateOrConnectWithoutServiceInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutServiceInput | Prisma.BookingUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: Prisma.BookingCreateManyServiceInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutServiceInput | Prisma.BookingUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutServiceInput | Prisma.BookingUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus;
};
export type BookingCreateNestedOneWithoutPaymentInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutPaymentInput, Prisma.BookingUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutPaymentInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutPaymentInput, Prisma.BookingUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutPaymentInput;
    upsert?: Prisma.BookingUpsertWithoutPaymentInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutPaymentInput, Prisma.BookingUpdateWithoutPaymentInput>, Prisma.BookingUncheckedUpdateWithoutPaymentInput>;
};
export type BookingCreateWithoutUserInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    service: Prisma.ServiceCreateNestedOneWithoutBookingsInput;
    washer?: Prisma.UserCreateNestedOneWithoutWasherBookingsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutUserInput = {
    id?: string;
    serviceId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingCreateManyUserInputEnvelope = {
    data: Prisma.BookingCreateManyUserInput | Prisma.BookingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BookingCreateWithoutWasherInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    service: Prisma.ServiceCreateNestedOneWithoutBookingsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutWasherInput = {
    id?: string;
    userId: string;
    serviceId: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutWasherInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput>;
};
export type BookingCreateManyWasherInputEnvelope = {
    data: Prisma.BookingCreateManyWasherInput | Prisma.BookingCreateManyWasherInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
};
export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutUserInput>;
};
export type BookingScalarWhereInput = {
    AND?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    OR?: Prisma.BookingScalarWhereInput[];
    NOT?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    serviceId?: Prisma.StringFilter<"Booking"> | string;
    washerId?: Prisma.StringNullableFilter<"Booking"> | string | null;
    latitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"Booking"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    time?: Prisma.StringFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
};
export type BookingUpsertWithWhereUniqueWithoutWasherInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutWasherInput, Prisma.BookingUncheckedUpdateWithoutWasherInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutWasherInput, Prisma.BookingUncheckedCreateWithoutWasherInput>;
};
export type BookingUpdateWithWhereUniqueWithoutWasherInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutWasherInput, Prisma.BookingUncheckedUpdateWithoutWasherInput>;
};
export type BookingUpdateManyWithWhereWithoutWasherInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutWasherInput>;
};
export type BookingCreateWithoutServiceInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    washer?: Prisma.UserCreateNestedOneWithoutWasherBookingsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutServiceInput = {
    id?: string;
    userId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutServiceInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput>;
};
export type BookingCreateManyServiceInputEnvelope = {
    data: Prisma.BookingCreateManyServiceInput | Prisma.BookingCreateManyServiceInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutServiceInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutServiceInput, Prisma.BookingUncheckedUpdateWithoutServiceInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutServiceInput, Prisma.BookingUncheckedCreateWithoutServiceInput>;
};
export type BookingUpdateWithWhereUniqueWithoutServiceInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutServiceInput, Prisma.BookingUncheckedUpdateWithoutServiceInput>;
};
export type BookingUpdateManyWithWhereWithoutServiceInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutServiceInput>;
};
export type BookingCreateWithoutPaymentInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    service: Prisma.ServiceCreateNestedOneWithoutBookingsInput;
    washer?: Prisma.UserCreateNestedOneWithoutWasherBookingsInput;
};
export type BookingUncheckedCreateWithoutPaymentInput = {
    id?: string;
    userId: string;
    serviceId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateOrConnectWithoutPaymentInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutPaymentInput, Prisma.BookingUncheckedCreateWithoutPaymentInput>;
};
export type BookingUpsertWithoutPaymentInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutPaymentInput, Prisma.BookingUncheckedUpdateWithoutPaymentInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutPaymentInput, Prisma.BookingUncheckedCreateWithoutPaymentInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutPaymentInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutPaymentInput, Prisma.BookingUncheckedUpdateWithoutPaymentInput>;
};
export type BookingUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    service?: Prisma.ServiceUpdateOneRequiredWithoutBookingsNestedInput;
    washer?: Prisma.UserUpdateOneWithoutWasherBookingsNestedInput;
};
export type BookingUncheckedUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyUserInput = {
    id?: string;
    serviceId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateManyWasherInput = {
    id?: string;
    userId: string;
    serviceId: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    service?: Prisma.ServiceUpdateOneRequiredWithoutBookingsNestedInput;
    washer?: Prisma.UserUpdateOneWithoutWasherBookingsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUpdateWithoutWasherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    service?: Prisma.ServiceUpdateOneRequiredWithoutBookingsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutWasherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutWasherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyServiceInput = {
    id?: string;
    userId: string;
    washerId?: string | null;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    date: Date | string;
    time: string;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    washer?: Prisma.UserUpdateOneWithoutWasherBookingsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    serviceId?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    date?: boolean;
    time?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
    payment?: boolean | Prisma.Booking$paymentArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    serviceId?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    date?: boolean;
    time?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    serviceId?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    date?: boolean;
    time?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectScalar = {
    id?: boolean;
    userId?: boolean;
    serviceId?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    date?: boolean;
    time?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BookingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "serviceId" | "washerId" | "latitude" | "longitude" | "date" | "time" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>;
export type BookingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
    payment?: boolean | Prisma.Booking$paymentArgs<ExtArgs>;
};
export type BookingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
};
export type BookingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    washer?: boolean | Prisma.Booking$washerArgs<ExtArgs>;
};
export type $BookingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Booking";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        service: Prisma.$ServicePayload<ExtArgs>;
        washer: Prisma.$UserPayload<ExtArgs> | null;
        payment: Prisma.$PaymentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        serviceId: string;
        washerId: string | null;
        latitude: runtime.Decimal;
        longitude: runtime.Decimal;
        date: Date;
        time: string;
        status: $Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["booking"]>;
    composites: {};
};
export type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingPayload, S>;
export type BookingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingCountAggregateInputType | true;
};
export interface BookingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Booking'];
        meta: {
            name: 'Booking';
        };
    };
    findUnique<T extends BookingFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingFindManyArgs>(args?: Prisma.SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingCreateArgs>(args: Prisma.SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingDeleteArgs>(args: Prisma.SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingUpdateArgs>(args: Prisma.SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingUpsertArgs>(args: Prisma.SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingCountArgs>(args?: Prisma.Subset<T, BookingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingCountAggregateOutputType> : number>;
    aggregate<T extends BookingAggregateArgs>(args: Prisma.Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>;
    groupBy<T extends BookingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingFieldRefs;
}
export interface Prisma__BookingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    service<T extends Prisma.ServiceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    washer<T extends Prisma.Booking$washerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$washerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    payment<T extends Prisma.Booking$paymentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$paymentArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingFieldRefs {
    readonly id: Prisma.FieldRef<"Booking", 'String'>;
    readonly userId: Prisma.FieldRef<"Booking", 'String'>;
    readonly serviceId: Prisma.FieldRef<"Booking", 'String'>;
    readonly washerId: Prisma.FieldRef<"Booking", 'String'>;
    readonly latitude: Prisma.FieldRef<"Booking", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"Booking", 'Decimal'>;
    readonly date: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly time: Prisma.FieldRef<"Booking", 'String'>;
    readonly status: Prisma.FieldRef<"Booking", 'BookingStatus'>;
    readonly createdAt: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Booking", 'DateTime'>;
}
export type BookingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
};
export type BookingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type BookingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
    include?: Prisma.BookingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
};
export type BookingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type Booking$washerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Booking$paymentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
};
export type BookingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
};
export {};
