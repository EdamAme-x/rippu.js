import { useEffect, useState } from "react";
import { Text } from "ink";

const variantTexts = {
	box: ["◰", "◳", "◲", "◱"],
	tao: ["◐", "◓", "◑", "◒"],
	snake: ["⊶", "⊷"],
	bounce: [".", "o", "O", "°", "O", "o", "."],
	"side-bounce": ["ဝ", "၀"],
	arrow: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
	clock: ["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "],
	pipe: ["\\", "|", "/", "-"],
	point: ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
} as const satisfies Record<string, string[]>;

export function Loading({
	variant = "point",
	stop = false,
	interval = 100
}: {
	variant?: keyof typeof variantTexts;
	stop?: boolean;
	interval?: number;
}) {
	if (stop) {
		return variantTexts[variant][0];
	}

	const [poiter, setPointer] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setPointer(prev => (prev + 1) % variantTexts[variant].length);
		}, interval);

		return () => clearInterval(intervalId);
	}, []);

	return <Text>{variantTexts[variant][poiter]}</Text>;
}
