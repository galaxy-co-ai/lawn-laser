/**
 * Elite Lawn Care — Embeddable Quote Widget Loader
 *
 * Usage:
 *   <div id="elite-quote-widget"></div>
 *   <script src="https://weedcontrolokc.com/widget.js"></script>
 *
 * Options (data attributes on the container div):
 *   data-services="fertilization,weed-control"  — Pre-select services
 *   data-area="oklahoma-city-ok"                 — Pre-select service area
 *   data-accent="#2d6a2e"                        — Custom accent color (hex)
 *   data-height="700"                            — Initial iframe height in px
 *
 * Events (dispatched on the container element):
 *   lawn-laser:ready          — Widget loaded and ready
 *   lawn-laser:quote-complete — Quote generated { detail: { totalPrice, itemCount } }
 *   lawn-laser:resize         — Widget height changed { detail: { height } }
 */
(function () {
  "use strict";

  var WIDGET_ORIGIN = (function () {
    var scripts = document.getElementsByTagName("script");
    var src = scripts[scripts.length - 1].src;
    var url = new URL(src);
    return url.origin;
  })();

  var container =
    document.getElementById("elite-quote-widget") ||
    document.currentScript.parentElement;

  if (!container) {
    console.error("[Elite Widget] No container element found.");
    return;
  }

  // Read configuration from data attributes
  var services = container.getAttribute("data-services") || "";
  var area = container.getAttribute("data-area") || "";
  var accent = container.getAttribute("data-accent") || "";
  var initialHeight = parseInt(container.getAttribute("data-height") || "700", 10);

  // Build widget URL with params
  var widgetUrl = WIDGET_ORIGIN + "/widget";
  var params = [];
  if (services) params.push("services=" + encodeURIComponent(services));
  if (area) params.push("area=" + encodeURIComponent(area));
  if (accent) params.push("accent=" + encodeURIComponent(accent));
  if (params.length) widgetUrl += "?" + params.join("&");

  // Create iframe
  var iframe = document.createElement("iframe");
  iframe.src = widgetUrl;
  iframe.style.cssText =
    "width:100%;border:none;overflow:hidden;display:block;min-height:200px;";
  iframe.style.height = initialHeight + "px";
  iframe.setAttribute("title", "Elite Lawn Care Quote Widget");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute(
    "allow",
    "geolocation"
  );

  container.appendChild(iframe);

  // Listen for PostMessage events from the widget
  window.addEventListener("message", function (event) {
    // Only accept messages from our widget origin
    if (event.origin !== WIDGET_ORIGIN) return;
    if (!event.data || typeof event.data.type !== "string") return;

    var type = event.data.type;

    if (type === "lawn-laser:resize") {
      var height = event.data.height;
      if (typeof height === "number" && height > 0) {
        iframe.style.height = height + "px";
        container.dispatchEvent(
          new CustomEvent("lawn-laser:resize", { detail: { height: height } })
        );
      }
    }

    if (type === "lawn-laser:ready") {
      container.dispatchEvent(new CustomEvent("lawn-laser:ready"));
    }

    if (type === "lawn-laser:quote-complete") {
      container.dispatchEvent(
        new CustomEvent("lawn-laser:quote-complete", {
          detail: {
            totalPrice: event.data.totalPrice,
            itemCount: event.data.itemCount,
          },
        })
      );
    }
  });
})();
