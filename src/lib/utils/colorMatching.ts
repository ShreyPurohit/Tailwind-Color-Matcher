import type { ColorMatch } from '../types/color';
import { calculateColorDistance } from './colorConversion';
import { findExactTailwindMatch, getTailwindColors } from './tailwindColors';

/**
 * Finds the closest matching Tailwind color to a given hex color
 * Now prioritizes exact matches first
 */
export function findClosestColor(userColor: string, threshold: number = 50): ColorMatch | null {
	const normalizedUserColor = userColor.toUpperCase();

	// First, check for exact matches
	const exactMatch = findExactTailwindMatch(normalizedUserColor);
	if (exactMatch) {
		return {
			color: exactMatch,
			distance: 0,
			similarity: 100
		};
	}

	// If no exact match, find the closest color
	const flatColors = getTailwindColors();

	if (!flatColors.length) {
		return null;
	}

	let closestMatch: ColorMatch | null = null;
	let minDistance = Infinity;

	flatColors.forEach((tailwindColor) => {
		// Skip colors that can't be compared (transparent, current, inherit)
		if (!tailwindColor.hex.startsWith('#')) {
			return;
		}

		const distance = calculateColorDistance(normalizedUserColor, tailwindColor.hex);

		if (distance < minDistance) {
			minDistance = distance;
			// Improved similarity calculation
			const similarity = Math.max(0, Math.min(100, 100 - (distance / 100) * 100));
			closestMatch = {
				color: tailwindColor,
				distance,
				similarity
			};
		}
	});

	// Only return match if within threshold
	if (closestMatch !== null && (closestMatch as ColorMatch).distance <= threshold) {
		return closestMatch;
	}

	return null;
}

/**
 * Finds multiple close matches for better user choice
 * Now properly handles exact matches at the top
 */
export function findMultipleMatches(
	userColor: string,
	count: number = 5,
	threshold: number = 50
): ColorMatch[] {
	const normalizedUserColor = userColor.toUpperCase();

	// Check for exact match first
	const exactMatch = findExactTailwindMatch(normalizedUserColor);
	const matches: ColorMatch[] = [];

	if (exactMatch) {
		matches.push({
			color: exactMatch,
			distance: 0,
			similarity: 100
		});
	}

	const flatColors = getTailwindColors();

	flatColors.forEach((tailwindColor) => {
		// Skip the exact match we already added and non-hex colors
		if (
			(exactMatch && tailwindColor.name === exactMatch.name) ||
			!tailwindColor.hex.startsWith('#')
		) {
			return;
		}

		const distance = calculateColorDistance(normalizedUserColor, tailwindColor.hex);

		if (distance <= threshold) {
			// Improved similarity calculation
			const similarity = Math.max(0, Math.min(100, 100 - (distance / 100) * 100));

			matches.push({
				color: tailwindColor,
				distance,
				similarity
			});
		}
	});

	return matches
		.sort((a, b) => {
			// Exact matches first (distance 0)
			if (a.distance === 0 && b.distance !== 0) return -1;
			if (a.distance !== 0 && b.distance === 0) return 1;

			// Then by distance
			return a.distance - b.distance;
		})
		.slice(0, count);
}

/**
 * Get color suggestions based on color family
 */
export function getColorFamilySuggestions(userColor: string): ColorMatch[] {
	const flatColors = getTailwindColors();
	const matches: ColorMatch[] = [];

	flatColors.forEach((tailwindColor) => {
		if (!tailwindColor.hex.startsWith('#')) return;

		const distance = calculateColorDistance(userColor, tailwindColor.hex);
		const similarity = Math.max(0, Math.min(100, 100 - (distance / 100) * 100));

		matches.push({
			color: tailwindColor,
			distance,
			similarity
		});
	});

	return matches.sort((a, b) => a.distance - b.distance).slice(0, 10);
}
