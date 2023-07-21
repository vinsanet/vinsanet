import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import "vuetify/styles";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          background: "#fffffc", // 胡粉色
          primary: "#674196", // 菖蒲色
          secondary: "#3e62ad", // 杜若色
          success: "#007b43", // 常磐色
          error: "#c9171e", // 深緋
          skill: "#00a381", // 花緑青
          speciality: "#007bbb", // 紺碧
          injury: "#d9333f", // 紅赤
          grey: "#adadad", // 薄鈍
        },
      },
      dark: {
        colors: {
          background: "#16160e", // 暗黒色
          primary: "#9f7acc",
          secondary: "#687ead",
          success: "#497a64",
          error: "#c9797c",
          skill: "#6db59d",
          speciality: "#70a0ba",
          injury: "#d98288",
          grey: "#383c3c", // 羊羹色
        },
      },
    },
  },
});
