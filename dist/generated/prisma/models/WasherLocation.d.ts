import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WasherLocationModel = runtime.Types.Result.DefaultSelection<Prisma.$WasherLocationPayload>;
export type AggregateWasherLocation = {
    _count: WasherLocationCountAggregateOutputType | null;
    _avg: WasherLocationAvgAggregateOutputType | null;
    _sum: WasherLocationSumAggregateOutputType | null;
    _min: WasherLocationMinAggregateOutputType | null;
    _max: WasherLocationMaxAggregateOutputType | null;
};
export type WasherLocationAvgAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type WasherLocationSumAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type WasherLocationMinAggregateOutputType = {
    id: string | null;
    washerId: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    updatedAt: Date | null;
};
export type WasherLocationMaxAggregateOutputType = {
    id: string | null;
    washerId: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    updatedAt: Date | null;
};
export type WasherLocationCountAggregateOutputType = {
    id: number;
    washerId: number;
    latitude: number;
    longitude: number;
    updatedAt: number;
    _all: number;
};
export type WasherLocationAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type WasherLocationSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type WasherLocationMinAggregateInputType = {
    id?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    updatedAt?: true;
};
export type WasherLocationMaxAggregateInputType = {
    id?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    updatedAt?: true;
};
export type WasherLocationCountAggregateInputType = {
    id?: true;
    washerId?: true;
    latitude?: true;
    longitude?: true;
    updatedAt?: true;
    _all?: true;
};
export type WasherLocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasherLocationWhereInput;
    orderBy?: Prisma.WasherLocationOrderByWithRelationInput | Prisma.WasherLocationOrderByWithRelationInput[];
    cursor?: Prisma.WasherLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WasherLocationCountAggregateInputType;
    _avg?: WasherLocationAvgAggregateInputType;
    _sum?: WasherLocationSumAggregateInputType;
    _min?: WasherLocationMinAggregateInputType;
    _max?: WasherLocationMaxAggregateInputType;
};
export type GetWasherLocationAggregateType<T extends WasherLocationAggregateArgs> = {
    [P in keyof T & keyof AggregateWasherLocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWasherLocation[P]> : Prisma.GetScalarType<T[P], AggregateWasherLocation[P]>;
};
export type WasherLocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasherLocationWhereInput;
    orderBy?: Prisma.WasherLocationOrderByWithAggregationInput | Prisma.WasherLocationOrderByWithAggregationInput[];
    by: Prisma.WasherLocationScalarFieldEnum[] | Prisma.WasherLocationScalarFieldEnum;
    having?: Prisma.WasherLocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WasherLocationCountAggregateInputType | true;
    _avg?: WasherLocationAvgAggregateInputType;
    _sum?: WasherLocationSumAggregateInputType;
    _min?: WasherLocationMinAggregateInputType;
    _max?: WasherLocationMaxAggregateInputType;
};
export type WasherLocationGroupByOutputType = {
    id: string;
    washerId: string;
    latitude: runtime.Decimal;
    longitude: runtime.Decimal;
    updatedAt: Date;
    _count: WasherLocationCountAggregateOutputType | null;
    _avg: WasherLocationAvgAggregateOutputType | null;
    _sum: WasherLocationSumAggregateOutputType | null;
    _min: WasherLocationMinAggregateOutputType | null;
    _max: WasherLocationMaxAggregateOutputType | null;
};
type GetWasherLocationGroupByPayload<T extends WasherLocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WasherLocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WasherLocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WasherLocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WasherLocationGroupByOutputType[P]>;
}>>;
export type WasherLocationWhereInput = {
    AND?: Prisma.WasherLocationWhereInput | Prisma.WasherLocationWhereInput[];
    OR?: Prisma.WasherLocationWhereInput[];
    NOT?: Prisma.WasherLocationWhereInput | Prisma.WasherLocationWhereInput[];
    id?: Prisma.StringFilter<"WasherLocation"> | string;
    washerId?: Prisma.StringFilter<"WasherLocation"> | string;
    latitude?: Prisma.DecimalFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFilter<"WasherLocation"> | Date | string;
    washer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type WasherLocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    washer?: Prisma.UserOrderByWithRelationInput;
};
export type WasherLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    washerId?: string;
    AND?: Prisma.WasherLocationWhereInput | Prisma.WasherLocationWhereInput[];
    OR?: Prisma.WasherLocationWhereInput[];
    NOT?: Prisma.WasherLocationWhereInput | Prisma.WasherLocationWhereInput[];
    latitude?: Prisma.DecimalFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFilter<"WasherLocation"> | Date | string;
    washer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "washerId">;
