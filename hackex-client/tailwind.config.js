/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        blue: {
          primary: "#0070FF",
          secondary: "#71A5DE",
          hover: "rgba(0,120,250,1)",
          disabled: "rgba(146,192,255,1)",
          light: "rgba(0,94,236,.2)",
        },
        gray: {
          primary: "#F3F2F2",
          secondary: "rgba(247,243,243,1)",
          hover: "rgba(180,180,180,1)",
          disabled: "rgba(240,240,240,1)",
          table: "rgba(229,226,226,1)",
        },
        red: {
          primary: "#D25050",
          hover: "rgba(255,0,0,1)",
          disabled: "rgba(255,125,100,1)",
          "device-head": "rgba(244,27,27,1)",
          "device-foot": "rgba(244,27,27,.15)",
          reset: "#f87171",
        },
        lime: {
          primary: "rgba(163,230,53,1)",
        },
        green: {
          primary: "#00EC26",
          hover: "rgba(89,217,94,1)",
          "dark-primary": "#007934",
          "dark-hover": "#1c8d4d",
          "dark-disabled": "#3dc578",
        },
        orange: {
          primary: "#EF9308",
          hover: "rgba(250,177,67,1)",
          disabled: "#EDBC72",
        },
        delete: "#B81348",
        success: " #13B821",
      },
      textColor: {
        gray: {
          primary: "rgba(111,111,111,1)",
          button: "#344054",
          subHeading: "#667085",
          label: "#777777",
          children: "#4C4C4C",
        },
        red: {
          primary: "#D25050",
        },
        blue: {
          primary: "rgba(0,94,236,1)",
        },
        green: {
          primary: "#00EC34",
        },
      },
      height: {
        navbar: "7.5%",
        content: "93.5%",
      },
      width: {
        "sidebar-expand": "15%",
        "sidebar-collapse": "4%",
        "content-expand": "85%",
        "content-collapse": "96%",
        "right-sidebar": "15%",
      },

      boxShadow: {
        low: "0px 4px 4px 0px rgba(0, 0, 0, .25)",
        basic: "2px 2px 2px 2px rgba(0, 0, 0, .3)",
        spread: "0 0 15px 0 rgba(0, 0, 0, 0.3)",
        inset: "inset 0 4px 2px 0 rgba(0, 0, 0, 0.3)",
        subtle: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
      },

      borderColor: {
        blue: {
          primary: "#005EEC",
          hover: "rgba(0,120,250,1)",
        },
        red: {
          primary: "#D25050",
        },
        green: {
          primary: "#00EC26",
          hover: "rgba(89,217,94,1)",
        },
        orange: {
          primary: "#EF9308",
          hover: "rgba(250,177,67,1)",
          disabled: "#EDBC72",
        },
        lime: {
          primary: "rgba(163,230,53,1)",
        },

        delete: "#B81348",
        success: " #13B821",
      },
      flex: {
        one: "1",
        two: "2",
      },
      borderRadius: {
        new: "10px",
      },
    },
  },
  plugins: [],
};
