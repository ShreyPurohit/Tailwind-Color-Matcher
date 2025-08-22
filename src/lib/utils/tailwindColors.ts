import type { TailwindColor } from '../types/color.js';
import { TAILWIND_COLORS } from './constants.js';

const BASIC_COLORS: Record<string, string> = {
	black: '#000000',
	white: '#ffffff'
};

/**
 * Flattens the Tailwind color palette into a searchable array
 */
export function flattenTailwindColors(): TailwindColor[] {
	const flatColors: TailwindColor[] = [];

	// Add basic colors first
	Object.entries(BASIC_COLORS).forEach(([colorKey, value]) => {
		flatColors.push({
			name: colorKey,
			hex: value.toUpperCase(),
			className: `bg-${colorKey}`
		});
	});

	// Add colors from the manual palette
	Object.entries(TAILWIND_COLORS).forEach(([colorKey, shades]) => {
		Object.entries(shades).forEach(([shadeKey, colorValue]) => {
			if (typeof colorValue === 'string' && colorValue.startsWith('#')) {
				flatColors.push({
					name: `${colorKey}-${shadeKey}`,
					hex: colorValue.toUpperCase(),
					className: `bg-${colorKey}-${shadeKey}`
				});
			}
		});
	});

	return flatColors;
}

/**
 * Gets all available Tailwind colors (cached for performance)
 */
let cachedColors: TailwindColor[] | null = null;
export function getTailwindColors(): TailwindColor[] {
	if (!cachedColors) {
		cachedColors = flattenTailwindColors();
		console.log(`Loaded ${cachedColors.length} Tailwind colors`);
	}
	return cachedColors;
}

/**
 * Check if a hex color is an exact match in Tailwind palette
 */
export function findExactTailwindMatch(hex: string): TailwindColor | null {
	const colors = getTailwindColors();
	const normalizedHex = hex.toUpperCase();

	return colors.find((color) => color.hex === normalizedHex) || null;
}
