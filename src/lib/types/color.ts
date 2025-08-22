export interface TailwindColor {
	name: string;
	hex: string;
	className: string;
}

export interface ColorMatch {
	color: TailwindColor;
	distance: number;
	similarity: number;
}

export interface MultipleMatchesProps {
	matches: ColorMatch[];
	onSelectMatch: (match: ColorMatch) => void;
	selectedMatch?: ColorMatch;
}

export interface ColorInputProps {
	value: string;
	isValidInput: boolean;
	inputError?: string;
}

export interface ColorMatchProps {
	originalColor: string;
	match: ColorMatch;
}