export type WasherLocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WasherLocationCountOrderByAggregateInput;
    _avg?: Prisma.WasherLocationAvgOrderByAggregateInput;
    _max?: Prisma.WasherLocationMaxOrderByAggregateInput;
    _min?: Prisma.WasherLocationMinOrderByAggregateInput;
    _sum?: Prisma.WasherLocationSumOrderByAggregateInput;
};
export type WasherLocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.WasherLocationScalarWhereWithAggregatesInput | Prisma.WasherLocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.WasherLocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WasherLocationScalarWhereWithAggregatesInput | Prisma.WasherLocationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WasherLocation"> | string;
    washerId?: Prisma.StringWithAggregatesFilter<"WasherLocation"> | string;
    latitude?: Prisma.DecimalWithAggregatesFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalWithAggregatesFilter<"WasherLocation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WasherLocation"> | Date | string;
};
export type WasherLocationCreateInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
    washer: Prisma.UserCreateNestedOneWithoutWasherLocationInput;
};
export type WasherLocationUncheckedCreateInput = {
    id?: string;
    washerId: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
};
export type WasherLocationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    washer?: Prisma.UserUpdateOneRequiredWithoutWasherLocationNestedInput;
};
export type WasherLocationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WasherLocationCreateManyInput = {
    id?: string;
    washerId: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
};
export type WasherLocationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WasherLocationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    washerId?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WasherLocationNullableScalarRelationFilter = {
    is?: Prisma.WasherLocationWhereInput | null;
    isNot?: Prisma.WasherLocationWhereInput | null;
};
export type WasherLocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WasherLocationAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type WasherLocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WasherLocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    washerId?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WasherLocationSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type WasherLocationCreateNestedOneWithoutWasherInput = {
    create?: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
    connectOrCreate?: Prisma.WasherLocationCreateOrConnectWithoutWasherInput;
    connect?: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationUncheckedCreateNestedOneWithoutWasherInput = {
    create?: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
    connectOrCreate?: Prisma.WasherLocationCreateOrConnectWithoutWasherInput;
    connect?: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationUpdateOneWithoutWasherNestedInput = {
    create?: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
    connectOrCreate?: Prisma.WasherLocationCreateOrConnectWithoutWasherInput;
    upsert?: Prisma.WasherLocationUpsertWithoutWasherInput;
    disconnect?: Prisma.WasherLocationWhereInput | boolean;
    delete?: Prisma.WasherLocationWhereInput | boolean;
    connect?: Prisma.WasherLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WasherLocationUpdateToOneWithWhereWithoutWasherInput, Prisma.WasherLocationUpdateWithoutWasherInput>, Prisma.WasherLocationUncheckedUpdateWithoutWasherInput>;
};
export type WasherLocationUncheckedUpdateOneWithoutWasherNestedInput = {
    create?: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
    connectOrCreate?: Prisma.WasherLocationCreateOrConnectWithoutWasherInput;
    upsert?: Prisma.WasherLocationUpsertWithoutWasherInput;
    disconnect?: Prisma.WasherLocationWhereInput | boolean;
    delete?: Prisma.WasherLocationWhereInput | boolean;
    connect?: Prisma.WasherLocationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WasherLocationUpdateToOneWithWhereWithoutWasherInput, Prisma.WasherLocationUpdateWithoutWasherInput>, Prisma.WasherLocationUncheckedUpdateWithoutWasherInput>;
};
export type WasherLocationCreateWithoutWasherInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
};
export type WasherLocationUncheckedCreateWithoutWasherInput = {
    id?: string;
    latitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
};
export type WasherLocationCreateOrConnectWithoutWasherInput = {
    where: Prisma.WasherLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
};
export type WasherLocationUpsertWithoutWasherInput = {
    update: Prisma.XOR<Prisma.WasherLocationUpdateWithoutWasherInput, Prisma.WasherLocationUncheckedUpdateWithoutWasherInput>;
    create: Prisma.XOR<Prisma.WasherLocationCreateWithoutWasherInput, Prisma.WasherLocationUncheckedCreateWithoutWasherInput>;
    where?: Prisma.WasherLocationWhereInput;
};
export type WasherLocationUpdateToOneWithWhereWithoutWasherInput = {
    where?: Prisma.WasherLocationWhereInput;
    data: Prisma.XOR<Prisma.WasherLocationUpdateWithoutWasherInput, Prisma.WasherLocationUncheckedUpdateWithoutWasherInput>;
};
export type WasherLocationUpdateWithoutWasherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WasherLocationUncheckedUpdateWithoutWasherInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    longitude?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WasherLocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    updatedAt?: boolean;
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["washerLocation"]>;
export type WasherLocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    updatedAt?: boolean;
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["washerLocation"]>;
export type WasherLocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    updatedAt?: boolean;
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["washerLocation"]>;
export type WasherLocationSelectScalar = {
    id?: boolean;
    washerId?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    updatedAt?: boolean;
};
export type WasherLocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "washerId" | "latitude" | "longitude" | "updatedAt", ExtArgs["result"]["washerLocation"]>;
export type WasherLocationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WasherLocationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type WasherLocationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    washer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $WasherLocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WasherLocation";
    objects: {
        washer: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        washerId: string;
        latitude: runtime.Decimal;
        longitude: runtime.Decimal;
        updatedAt: Date;
    }, ExtArgs["result"]["washerLocation"]>;
    composites: {};
};
export type WasherLocationGetPayload<S extends boolean | null | undefined | WasherLocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload, S>;
export type WasherLocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WasherLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WasherLocationCountAggregateInputType | true;
};
export interface WasherLocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WasherLocation'];
        meta: {
            name: 'WasherLocation';
        };
    };
    findUnique<T extends WasherLocationFindUniqueArgs>(args: Prisma.SelectSubset<T, WasherLocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WasherLocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WasherLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WasherLocationFindFirstArgs>(args?: Prisma.SelectSubset<T, WasherLocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WasherLocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WasherLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WasherLocationFindManyArgs>(args?: Prisma.SelectSubset<T, WasherLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WasherLocationCreateArgs>(args: Prisma.SelectSubset<T, WasherLocationCreateArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WasherLocationCreateManyArgs>(args?: Prisma.SelectSubset<T, WasherLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WasherLocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WasherLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WasherLocationDeleteArgs>(args: Prisma.SelectSubset<T, WasherLocationDeleteArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WasherLocationUpdateArgs>(args: Prisma.SelectSubset<T, WasherLocationUpdateArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WasherLocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, WasherLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WasherLocationUpdateManyArgs>(args: Prisma.SelectSubset<T, WasherLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WasherLocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WasherLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WasherLocationUpsertArgs>(args: Prisma.SelectSubset<T, WasherLocationUpsertArgs<ExtArgs>>): Prisma.Prisma__WasherLocationClient<runtime.Types.Result.GetResult<Prisma.$WasherLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WasherLocationCountArgs>(args?: Prisma.Subset<T, WasherLocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WasherLocationCountAggregateOutputType> : number>;
    aggregate<T extends WasherLocationAggregateArgs>(args: Prisma.Subset<T, WasherLocationAggregateArgs>): Prisma.PrismaPromise<GetWasherLocationAggregateType<T>>;
    groupBy<T extends WasherLocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WasherLocationGroupByArgs['orderBy'];
    } : {
        orderBy?: WasherLocationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WasherLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWasherLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WasherLocationFieldRefs;
}
export interface Prisma__WasherLocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    washer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WasherLocationFieldRefs {
    readonly id: Prisma.FieldRef<"WasherLocation", 'String'>;
    readonly washerId: Prisma.FieldRef<"WasherLocation", 'String'>;
    readonly latitude: Prisma.FieldRef<"WasherLocation", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"WasherLocation", 'Decimal'>;
    readonly updatedAt: Prisma.FieldRef<"WasherLocation", 'DateTime'>;
}
export type WasherLocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where?: Prisma.WasherLocationWhereInput;
    orderBy?: Prisma.WasherLocationOrderByWithRelationInput | Prisma.WasherLocationOrderByWithRelationInput[];
    cursor?: Prisma.WasherLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasherLocationScalarFieldEnum | Prisma.WasherLocationScalarFieldEnum[];
};
export type WasherLocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where?: Prisma.WasherLocationWhereInput;
    orderBy?: Prisma.WasherLocationOrderByWithRelationInput | Prisma.WasherLocationOrderByWithRelationInput[];
    cursor?: Prisma.WasherLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasherLocationScalarFieldEnum | Prisma.WasherLocationScalarFieldEnum[];
};
export type WasherLocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where?: Prisma.WasherLocationWhereInput;
    orderBy?: Prisma.WasherLocationOrderByWithRelationInput | Prisma.WasherLocationOrderByWithRelationInput[];
    cursor?: Prisma.WasherLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WasherLocationScalarFieldEnum | Prisma.WasherLocationScalarFieldEnum[];
};
export type WasherLocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasherLocationCreateInput, Prisma.WasherLocationUncheckedCreateInput>;
};
export type WasherLocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WasherLocationCreateManyInput | Prisma.WasherLocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WasherLocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    data: Prisma.WasherLocationCreateManyInput | Prisma.WasherLocationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WasherLocationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WasherLocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasherLocationUpdateInput, Prisma.WasherLocationUncheckedUpdateInput>;
    where: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WasherLocationUpdateManyMutationInput, Prisma.WasherLocationUncheckedUpdateManyInput>;
    where?: Prisma.WasherLocationWhereInput;
    limit?: number;
};
export type WasherLocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WasherLocationUpdateManyMutationInput, Prisma.WasherLocationUncheckedUpdateManyInput>;
    where?: Prisma.WasherLocationWhereInput;
    limit?: number;
    include?: Prisma.WasherLocationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WasherLocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where: Prisma.WasherLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.WasherLocationCreateInput, Prisma.WasherLocationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WasherLocationUpdateInput, Prisma.WasherLocationUncheckedUpdateInput>;
};
export type WasherLocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
    where: Prisma.WasherLocationWhereUniqueInput;
};
export type WasherLocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WasherLocationWhereInput;
    limit?: number;
};
export type WasherLocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WasherLocationSelect<ExtArgs> | null;
    omit?: Prisma.WasherLocationOmit<ExtArgs> | null;
    include?: Prisma.WasherLocationInclude<ExtArgs> | null;
};
export {};
