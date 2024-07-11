import { Text } from "ink";

const variantTexts = {
    "box": ["◰", "◳", "◲", "◱"],
    "tao": ["◐", "◓", "◑", "◒"],
    "snake": ["⊶", "⊷"],
    "bounce": [".", "o", "O", "°", "O", "o", "."],
    "side-bounce": ["ဝ", "၀"],
    "arrow": ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
    "clock": ["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "],
    "pipe": ["\\", "|", "/", "-"],
    "point": ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
} satisfies Record<string, string[]>

export function Loading({
    variant = "point"
}: {
    variant: keyof typeof variantTexts
}) {
    return <Text>Loading...</Text>;
}