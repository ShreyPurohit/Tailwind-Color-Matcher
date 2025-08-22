import chroma from 'chroma-js';

/**
 * Gets LCH values from hex color for distance calculations
 */
export function getLCHFromHex(hex: string): [number, number, number] {
	try {
		const lch = chroma(hex).lch();
		// Handle NaN values that can occur with some edge case colors
		return [isNaN(lch[0]) ? 0 : lch[0], isNaN(lch[1]) ? 0 : lch[1], isNaN(lch[2]) ? 0 : lch[2]];
	} catch (error) {
		console.warn('Failed to get LCH from hex:', hex, error);
		return [0, 0, 0];
	}
}

/**
 * Gets LAB values from hex color for better color distance calculations
 */
export function getLABFromHex(hex: string): [number, number, number] {
	try {
		const lab = chroma(hex).lab();
		return [isNaN(lab[0]) ? 0 : lab[0], isNaN(lab[1]) ? 0 : lab[1], isNaN(lab[2]) ? 0 : lab[2]];
	} catch (error) {
		console.warn('Failed to get LAB from hex:', hex, error);
		return [0, 0, 0];
	}
}

/**
 * Calculates perceptual color distance using improved Delta E algorithm
 * Uses CIEDE2000 formula for more accurate perceptual distance
 */
export function calculateColorDistance(color1: string, color2: string): number {
	try {
		// Use chroma.js built-in Delta E calculation which is more accurate
		const deltaE = chroma.deltaE(color1, color2);
		return deltaE;
	} catch (error) {
		console.warn('Failed to calculate color distance with Delta E, falling back to LCH:', error);

		// Fallback to LCH distance calculation
		try {
			const [L1, C1, H1] = getLCHFromHex(color1);
			const [L2, C2, H2] = getLCHFromHex(color2);

			// Use weighted distance calculation for better perceptual accuracy
			const deltaL = L1 - L2;
			const deltaC = C1 - C2;
			const deltaH = H1 - H2;

			// Weight lightness more heavily as it's more perceptually important
			const distance = Math.sqrt(
				Math.pow(deltaL * 2, 2) + Math.pow(deltaC, 2) + Math.pow(deltaH, 2)
			);

			return distance;
		} catch (fallbackError) {
			console.warn('Failed to calculate color distance:', fallbackError);
			return Infinity;
		}
	}
}

/**
 * Get color information including various color space values
 */
export function getColorInfo(hex: string) {
	try {
		const color = chroma(hex);
		return {
			hex: color.hex(),
			rgb: color.rgb(),
			hsl: color.hsl(),
			lab: color.lab(),
			lch: color.lch(),
			luminance: color.luminance(),
			name: color.name ? color.name() : undefined
		};
	} catch (error) {
		console.warn('Failed to get color info:', error);
		return null;
	}
}

/**
 * Check if a color is considered light or dark
 */
export function isLightColor(hex: string): boolean {
	try {
		return chroma(hex).luminance() > 0.5;
	} catch (error) {
		console.warn('Failed to determine color brightness:', error);
		return false;
	}
}

/**
 * Get contrasting text color (black or white) for a given background color
 */
export function getContrastingTextColor(backgroundColor: string): string {
	return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
}
