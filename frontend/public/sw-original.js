import { precacheAndRoute } from "workbox-precaching";

import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  (event) => event.request.url.includes("font-awesome"),
  new StaleWhileRevalidate({
    cacheName: "font-icons",
  })
);
