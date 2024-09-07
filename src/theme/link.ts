import { defineStyle } from "@chakra-ui/react";

export const linkStyles: Record<string, object> = {
	components: {
		Link: {
			variants: {
				footer: defineStyle({
					fontSize: "lg",
					fontFamily: "Helvetica, sans-serif",
					userSelect: "none",
					textDecoration: "none",
					cursor: "pointer",
					color: "brand.secondary.default",
					_hover: {
						textDecoration: "none",
						opacity: 0.7,
					},
				}),
			},
		},
	},
};
