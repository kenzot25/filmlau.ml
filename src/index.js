import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 4,
//   spaceBetween: 30,
//   //centeredSlides: true,
//   grabCursor: true,
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
// });
