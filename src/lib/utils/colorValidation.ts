/**
 * Validates if a string is a valid hex color code
 */
export function isValidHex(hex: string): boolean {
	return /^#[0-9A-Fa-f]{6}$/i.test(hex);
}

/**
 * Normalizes hex color input by adding # if missing and converting to uppercase
 */
export function normalizeHexInput(input: string): string {
	const cleaned = input.trim();
	if (cleaned.length === 6 && /^[0-9A-Fa-f]{6}$/.test(cleaned)) {
		return `#${cleaned.toUpperCase()}`;
	}
	if (cleaned.length === 7 && cleaned.startsWith('#')) {
		return cleaned.toUpperCase();
	}
	return cleaned;
}

/**
 * Extracts hex value from various input formats
 */
export function extractHexColor(input: string): string | null {
	const normalized = normalizeHexInput(input);
	return isValidHex(normalized) ? normalized : null;
}
