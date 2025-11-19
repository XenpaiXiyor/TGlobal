"use strict";
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var a = 0; a < t.length; a++) {
    var i = t[a];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
function _createClass(e, t, a) {
  return (
    t && _defineProperties(e.prototype, t), a && _defineProperties(e, a), e
  );
}
!(function (e) {
  var t = (function () {
    function t() {
      var a = this;
      _classCallCheck(this, t),
        (this.lazy = null),
        this.captureUTMParams(),
        this.setupLayout(),
        this.setupHeader(),
        this.lazyImages(),
        this.setupOnePageNav(),
        this.handleThemeSwitcher(),
        this.setupCarousels(),
        this.setupGoogleMaps(),
        this.setupJobsSection(),
        this.setupProjectPlannerForm(),
        this.setupWhitePaperForm(),
        this.setupAJAXPagination(),
        this.setupOurApproachBlock(),
        this.setupAccordionModule(),
        this.setupLogosWallModule(),
        this.organizeContactLayout(),
        e(window).on("resize", function () {
          e(document.activeElement).is(":input") || a.organizeContactLayout();
        });
    }
    return (
      _createClass(t, [
        {
          key: "loadGoogleFonts",
          value: function () {
            WebFont.load({ google: { families: ["Manrope:300,400,600,800"] } });
          },
        },
        {
          key: "captureUTMParams",
          value: function () {
            if ("function" == typeof URL) {
              var t = new URL(window.location.href);
              t.searchParams.has("utm_campaign") &&
                e.cookie("utm_campaign", t.searchParams.get("utm_campaign"), {
                  path: "/",
                }),
                t.searchParams.has("utm_medium") &&
                  e.cookie("utm_medium", t.searchParams.get("utm_medium"), {
                    path: "/",
                  }),
                t.searchParams.has("utm_source") &&
                  e.cookie("utm_source", t.searchParams.get("utm_source"), {
                    path: "/",
                  }),
                e("input[name=utm_campaign]").length &&
                  e("input[name=utm_campaign]").each(function () {
                    e(this).val(e.cookie("utm_campaign"));
                  }),
                e("input[name=utm_medium]").length &&
                  e("input[name=utm_medium]").each(function () {
                    e(this).val(e.cookie("utm_medium"));
                  }),
                e("input[name=utm_source]").length &&
                  e("input[name=utm_source]").each(function () {
                    e(this).val(e.cookie("utm_source"));
                  });
            }
          },
        },
        {
          key: "doEqualHeight",
          value: function () {
            e(window).width() > 767
              ? e("section").each(function () {
                  var t = 0;
                  e(".equal-height", this).each(function () {
                    e(this).height() > t && (t = e(this).height());
                  }),
                    e(".equal-height", this).height(t);
                })
              : e("section .equal-height").height("auto");
          },
        },
        {
          key: "setupLayout",
          value: function () {
            var t = this,
              a = e(window);
            e("html").removeClass("no-js"),
              e("input, textarea").attr("autocomplete", "off"),
              -1 != navigator.userAgent.indexOf("Mac OS X") &&
                e("body").addClass("mac"),
              e(
                ".single-portfolio .menu-item-24, .single-portfolio #menu-footer-menu .menu-item-29"
              ).addClass("current-menu-item"),
              e("#content > section:first").addClass("first"),
              e(".section-text h1:first").addClass("hero"),
              e("blockquote").each(function () {
                var t = e(this);
                t.find("p > cite").appendTo(t),
                  t.find("p").wrapInner("<span>"),
                  t.addClass("modified");
              }),
              a.on("resize", function () {
                t.doEqualHeight();
              }),
              this.doEqualHeight(),
              e(document).on("click", function (t) {
                e("form.sent").length &&
                  (e(".wpcf7-form").removeClass("sent").addClass("init"),
                  e(".wpcf7-response-output").html(""));
              }),
              e("#content iframe, #content .llyv")
                .not(".gform_wrapper + iframe")
                .each(function () {
                  var t = e(this);
                  t.parent().hasClass("embed-container") ||
                    t.wrap('<div class="embed-container"></div>');
                });
          },
        },
        {
          key: "setupHeader",
          value: function () {
            e("#menu-header-menu li").each(function (t) {
              var a = t / 15;
              e(this).css("animationDelay", a + "s");
            }),
              e(".mobile-menu-toggler").on("click", function (t) {
                t.preventDefault(),
                  e(".mobile-menu-toggler").toggleClass("is-active"),
                  e("body").toggleClass("is-menu-open");
              }),
              e("html").click(function (t) {
                0 ===
                  e(t.target).closest(
                    "#header nav, .mobile-menu-toggler, #mobile-menu, #desktop-services-menu"
                  ).length &&
                  (e("body").removeClass("is-menu-open"),
                  e(".mobile-menu-toggler").removeClass("is-active"),
                  e("body").removeClass("is-services-open"),
                  e("#header .menu-item-services").removeClass("is-active"));
              }),
              e("#header").midnight(),
              e("#mobile-menu .menu-item-has-children > a").on(
                "click",
                function (t) {
                  t.preventDefault();
                  var a = e(this).parent();
                  a.toggleClass("is-active"), a.find(".sub-menu").fadeToggle();
                }
              ),
              e("#header nav .menu-item-services > a").on(
                "click",
                function (t) {
                  t.preventDefault(),
                    e("#header .menu-item-services").toggleClass("is-active"),
                    e("body").toggleClass("is-services-open"),
                    e(this).blur();
                }
              );
          },
        },
        {
          key: "lazyImages",
          value: function () {
            this.lazy = e(".lazy").lazy({
              threshold: 9999,
              chainable: !1,
              afterLoad: function (t) {
                e(t).addClass("loaded"),
                  e(t)
                    .find("img")
                    .imagesLoaded()
                    .done(function () {
                      e(t).parents(".progressive-image").addClass("loaded");
                    });
              },
              onFinishedAll: function () {
                e("body").addClass("all-images-loaded"),
                  e(window).trigger("all_images_loaded");
              },
            });
          },
        },
        {
          key: "handleThemeSwitcher",
          value: function () {
            var t = this,
              a = t.getCookie("_bilberrry_theme");
            "dark" != a && "light" != a && (a = jsVars.currTheme),
              e("body").addClass("theme-" + a),
              e("body").hasClass("theme-light")
                ? (e("#theme-style-light-css").attr("rel", "stylesheet"),
                  e("#theme-style-dark-css").attr(
                    "rel",
                    "alternate stylesheet"
                  ))
                : (e("#theme-style-dark-css").attr("rel", "stylesheet"),
                  e("#theme-style-light-css").attr(
                    "rel",
                    "alternate stylesheet"
                  )),
              e(".bg-theme-switch").each(function () {
                var t = e(this),
                  i = t.data("img-theme-".concat(a));
                t.css("background-image", "url(" + i + ")");
              });
            var i,
              n = function () {
                var a = e("body"),
                  i = "";
                a.hasClass("theme-light")
                  ? (a.removeClass("theme-light").addClass("theme-dark"),
                    t.setCookie("_bilberrry_theme", "dark"),
                    (i = "dark"),
                    e("#theme-style-dark-css").attr("rel", "stylesheet"),
                    e("#theme-style-light-css").attr(
                      "rel",
                      "alternate stylesheet"
                    ))
                  : (a.removeClass("theme-dark").addClass("theme-light"),
                    t.setCookie("_bilberrry_theme", "light"),
                    (i = "light"),
                    e("#theme-style-light-css").attr("rel", "stylesheet"),
                    e("#theme-style-dark-css").attr(
                      "rel",
                      "alternate stylesheet"
                    )),
                  e(".bg-theme-switch").each(function () {
                    var t = e(this),
                      a = t.data("img-theme-".concat(i));
                    t.css("background-image", "url(" + a + ")");
                  }),
                  t.setupGoogleMaps();
              };
            e(".theme-switcher-link").on("click", function (e) {
              e.preventDefault(), n();
            }),
              (document.onkeyup = function (t) {
                t.ctrlKey &&
                  81 == t.which &&
                  (i
                    ? (clearInterval(i), (i = null), e("#nyan-cat").remove())
                    : ((i = setInterval(function () {
                        n();
                      }, 100)),
                      e("body").append(
                        e(
                          '<img id="nyan-cat" src="/wp-content/themes/bilberrry/assets/images/nyan_cat.gif" style="position: fixed; z-index: 9999; right: 0; top: 50%; transform: translateY(-50%)" alt="">'
                        )
                      )));
              });
          },
        },
        {
          key: "setupCarousels",
          value: function () {
            var t = this,
              a = function (a) {
                var i =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "default",
                  s = e(a);
                switch (n) {
                  case "mobile":
                    e(window).width() <= 1024
                      ? s.each(function () {
                          var t = e(this);
                          e.extend(i, {
                            prevArrow: t
                              .parent()
                              .find(".carousel-pagination .slick-prev"),
                            nextArrow: t
                              .parent()
                              .find(".carousel-pagination .slick-next"),
                          }),
                            t.hasClass("logos-wall-carousel") &&
                              e.extend(i, {
                                responsive: [
                                  {
                                    breakpoint: 1200,
                                    settings: { slidesToShow: 4 },
                                  },
                                  {
                                    breakpoint: 769,
                                    settings: { slidesToShow: 2 },
                                  },
                                ],
                              }),
                            t.hasClass("tech-logos-wall-carousel") &&
                              e.extend(i, {
                                responsive: [
                                  {
                                    breakpoint: 1200,
                                    settings: { slidesToShow: 4 },
                                  },
                                  {
                                    breakpoint: 769,
                                    settings: { slidesToShow: 3 },
                                  },
                                ],
                              }),
                            0 == t.hasClass("slick-initialized") && t.slick(i);
                        })
                      : s.each(function () {
                          var t = e(this);
                          t.hasClass("slick-initialized") && t.slick("unslick");
                        });
                    break;
                  case "testimonials":
                    s.each(function () {
                      var a = e(this);
                      if (0 == a.hasClass("slick-initialized")) {
                        var n = a.closest(".testimonials-carousel-wrapper"),
                          s = a.children().length,
                          o = e.extend({}, i, {
                            prevArrow: n.find(
                              ".carousel-pagination .slick-prev"
                            ),
                            nextArrow: n.find(
                              ".carousel-pagination .slick-next"
                            ),
                          });
                        e(window).width() >= 1024
                          ? s < 4 &&
                            ((o.infinite = !1),
                            (o.autoplay = !1),
                            n.addClass(
                              "testimonials-carousel-wrapper--hide-pagination"
                            ))
                          : s < 1 &&
                            ((o.infinite = !1),
                            (o.autoplay = !1),
                            n.addClass(
                              "testimonials-carousel-wrapper--hide-pagination"
                            )),
                          a
                            .on("init", function () {
                              t.lazyImages();
                            })
                            .on("afterChange", function () {
                              t.lazyImages(), e(window).trigger("scroll");
                            }),
                          a.slick(o);
                      }
                    });
                    break;
                  case "default":
                  default:
                    s.each(function () {
                      var a = e(this);
                      0 == a.hasClass("slick-initialized") &&
                        (e.extend(i, {
                          prevArrow: a
                            .parent()
                            .find(".carousel-pagination .slick-prev"),
                          nextArrow: a
                            .parent()
                            .find(".carousel-pagination .slick-next"),
                          initialSlide: a.find(".slide").length <= 5 ? 0 : 1,
                        }),
                        a
                          .slick(i)
                          .on("init", function () {
                            t.lazyImages();
                          })
                          .on("afterChange", function () {
                            t.lazyImages(), e(window).trigger("scroll");
                          }));
                    });
                }
              },
              i = {
                dots: !1,
                arrows: !0,
                autoplay: !0,
                autoplaySpeed: 2500,
                adaptiveHeight: !1,
                slidesToShow: 5,
                slidesToScroll: 1,
                initialSlide: -1,
                infinite: !0,
                centerMode: !0,
                pauseOnFocus: !0,
                centerPadding: "30px",
                responsive: [
                  { breakpoint: 1200, settings: { slidesToShow: 4 } },
                  { breakpoint: 769, settings: { slidesToShow: 2 } },
                  { breakpoint: 480, settings: { slidesToShow: 1 } },
                ],
              },
              n = {
                dots: !1,
                arrows: !0,
                infinite: !0,
                autoplay: !0,
                autoplaySpeed: 2500,
                adaptiveHeight: !1,
                slidesToShow: 3,
                slidesToScroll: 1,
                lazyLoad: "progressive",
                pauseOnFocus: !1,
                responsive: [
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 430, settings: { slidesToShow: 1 } },
                ],
              },
              s = {
                dots: !1,
                arrows: !0,
                autoplay: !1,
                autoplaySpeed: 3500,
                adaptiveHeight: !0,
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: !0,
                pauseOnFocus: !0,
                pauseOnHover: !0,
                responsive: [
                  {
                    breakpoint: 1200,
                    settings: { slidesToShow: 2, slidesToScroll: 2 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 1, slidesToScroll: 1, dots: !0 },
                  },
                ],
              };
            e(window).on("resize", function () {
              a(".default-carousel", i),
                a(".mobile-carousel", n, "mobile"),
                a(".testimonials-carousel", s, "testimonials");
            }),
              a(".default-carousel", i),
              a(".mobile-carousel", n, "mobile"),
              a(".testimonials-carousel", s, "testimonials"),
              a(
                ".images-carousel",
                {
                  dots: !0,
                  arrows: !1,
                  autoplay: !0,
                  autoplaySpeed: 2500,
                  adaptiveHeight: !1,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: !0,
                  pauseOnFocus: !0,
                  fade: !0,
                },
                "images"
              );
          },
        },
        {
          key: "setupGoogleMaps",
          value: function () {
            if (e("body").hasClass("page-template-page-template-contact")) {
              var t = e("#google-map");
              t.hasClass("map-initializated") && t.html(""),
                t.addClass("map-initializated");
              var a = {
                zoom: t.data("zoom") || 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: !0,
                zoomControl: !0,
              };
              e("body").hasClass("theme-dark") &&
                e.extend(a, { styles: window.googleMapsDarkStyles });
              var i = new google.maps.Map(t[0], a);
              (i.markers = []),
                (function (e, t) {
                  var a = e.data("lat"),
                    i = e.data("lng"),
                    n = { lat: parseFloat(a), lng: parseFloat(i) },
                    s = new google.maps.Marker({ position: n, map: t });
                  t.markers.push(s);
                })(t, i);
              var n = new google.maps.LatLngBounds();
              i.markers.forEach(function (e) {
                n.extend({ lat: e.position.lat(), lng: e.position.lng() });
              }),
                1 == i.markers.length
                  ? i.setCenter(n.getCenter())
                  : i.fitBounds(n);
            }
          },
        },
        {
          key: "setupJobsSection",
          value: function () {
            var t = this;
            e(".section-jobs .button").on("click", function (t) {
              t.preventDefault();
              var a = e(this),
                i = a.parents(".job");
              i.toggleClass("is-open"),
                i.hasClass("is-open") ? a.text("Less") : a.text("More"),
                i.find(".job-details").slideToggle();
            }),
              e(".apply-job-form .attach-file").on("click", function (t) {
                t.preventDefault();
                var a = e(this),
                  i = a.data("type");
                a
                  .parents(".job")
                  .find(".row-paste-text[data-type=" + i + "]")
                  .hide(),
                  a
                    .parents(".job")
                    .find(".row-attach-link[data-type=" + i + "]")
                    .hide(),
                  e(this).parents(".attach").find("input[type=file]").click();
              }),
              e(".apply-job-form input[type=file]").on("change", function (t) {
                var a = e(this).parents(".attach").find(".links"),
                  i = "";
                (i =
                  this.files && this.files.length > 1
                    ? (
                        this.getAttribute("data-multiple-caption") || ""
                      ).replace("{count}", this.files.length)
                    : t.target.value.split("\\").pop()) &&
                  (e(
                    '<span class="file-name">' +
                      i +
                      '<span class="remove"></span></span>'
                  ).insertAfter(a),
                  a.hide());
              }),
              e(".apply-job-form").on(
                "click",
                ".file-name .remove",
                function (t) {
                  t.preventDefault();
                  var a = e(this),
                    i = a.parents(".attach").find("input[type=file]"),
                    n = a.parents(".attach").find(".links"),
                    s = a.parents(".attach").find(".file-name");
                  i.val(""), n.show(), s.remove();
                }
              ),
              e(".apply-job-form .attach-link").on("click", function (t) {
                t.preventDefault();
                var a = e(this),
                  i = a.data("type");
                a.parents(".attach").find("input[type=file]").val(""),
                  a
                    .parents(".job")
                    .find(".row-paste-text[data-type=" + i + "]")
                    .hide(),
                  a
                    .parents(".job")
                    .find(".row-attach-link[data-type=" + i + "]")
                    .show();
              }),
              e(".apply-job-form .paste-text").on("click", function (t) {
                t.preventDefault();
                var a = e(this),
                  i = a.data("type");
                a.parents(".attach").find("input[type=file]").val(""),
                  a
                    .parents(".job")
                    .find(".row-attach-link[data-type=" + i + "]")
                    .hide(),
                  a
                    .parents(".job")
                    .find(".row-paste-text[data-type=" + i + "]")
                    .show();
              }),
              e(".apply-job-form").on("submit", function (a) {
                a.preventDefault();
                var i = e(this),
                  n = i.find("input[name=job_id]").val(),
                  s = i.find(".ajax-loader"),
                  o = i.find(".error"),
                  r = i.find(".required");
                if (s.hasClass("is-active")) return !1;
                if (
                  (o.hide(),
                  r.each(function (a, i) {
                    var n = e(i),
                      s = n.attr("name"),
                      o = e.trim(n.val());
                    ("" == o || ("email" == s && 0 == t.isEmail(o))) &&
                      (n.focus(), n.next(".error").show());
                  }),
                  e.trim(i.find(".row-attach-link[data-type=cv] input").val())
                    .length ||
                    e.trim(
                      i.find(".row-paste-text[data-type=cv] textarea").val()
                    ).length ||
                    0 !=
                      i.find(".attach-cv input[type=file]")[0].files.length ||
                    i.find(".attach-cv[data-type=cv] .error").show(),
                  i.find(".error:visible").length)
                )
                  return !1;
                var l = new FormData(this);
                e.ajax({
                  url: jsVars.ajaxurl,
                  type: "POST",
                  contentType: !1,
                  processData: !1,
                  data: l,
                  beforeSend: function () {
                    s.addClass("is-active");
                  },
                  success: function (e) {
                    s.removeClass("is-active");
                    var a = "success-job-" + n;
                    i
                      .parents(".apply")
                      .html(
                        '<div id="' +
                          a +
                          '" class="apply-success"><h4>Thank you for submitting your CV!</h4><p>We appreciate your interest in the role. Our team will review your application, and if your resume passes the initial screening, we will contact you for the next steps.</p></div>'
                      ),
                      t.scrollToSection(a, 50);
                  },
                  error: function (e, t, a) {
                    var n = e.status + ": " + e.statusText;
                    s.removeClass("is-active"),
                      i
                        .parents(".apply")
                        .html(
                          '<div class="apply-success"><h4>Error...</h4><p>Sorry, something went wrong with a form submission. Please, contact us directly regarding this error. Server response: ' +
                            n +
                            "</p></div>"
                        );
                  },
                });
              });
          },
        },
        {
          key: "setupProjectPlannerForm",
          value: function () {
            var t = this;
            e("#project-planner-form input, #project-planner-form textarea").on(
              "change keyup",
              function (t) {
                e(this)
                  .parents(".form-row")
                  .removeClass("is-error")
                  .find("p.error")
                  .remove();
              }
            );
            var a = function (e, t) {
              var a = t - e.toString().length + 1;
              return Array(+(a > 0 && a)).join("0") + e;
            };
            e("#project-planner-form .date input").on("focus", function () {
              var t = e(this).parents(".date");
              e("#project-planner-form .date")
                .not(t)
                .removeClass("is-active-date"),
                t.addClass("is-active-date");
            }),
              e("#project-planner-form .date input").datepicker({
                changeMonth: !0,
                changeYear: !0,
                showButtonPanel: !0,
                showOtherMonths: !0,
                currentText: "Set today's date",
                dateFormat: "mm/dd/yy",
                dayNamesShort: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ],
                dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                monthNames: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                monthNamesShort: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                beforeShow: function (t, a) {
                  var i = e(t).parents(".date"),
                    n = e.trim(i.find(".month").val()),
                    s = e.trim(i.find(".day").val()),
                    o = e.trim(i.find(".year").val());
                  if ("" != n && "" != s && "" != o) {
                    var r = new Date(n + "/" + s + "/" + o);
                    i.find("input")
                      .val("")
                      .datepicker("option", "defaultDate", new Date(r));
                  }
                  setTimeout(function () {
                    a.dpDiv.css({
                      top:
                        e("#project-planner-form .is-active-date").offset()
                          .top + 15,
                      left: e("#project-planner-form .is-active-date").offset()
                        .left,
                    });
                  }, 1);
                },
                onSelect: function (t) {
                  var i = new Date(t.replace("-", "/")),
                    n = e(this).parents(".date");
                  n.find(".month").val(a(i.getMonth() + 1, 2)),
                    n.find(".day").val(a(i.getDate(), 2)),
                    n.find(".year").val(i.getFullYear());
                },
              }),
              e(document).on(
                "click",
                "button.ui-datepicker-current",
                function (t) {
                  return (
                    t.preventDefault(),
                    e("#ui-datepicker-div .ui-datepicker-today").trigger(
                      "click"
                    ),
                    e("#project-planner-form input").blur(),
                    !1
                  );
                }
              ),
              e("#project-planner-form").on("submit", function (a) {
                a.preventDefault();
                var i = e(this);
                if (
                  (i.find(".form-row").removeClass("is-error"),
                  i.find("p.error").remove(),
                  i.find(".form-row").each(function () {
                    var t = e(this),
                      a = t.data("type"),
                      i = !1;
                    if ("text" == a)
                      "" ==
                        e.trim(t.find("input[type=text], textarea").val()) &&
                        (i = !0);
                    else if ("radio" == a) {
                      var n = t.find("input[type=radio]:checked");
                      n.length
                        ? "Other" == n.val() &&
                          "" == e.trim(t.find("input[type=text]").val()) &&
                          (i = !0)
                        : (i = !0);
                    } else if ("checkbox" == a) {
                      var s = t.find("input[type=checkbox]:checked");
                      s.length
                        ? "Other" == s.val() &&
                          "" == e.trim(t.find("input[type=text]").val()) &&
                          (i = !0)
                        : (i = !0);
                    } else
                      "date" == a &&
                        t.find("input:text").filter(function () {
                          return "" == e.trim(e(this).val());
                        }).length &&
                        (i = !0);
                    if (i) {
                      var o =
                        void 0 !== t.data("custom-text")
                          ? t.data("custom-text")
                          : "This is a required field.";
                      t.addClass("is-error").append(
                        '<p class="error">' + o + "</p>"
                      );
                    }
                  }),
                  i.find(".form-row.is-error").length)
                )
                  e("html, body").animate(
                    {
                      scrollTop: parseInt(
                        i.find(".form-row.is-error:first").offset().top - 130
                      ),
                    },
                    800
                  );
                else {
                  var n = new FormData(this);
                  e.ajax({
                    url: jsVars.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    data: n,
                    beforeSend: function () {
                      i.addClass("is-loading");
                    },
                    success: function (a) {
                      i.removeClass("is-loading"),
                        e("#project-planner").html(
                          '<div class="sent-success"><h2>Thank you</h2><p class="text-bigger">Your submission was received. We’ll get back to you shortly with next steps.</p></div>'
                        ),
                        e("#project-planner-form").remove(),
                        t.scrollToSection("project-planner", 50);
                    },
                  });
                }
              });
          },
        },
        {
          key: "setupWhitePaperForm",
          value: function () {
            var t = this;
            e(".section-white-paper input").on("keyup", function () {
              var a = e(this),
                i = a.val(),
                n = a
                  .parents(".section-white-paper")
                  .find("button[type=submit]"),
                s = a.parents(".section-white-paper").find("input"),
                o = !1;
              "email" != a.attr("type") || t.isEmail(i)
                ? s.each(function () {
                    if ("" == e.trim(e(this).val())) return (o = !0), !1;
                  })
                : (o = !0),
                o ? n.attr("disabled", "disabled") : n.removeAttr("disabled");
            }),
              e(".white-paper-form").each(function () {
                var t = e(this).parents(".section-white-paper");
                e(this).on("submit", function (a) {
                  a.preventDefault();
                  var i = e(this);
                  e.ajax({
                    url: jsVars.ajaxurl,
                    type: "POST",
                    dataType: "json",
                    data: {
                      action: "send_white_paper_form",
                      name: e.trim(i.find(".name").val()),
                      company: e.trim(i.find(".company").val()),
                      email: e.trim(i.find(".email").val()),
                    },
                    beforeSend: function () {
                      i.addClass("is-loading");
                    },
                    success: function (a) {
                      i.removeClass("is-loading"),
                        i
                          .parents(".section-white-paper")
                          .find(".row")
                          .addClass("align-items-center"),
                        i.parents(".block-content").html(a.data.message),
                        e("html, body").animate(
                          { scrollTop: parseInt(t.offset().top - 130) },
                          800
                        );
                    },
                  });
                });
              });
          },
        },
        {
          key: "setupAJAXPagination",
          value: function () {
            var t = this;
            e("#ajax-load-more").on("click", function (a) {
              a.preventDefault();
              var i = e("#ajax-load-more"),
                n = e(i.data("posts-holder")),
                s = n.find("article").length;
              e.ajax({
                url: jsVars.ajaxurl,
                type: "POST",
                dataType: "json",
                data: {
                  action: "theme_load_posts",
                  query: i.attr("data-current-query"),
                  query_type: i.attr("data-query-type"),
                  offset: s,
                },
                beforeSend: function () {
                  n.addClass("is-loading");
                },
                success: function (e) {
                  n.removeClass("is-loading").append(e.html),
                    i.attr("data-current-query", JSON.stringify(e.query)),
                    t.lazyImages(),
                    e.hide_link ? i.hide() : i.show();
                },
              });
            });
          },
        },
        {
          key: "setupOurApproachBlock",
          value: function () {
            var t = this;
            e(".section-our-approach .items-accordion h3").on(
              "click",
              function (t) {
                t.preventDefault();
                var a = e(this),
                  i = a.parent(),
                  n = i.find("h3"),
                  s = a.parents(".section-our-approach"),
                  o = i.find(".item-text");
                s.find("h3").not(n).removeClass("is-active"),
                  s.find(".item-text").not(o).hide(),
                  a.toggleClass("is-active"),
                  o.fadeToggle();
              }
            ),
              e(".section-our-approach .items-carousel").each(function () {
                var a = e(this);
                a.slick({
                  dots: !1,
                  slidesToShow: 1,
                  infinite: !0,
                  adaptiveHeight: !1,
                  prevArrow: a.parent().find(".slider-pagination .prev"),
                  nextArrow: a.parent().find(".slider-pagination .next"),
                }),
                  a.on("init reInit afterChange", function (e, i, n, s) {
                    var o = a.parent().find(".pages"),
                      r = t.pad((n || 0) + 1, 2),
                      l = t.pad(i.slideCount, 2);
                    o.html("".concat(r, " <span>/ ").concat(l, "</span>"));
                  });
              });
          },
        },
        { key: "changeRecaptchaTheme", value: function () {} },
        {
          key: "organizeContactLayout",
          value: function () {
            if (e("body").hasClass("page-template-page-template-contact")) {
              var t = e(window).width(),
                a = e("#text-row"),
                i = e("#clutch-row"),
                n = e("#gmap-row"),
                s = e("#form-row"),
                o = e("#cf-col");
              t <= 767
                ? (s.insertAfter(a), n.appendTo(o), i.appendTo(o))
                : (s.appendTo(o), n.insertAfter(a), i.insertAfter(n));
            }
          },
        },
        {
          key: "setupAccordionModule",
          value: function () {
            e(".faq-accordion .item-title").on("click", function (t) {
              t.preventDefault();
              var a = e(this),
                i = a.parents(".item"),
                n = a.parents(".items"),
                s = i.find(".item-text");
              n.find(".is-active .item-text").not(s).hide(),
                n.find(".item.is-active").not(i).removeClass("is-active"),
                i.toggleClass("is-active"),
                s.fadeToggle("fast");
            });
          },
        },
        { key: "setupLogosWallModule", value: function () {} },
        {
          key: "setupOnePageNav",
          value: function () {
            var t = e('#content a[href*="#!/"]'),
              a = window.location.hash,
              i = this;
            if (
              (t.on("click", function (t) {
                t.preventDefault();
                var a = e(this).attr("href").split("#!/")[1];
                i.scrollToSection(a, 130);
              }),
              -1 !== a.indexOf("#!/"))
            ) {
              var n = a.split("#!/")[1];
              i.scrollToSection(n, 130);
            }
          },
        },
        {
          key: "scrollToSection",
          value: function (t, a) {
            var i = e("#" + t);
            i.length &&
              e("html, body").animate(
                { scrollTop: parseInt(i.offset().top - a) },
                800,
                function () {
                  window.location.hash = "#!/" + t;
                }
              );
          },
        },
        {
          key: "setCookie",
          value: function (e, t, a) {
            var i = "";
            if (a) {
              var n = new Date();
              n.setTime(n.getTime() + 24 * a * 60 * 60 * 1e3),
                (i = "; expires=" + n.toUTCString());
            }
            document.cookie =
              e + "=" + (t || "") + i + "; SameSite=Strict; path=/";
          },
        },
        {
          key: "getCookie",
          value: function (e) {
            for (
              var t = e + "=", a = document.cookie.split(";"), i = 0;
              i < a.length;
              i++
            ) {
              for (var n = a[i]; " " == n.charAt(0); )
                n = n.substring(1, n.length);
              if (0 == n.indexOf(t)) return n.substring(t.length, n.length);
            }
            return null;
          },
        },
        {
          key: "isEmail",
          value: function (e) {
            return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
              e
            );
          },
        },
        {
          key: "pad",
          value: function (e, t) {
            for (e = e.toString(); e.length < t; ) e = "0" + e;
            return e;
          },
        },
      ]),
      t
    );
  })();
  window.ThemeFront = new t();
})(window.jQuery);
