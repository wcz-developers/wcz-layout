import { i18n, TFunction } from "i18next";

export interface NavigationParams {
    user: any;
    t: TFunction<"translation", undefined>;
    i18n: i18n;
}