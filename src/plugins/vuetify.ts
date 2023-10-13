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
          primary: "#6f59a5",
          secondary: "#5b8bbe",
          success: "#198743",
          error: "#dd3e5e",
          skill: "#21b37d",
          speciality: "#26afce",
          injury: "#ef5a7d",
          grey: "#383c3c", // 羊羹色
        },
      },
    },
  },
});
