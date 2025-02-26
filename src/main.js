import "./css/style.css";
import { loadFontAwesome } from "./js/global/icons";
import router from "./js/router";

loadFontAwesome();
await router(window.location.pathname);

