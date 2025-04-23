import { TFunction } from "i18next";
import { User } from "./User";

export interface NavigationParams {
    user: User;
    t: TFunction<"translation", undefined>;
}