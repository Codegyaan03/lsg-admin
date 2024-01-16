/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Jost", "sans-serif"],
      dosis: ["Dosis", "sans-serif"],
    },
    input: {
      styles: {
        variants: {
          outlined: {
            base: {
              input: {
                floated: {
                  borderWidth: "border focus:border-2",
                  borderColor: "border-[#000]",
                },
              },
            },

            shrink: {
              input: {
                borderTop: "border-t-[#000]",
              },
              label: {
                fontSize: "!text-[11px]",
                lineHeight: "!leading-tight",
                borderColor:
                  "before:!border-blue-gray-200 after:!border-blue-gray-200",
              },
            },
          },
        },
      },
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
});

export default config;
