
// ------------------------------------------- Discount Interface

export interface IDiscountRequest {
    date?: string;
    path: string;
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

// ------------------------------------------- Product Interface

export interface IProductRequest {
	category: ICategoryResponse;
	name: string;
	ingredients: string;
	path: string;
	description: string;
	weight: string;
	price: number;
	imagePath: string;
	count: number;
}

export interface IProductResponse extends IProductRequest {
	id: number;
}

// ------------------------------------------- Account Interface

export interface ILogin {
	email: string;
	password: string;
}

// ------------------------------------------- Register Interface

export interface IRegister {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
