export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type FlexiblePartial<T> = {
    [P in keyof T]?: T[P] extends object ? FlexiblePartial<T[P]> : T[P];
} & Record<string, any>;
//# sourceMappingURL=object.types.d.ts.map