import { defineStyle } from "@chakra-ui/react";

export const textStyle: Record<string, object> = {
	components: {
		Text: {
			baseStyle: defineStyle({
				userSelect: "none",
				textDecoration: "none",
				fontFamily: "Helvetica, sans-serif",
			}),
			variants: {
				title: defineStyle({
					fontSize: "2xl",
					color: "brand.secondary.default",
				}),
				label: defineStyle({
					fontWeight: "semibold",
					fontSize: "sm",
					color: "brand.primary.default",
				}),
				score: defineStyle({
					fontWeight: "semibold",
					fontSize: "sm",
					color: "brand.secondary.default",
				}),
			},
		},
	},
};
