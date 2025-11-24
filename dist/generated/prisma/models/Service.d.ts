import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ServiceModel = runtime.Types.Result.DefaultSelection<Prisma.$ServicePayload>;
export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null;
    _avg: ServiceAvgAggregateOutputType | null;
    _sum: ServiceSumAggregateOutputType | null;
    _min: ServiceMinAggregateOutputType | null;
    _max: ServiceMaxAggregateOutputType | null;
};
export type ServiceAvgAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ServiceSumAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ServiceMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ServiceCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    price: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ServiceAvgAggregateInputType = {
    price?: true;
};
export type ServiceSumAggregateInputType = {
    price?: true;
};
export type ServiceMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ServiceCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    price?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ServiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    cursor?: Prisma.ServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ServiceCountAggregateInputType;
    _avg?: ServiceAvgAggregateInputType;
    _sum?: ServiceSumAggregateInputType;
    _min?: ServiceMinAggregateInputType;
    _max?: ServiceMaxAggregateInputType;
};
export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
    [P in keyof T & keyof AggregateService]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateService[P]> : Prisma.GetScalarType<T[P], AggregateService[P]>;
};
export type ServiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithAggregationInput | Prisma.ServiceOrderByWithAggregationInput[];
    by: Prisma.ServiceScalarFieldEnum[] | Prisma.ServiceScalarFieldEnum;
    having?: Prisma.ServiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ServiceCountAggregateInputType | true;
    _avg?: ServiceAvgAggregateInputType;
    _sum?: ServiceSumAggregateInputType;
    _min?: ServiceMinAggregateInputType;
    _max?: ServiceMaxAggregateInputType;
};
export type ServiceGroupByOutputType = {
    id: string;
    title: string;
    description: string | null;
    price: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: ServiceCountAggregateOutputType | null;
    _avg: ServiceAvgAggregateOutputType | null;
    _sum: ServiceSumAggregateOutputType | null;
    _min: ServiceMinAggregateOutputType | null;
    _max: ServiceMaxAggregateOutputType | null;
};
type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ServiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ServiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ServiceGroupByOutputType[P]>;
}>>;
export type ServiceWhereInput = {
    AND?: Prisma.ServiceWhereInput | Prisma.ServiceWhereInput[];
    OR?: Prisma.ServiceWhereInput[];
    NOT?: Prisma.ServiceWhereInput | Prisma.ServiceWhereInput[];
    id?: Prisma.StringFilter<"Service"> | string;
    title?: Prisma.StringFilter<"Service"> | string;
    description?: Prisma.StringNullableFilter<"Service"> | string | null;
    price?: Prisma.DecimalFilter<"Service"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Service"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Service"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
};
export type ServiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ServiceWhereInput | Prisma.ServiceWhereInput[];
    OR?: Prisma.ServiceWhereInput[];
    NOT?: Prisma.ServiceWhereInput | Prisma.ServiceWhereInput[];
    title?: Prisma.StringFilter<"Service"> | string;
    description?: Prisma.StringNullableFilter<"Service"> | string | null;
    price?: Prisma.DecimalFilter<"Service"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Service"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Service"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
}, "id">;
export type ServiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ServiceCountOrderByAggregateInput;
    _avg?: Prisma.ServiceAvgOrderByAggregateInput;
    _max?: Prisma.ServiceMaxOrderByAggregateInput;
    _min?: Prisma.ServiceMinOrderByAggregateInput;
    _sum?: Prisma.ServiceSumOrderByAggregateInput;
};
export type ServiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.ServiceScalarWhereWithAggregatesInput | Prisma.ServiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.ServiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ServiceScalarWhereWithAggregatesInput | Prisma.ServiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Service"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Service"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Service"> | string | null;
    price?: Prisma.DecimalWithAggregatesFilter<"Service"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Service"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Service"> | Date | string;
};
export type ServiceCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutServiceInput;
};
export type ServiceUncheckedCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutServiceInput;
};
export type ServiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutServiceNestedInput;
};
export type ServiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutServiceNestedInput;
};
export type ServiceCreateManyInput = {
    id?: string;
    title: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ServiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ServiceSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ServiceScalarRelationFilter = {
    is?: Prisma.ServiceWhereInput;
    isNot?: Prisma.ServiceWhereInput;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ServiceCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ServiceCreateWithoutBookingsInput, Prisma.ServiceUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ServiceCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ServiceWhereUniqueInput;
};
export type ServiceUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ServiceCreateWithoutBookingsInput, Prisma.ServiceUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ServiceCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ServiceUpsertWithoutBookingsInput;
    connect?: Prisma.ServiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ServiceUpdateToOneWithWhereWithoutBookingsInput, Prisma.ServiceUpdateWithoutBookingsInput>, Prisma.ServiceUncheckedUpdateWithoutBookingsInput>;
};
export type ServiceCreateWithoutBookingsInput = {
    id?: string;
    title: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceUncheckedCreateWithoutBookingsInput = {
    id?: string;
    title: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ServiceCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceCreateWithoutBookingsInput, Prisma.ServiceUncheckedCreateWithoutBookingsInput>;
};
export type ServiceUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ServiceUpdateWithoutBookingsInput, Prisma.ServiceUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ServiceCreateWithoutBookingsInput, Prisma.ServiceUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ServiceWhereInput;
};
export type ServiceUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ServiceWhereInput;
    data: Prisma.XOR<Prisma.ServiceUpdateWithoutBookingsInput, Prisma.ServiceUncheckedUpdateWithoutBookingsInput>;
};
export type ServiceUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ServiceCountOutputType = {
    bookings: number;
};
export type ServiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | ServiceCountOutputTypeCountBookingsArgs;
};
export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceCountOutputTypeSelect<ExtArgs> | null;
};
export type ServiceCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type ServiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bookings?: boolean | Prisma.Service$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["service"]>;
export type ServiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["service"]>;
export type ServiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["service"]>;
export type ServiceSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    price?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ServiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>;
export type ServiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | Prisma.Service$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ServiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ServiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ServicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Service";
    objects: {
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string | null;
        price: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["service"]>;
    composites: {};
};
export type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ServicePayload, S>;
export type ServiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ServiceCountAggregateInputType | true;
};
export interface ServiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Service'];
        meta: {
            name: 'Service';
        };
    };
    findUnique<T extends ServiceFindUniqueArgs>(args: Prisma.SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ServiceFindFirstArgs>(args?: Prisma.SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ServiceFindManyArgs>(args?: Prisma.SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ServiceCreateArgs>(args: Prisma.SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ServiceCreateManyArgs>(args?: Prisma.SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ServiceDeleteArgs>(args: Prisma.SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ServiceUpdateArgs>(args: Prisma.SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ServiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ServiceUpdateManyArgs>(args: Prisma.SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ServiceUpsertArgs>(args: Prisma.SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ServiceCountArgs>(args?: Prisma.Subset<T, ServiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ServiceCountAggregateOutputType> : number>;
    aggregate<T extends ServiceAggregateArgs>(args: Prisma.Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>;
    groupBy<T extends ServiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ServiceGroupByArgs['orderBy'];
    } : {
        orderBy?: ServiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ServiceFieldRefs;
}
export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bookings<T extends Prisma.Service$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Service$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ServiceFieldRefs {
    readonly id: Prisma.FieldRef<"Service", 'String'>;
    readonly title: Prisma.FieldRef<"Service", 'String'>;
    readonly description: Prisma.FieldRef<"Service", 'String'>;
    readonly price: Prisma.FieldRef<"Service", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Service", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Service", 'DateTime'>;
}
export type ServiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where: Prisma.ServiceWhereUniqueInput;
};
export type ServiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where: Prisma.ServiceWhereUniqueInput;
};
export type ServiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    cursor?: Prisma.ServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceScalarFieldEnum | Prisma.ServiceScalarFieldEnum[];
};
export type ServiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    cursor?: Prisma.ServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceScalarFieldEnum | Prisma.ServiceScalarFieldEnum[];
};
export type ServiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    cursor?: Prisma.ServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceScalarFieldEnum | Prisma.ServiceScalarFieldEnum[];
};
export type ServiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceCreateInput, Prisma.ServiceUncheckedCreateInput>;
};
export type ServiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ServiceCreateManyInput | Prisma.ServiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    data: Prisma.ServiceCreateManyInput | Prisma.ServiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ServiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceUpdateInput, Prisma.ServiceUncheckedUpdateInput>;
    where: Prisma.ServiceWhereUniqueInput;
};
export type ServiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ServiceUpdateManyMutationInput, Prisma.ServiceUncheckedUpdateManyInput>;
    where?: Prisma.ServiceWhereInput;
    limit?: number;
};
export type ServiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ServiceUpdateManyMutationInput, Prisma.ServiceUncheckedUpdateManyInput>;
    where?: Prisma.ServiceWhereInput;
    limit?: number;
};
export type ServiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where: Prisma.ServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ServiceCreateInput, Prisma.ServiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ServiceUpdateInput, Prisma.ServiceUncheckedUpdateInput>;
};
export type ServiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where: Prisma.ServiceWhereUniqueInput;
};
export type ServiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceWhereInput;
    limit?: number;
};
export type Service$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ServiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
};
export {};
