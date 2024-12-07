export type MysterySettingData = {
    name: string;
    categories: Category[];
};

export type Category = {
    name: string;
    default?: boolean;
    weight: number;
    icon?: string;
    items?: string;
};
