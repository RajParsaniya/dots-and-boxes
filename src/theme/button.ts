import { defineStyle } from "@chakra-ui/react";

export const buttonStyles: Record<string, object> = {
	components: {
		Button: {
			variants: {
				primary: defineStyle({
					fontSize: "sm",
					fontWeight: "normal",
					borderRadius: "lg",
					color: "brand.primary.darker",
					backgroundColor: "brand.secondary.default",
				}),
			},
		},
	},
};
