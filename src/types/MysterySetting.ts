export type MysterySetting = {
    name: string;
    categories: Partial<Category>[];
};

type Category = {
    name: string;
    default: boolean;
    weight: number;
    icon: string;
    items: string;
};
