
// ------------------------------------------- Discount Interface

export interface IDiscountRequest {
    date?: string;
	name: string;
	title: string;
    description: string;
    imagePath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number;
}

// ------------------------------------------- Category Interface

export interface ICategoryRequest {
	name: string;
	path: string;
	imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequest {
	id: number;
}
