export const textStyle = {
	components: {
		Text: {
			baseStyle: {
				userSelect: "none",
				textDecoration: "none",
				fontFamily: "Helvetica, sans-serif",
			},
			variants: {
				title: {
					fontSize: "2xl",
					color: "brand.secondary.default",
				},
				label: {
					fontWeight: "semibold",
					fontSize: "sm",
					color: "brand.primary.default",
				},
				score: {
					fontWeight: "semibold",
					fontSize: "sm",
					color: "brand.secondary.default",
				},
			},
		},
	},
};
