interface ICarBase {
	brand: string;
	model: string;
}

interface ICar extends ICarBase {
	id: string;
}

export { ICarBase, ICar };
