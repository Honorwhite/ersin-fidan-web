(function ($) {
  "use strict";

  // update 18-05-2022
  function SmoothMenuScroll2() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "70";
        } else {
          var headerH = "70";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
            scrollTop: $(target.attr("href")).offset().top - headerH + "px"
          },
            1200,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll2();

  function OnePageMenuScrollTwo() {
    var windowScroll = $(window).scrollTop();
    var menuWrapper = $(".one-page-scroll-menu");
    if (windowScroll >= 100) {
      menuWrapper
        .find(".scrollToLink")
        .find("a")
        .each(function () {
          // grabing section id dynamically
          var sections = $(this).attr("href");
          $(sections).each(function () {
            // checking is scroll bar are in section
            if ($(this).offset().top <= windowScroll + 500) {
              // grabing the dynamic id of section
              var Sectionid = $(sections).attr("id");
              // removing current class from others
              menuWrapper.find("li").removeClass("current");
              // adding current class to related navigation
              menuWrapper
                .find("a[href*=\\#" + Sectionid + "]")
                .parent()
                .addClass("current");
              menuWrapper.attr("data-section-class", "");
              menuWrapper.attr("data-section-class", Sectionid);
            }
          });
        });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  // update 01-10-2021

  if ($("#switch-toggle-tab").length) {
    var toggleSwitch = $("#switch-toggle-tab label.switch");
    var TabTitle = $("#switch-toggle-tab li");
    var monthTabTitle = $("#switch-toggle-tab li.month");
    var yearTabTitle = $("#switch-toggle-tab li.year");
    var monthTabContent = $("#month");
    var yearTabContent = $("#year");
    // hidden show deafult;
    monthTabContent.show();
    yearTabContent.hide();

    function toggleHandle() {
      if (toggleSwitch.hasClass("on")) {
        yearTabContent.hide();
        monthTabContent.show();
        monthTabTitle.addClass("active");
        yearTabTitle.removeClass("active");
      } else {
        monthTabContent.hide();
        yearTabContent.show();
        yearTabTitle.addClass("active");
        monthTabTitle.removeClass("active");
      }
    }
    monthTabTitle.on("click", function () {
      toggleSwitch.addClass("on").removeClass("off");
      toggleHandle();
      return false;
    });
    yearTabTitle.on("click", function () {
      toggleSwitch.addClass("off").removeClass("on");
      toggleHandle();
      return false;
    });
    toggleSwitch.on("click", function () {
      toggleSwitch.toggleClass("on off");
      toggleHandle();
    });
  }

  // dynamically add current menu class to menu
  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu .navigation").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu .navigation");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".checkout__payment__title").length) {
    $(".checkout__payment__item").find(".checkout__payment__content").hide();
    $(".checkout__payment__item--active")
      .find(".checkout__payment__content")
      .show();

    $(".checkout__payment__title").on("click", function (e) {
      e.preventDefault();

      $(this)
        .parents(".checkout__payment")
        .find(".checkout__payment__item")
        .removeClass("checkout__payment__item--active");
      $(this)
        .parents(".checkout__payment")
        .find(".checkout__payment__content")
        .slideUp();

      $(this).parent().addClass("checkout__payment__item--active");
      $(this).parent().find(".checkout__payment__content").slideDown();
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");
    var priceRangeMin = $(".range-slider-price").data("range-min");
    var priceRangeMax = $(".range-slider-price").data("range-max");
    var priceRangeStartMin = $(".range-slider-price").data("start-min");
    var priceRangeStartMax = $(".range-slider-price").data("start-max");
    var priceRangeLimit = $(".range-slider-price").data("limit");

    noUiSlider.create(priceRange, {
      start: [priceRangeStartMin, priceRangeStartMax],
      limit: priceRangeLimit,
      behaviour: "drag",
      connect: true,
      format: wNumb({
        decimals: 0
      }),
      range: {
        min: priceRangeMin,
        max: priceRangeMax
      }
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  if ($(".add").length) {
    $(".add").on("click", function () {
      if ($(this).prev().val() < 999) {
        $(this)
          .prev()
          .val(+$(this).prev().val() + 1);
      }
    });
  }

  if ($(".sub").length) {
    $(".sub").on("click", function () {
      if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1)
          $(this)
            .next()
            .val(+$(this).next().val() - 1);
      }
    });
  }

  if ($(".countdown-one__list").length) {
    let mainDate = $(".countdown-one__list").data("deadline-date");
    let yearsCondition =
      undefined == $(".countdown-one__list").data("enable-years") ?
        false :
        $(".countdown-one__list").data("enable-years");
    let daysCondition =
      undefined == $(".countdown-one__list").data("enable-days") ?
        true :
        $(".countdown-one__list").data("enable-days");
    let leadingZeros = $(".countdown-one__list").data("leading-zeros");
    console.log(daysCondition);
    let deadLine =
      "dynamicDate" == mainDate ?
        new Date(Date.parse(new Date()) + 31 * 24 * 60 * 60 * 1000) :
        "dynamicHour" == mainDate ?
          new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000) :
          mainDate;

    $(".countdown-one__list").countdown({
      date: deadLine,
      leadingZeros: true,
      render: function (date) {
        this.el.innerHTML =
          (true == yearsCondition ?
            "<li> <span class='years'> " +
            (true == leadingZeros ?
              this.leadingZeros(date.years) :
              date.years) +
            " <i> Years </i> </span> </li>" :
            " ") +
          (true == daysCondition ?
            "<li> <span class='days'> " +
            (true == leadingZeros ?
              this.leadingZeros(date.days) :
              date.days) +
            " <i> Days </i> </span> </li>" :
            " ") +
          "<li> <span class='hours'>" +
          (true == leadingZeros ? this.leadingZeros(date.hours) : date.hours) +
          " <i> Hours </i> </span> </li>" +
          "<li> <span class='minutes'> " +
          (true == leadingZeros ? this.leadingZeros(date.min) : date.min) +
          " <i> Minutes </i> </span> </li>" +
          "<li> <span class='seconds'>" +
          (true == leadingZeros ? this.leadingZeros(date.sec) : date.sec) +
          " <i> Seconds </i> </span> </li>";
      }
    });
  }

  // boxed layout switcher
  if ($(".boxed-switcher").length) {
    $(".boxed-switcher").on("click", function () {
      $("body").toggleClass("boxed-wrapper");
      $(".page-wrapper").toggleClass("boxed-wrapper");
    });
  }

  if ($(".dark-switcher").length) {
    $(".dark-switcher").on("click", function (e) {
      e.preventDefault();
      $("body").toggleClass("body-dark");
    });
  }

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".preloader").length) {
      $("body").addClass("page-loaded");
      $(".preloader").delay(300).fadeOut(0);
    }
  }

  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var sticky_header = $(".main-header .sticky-header");
      if (windowpos > 120) {
        siteHeader.addClass("");
        sticky_header.addClass("animated slideInDown");
      } else {
        siteHeader.removeClass("fixed-header");
        sticky_header.removeClass("animated slideInDown");
      }
    }
  }

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown > a").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>'
    );
  }

  //Mobile Nav Hide Show
  if ($(".side-menu__block").length) {
    var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
    var mobileNavContainer = $(".mobile-nav__container");
    mobileNavContainer.append(mobileMenuContent);

    //Dropdown Button
    mobileNavContainer
      .find("li.dropdown .dropdown-btn")
      .on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(this).parent("a").parent("li").children("ul").slideToggle(500);
      });
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $(".side-menu__block").addClass("active");
    });

    $(".side-menu__block-overlay,.side-menu__toggler, .scrollToLink").on(
      "click",
      function (e) {
        $(".side-menu__block").removeClass("active");
        e.preventDefault();
      }
    );
  }

  //Search Popup
  if ($(".search-popup").length) {
    //Show Popup
    $(".search-toggler").on("click", function () {
      $(".search-popup").addClass("active");
    });
    //Hide Popup
    $(".search-popup__overlay").on("click", function (e) {
      $(".search-popup").removeClass("active");
      e.preventDefault();
    });
    //Hide Popup
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $(".search-popup").addClass("active");
      }
    });
  }

  //Custom Cursor
  if ($(".custom-cursor__overlay").length) {
    // / cursor /
    var cursor = $(".custom-cursor__overlay .cursor"),
      follower = $(".custom-cursor__overlay .cursor-follower");

    var posX = 0,
      posY = 0;

    var mouseX = 0,
      mouseY = 0;

    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
          css: {
            left: posX - 22,
            top: posY - 22
          }
        });

        TweenMax.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY
          }
        });
      }
    });

    $(document).on("mousemove", function (e) {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      mouseX = e.pageX;
      mouseY = e.pageY - scrollTop;
    });
    $("button, a").on("mouseenter", function () {
      cursor.addClass("active");
      follower.addClass("active");
    });
    $("button, a").on("mouseleave", function () {
      cursor.removeClass("active");
      follower.removeClass("active");
    });
    $(".custom-cursor__overlay").on("mouseenter", function () {
      cursor.addClass("close-cursor");
      follower.addClass("close-cursor");
    });
    $(".custom-cursor__overlay").on("mouseleave", function () {
      cursor.removeClass("close-cursor");
      follower.removeClass("close-cursor");
    });
  }

  //Main Slider / Banner Carousel
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      loop: true,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 10000,
      autoplayTimeout: 11000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 1
        },
        992: {
          items: 1
        }
      }
    });
  }

  // Instagram Section Logic
  const instaData = {
    1: {
      img: 'images/sosyal/post1.jpg',
      link: 'https://www.instagram.com/p/DHJMh75NWVX/',
      content: `👨‍⚕️ <strong>El ve Bilek Ağrılarınızı Hafife Almayın! 🤲⚠️</strong><br><br>
      Günlük hayatta sık kullandığımız el ve bileklerdeki ağrılar, ciddi sağlık sorunlarının habercisi olabilir!🚨<br><br>
      Olası Nedenler:<br>
      🔹 Karpal Tünel Sendromu (Sinir sıkışması)<br>
      🔹 Tendinit (Tendon iltihabı)<br>
      🔹 Kireçlenme (Osteoartrit)<br>
      🔹 Travmalar ve Zorlanmalar<br>
      🔹 Romatoid Artrit<br><br>
      🩺 Ne Yapmalısınız?<br>
      ✔️ Tekrarlayan hareketlerden kaçının.<br>
      ✔️ Bileğinizi destekleyen ateller kullanın.<br>
      ✔️ Ağrıyan bölgeye buz uygulayarak şişliği azaltın.<br>
      ✔️ Geçmeyen ağrılar için mutlaka bir uzmana danışın!<br><br>
      🔗 Erken müdahale ile el ve bilek sağlığınızı koruyabilirsiniz! 🌟`
    },
    2: {
      img: 'images/sosyal/post2.jpg',
      link: 'https://www.instagram.com/p/DW9IZCHjdMI/',
      content: `Kopan bir parmak her zaman kaybedilmiş değildir.<br><br>
      Günümüzde mikrocerrahi teknikleri sayesinde, uygun koşullarda kopan uzuvların yeniden yerine dikilmesi mümkün olabilmektedir.<br><br>
      Ancak burada en kritik nokta: zaman.<br>
      İlk saatlerde yapılan doğru müdahale, tedavi başarısını doğrudan etkiler.<br><br>
      ❗ En sık yapılan hata ise kopan parçanın yanlış taşınmasıdır.<br>
      Doğru yaklaşım:<br>
      • Nemli ve temiz bir bezle sarılması<br>
      • Su geçirmez bir torbaya konulması<br>
      • Bu torbanın buzlu su içerisine yerleştirilmesi<br>
      🚫 Direkt buz temasından kaçınılmalıdır<br><br>
      Mikrocerrahi; yalnızca kopma durumlarında değil, damar ve sinir yaralanmaları ile kompleks el travmalarında da önemli bir tedavi yöntemidir.<br><br>
      Unutmayın;<br>
      erken ve doğru müdahale, fonksiyon kaybını önleyebilir ve yaşam kalitesini koruyabilir.<br><br>
      📞 Detaylı bilgi ve değerlendirme için iletişime geçebilirsiniz.<br><br>
      ⸻<br><br>
      Bu içerik bilgilendirme amaçlıdır. Tanı ve tedavi için mutlaka hekiminize başvurunuz.`
    },
    3: {
      img: 'images/sosyal/post3.jpg',
      link: 'https://www.instagram.com/p/DHbUq1VtjiN/',
      content: `💪 Omuz Sağlığınızı Korumak İçin 5 Kritik Bilgi! 🚨 Kaydır ve Öğren! 👇<br><br>
      ⸻<br><br>
      📌 1. Omuz Ağrınız Sürekli mi? Dikkat!<br><br>
      🔹 “Günlük hareketlerden sonra biraz ağrı normaldir” diye düşünüyor olabilirsiniz…<br>
      🔹 Ama tekrarlayan veya geceleri artan ağrılar, rotator manşet yırtığı veya omuz sıkışma sendromu belirtisi olabilir!<br><br>
      ⸻<br><br>
      📌 2. Omuz Sıkışma Sendromu Nedir?<br><br>
      🔹 Kolunuzu yukarı kaldırırken şiddetli ağrı ve güçsüzlük mü hissediyorsunuz?<br>
      🔹 Bu durum, omuz eklemindeki kasların sıkışması sonucu oluşur ve tedavi edilmezse ilerleyebilir!<br>
      🔹 Öneri: Aşırı yüklenmeden kaçının, omuz kaslarınızı güçlendiren egzersizler yapın.<br><br>
      ⸻<br><br>
      📌 3. Omuz Çıkığı Ciddiye Alınmalı mı?<br><br>
      🔹 Tekrar eden omuz çıkıkları, eklem bağlarının zayıflamasıyla kalıcı hale gelebilir!<br>
      🔹 Sporcularda ve aktif yaşam sürenlerde sık görülür, tedavi edilmezse kronik instabiliteye yol açabilir.<br>
      🔹 Öneri: İlk çıkık sonrası mutlaka ortopedi uzmanına danışın ve rehabilitasyonu ihmal etmeyin.<br><br>
      ⸻<br><br>
      📌 4. Donuk Omuz Sendromu: Hareket Kısıtlılığına Dikkat!<br><br>
      🔹 Omuz hareketleriniz zamanla kısıtlanıyor mu? Kolunuzu kaldırırken zorlanıyor musunuz?<br>
      🔹 Donuk omuz, eklem kapsülünün iltihaplanmasıyla hareket kaybına neden olan bir rahatsızlıktır.<br>
      🔹 Öneri: Erken dönemde fizik tedaviye başlamak ve omuzunuzu hareketsiz bırakmamak çok önemlidir!<br><br>
      ⸻<br><br>
      📌 5. Omuz Ağrılarının Çözümü Var mı?<br><br>
      🔹 Fizik tedavi, PRP ve cerrahi müdahale gibi birçok çözüm mevcut!<br>
      🔹 Tedavide geç kalmamak için erken teşhis hayati önem taşır.<br><br>
      ⸻<br><br>
      💬 Omuz ağrıları yaşam kalitenizi düşürmesin! Doğru tedavi ile sağlıklı hareket edin.<br>
      Daha fazla bilgi ve randevu için bizimle iletişime geçin! 🚀<br><br>
      📩 Randevu ve detaylı bilgi için: @op.dr.ersinfidan`
    },
    4: {
      img: 'images/sosyal/post4.jpg',
      link: 'https://www.instagram.com/p/DHv0_acN2fl/',
      content: `“Sürekli El Bileği Ağrısı Normal mi? 🤲⚠️”<br><br>
      El bileğinizde sürekli ağrı, uyuşma veya güçsüzlük hissediyorsanız, bu durumu hafife almayın! Kronik el bileği ağrısının altında farklı sağlık sorunları yatıyor olabilir.<br><br>
      🚨 Olası Nedenler:<br>
      🔹 Karpal Tünel Sendromu (Sinir sıkışması)<br>
      🔹 Tendinit (Tendon iltihabı)<br>
      🔹 Eklem Kireçlenmesi (Osteoartrit)<br>
      🔹 Travmalar ve Zorlanmalar<br>
      🔹 Ganglion Kisti (Bilekte şişlik ile kendini gösterir)<br><br>
      🩺 Ne Yapmalısınız?<br>
      ✔️ Tekrarlayan hareketleri azaltın, bileğinizi dinlendirin.<br>
      ✔️ Buz uygulayarak iltihaplanmayı önleyin.<br>
      ✔️ Bileği destekleyen ateller kullanın.<br>
      ✔️ Geçmeyen ağrılar için bir uzmana danışın!<br><br>
      🔗 Unutmayın: Sürekli devam eden ağrı bir hastalığın habercisi olabilir, erken müdahale ile ciddi sorunların önüne geçebilirsiniz! 🌟`
    },
    5: {
      img: 'images/sosyal/post5.jpg',
      link: 'https://www.instagram.com/p/DH8T1uPtBkD/',
      content: `“Diz Ağrınızın Sebebi Ne Olabilir? 🦵⚠️”<br><br>
      Diz ağrısı, günlük yaşam kalitesini düşüren yaygın bir sorundur. Ağrının kaynağını bilmek, doğru tedavi için çok önemlidir!<br><br>
      🚨 Olası Nedenler:<br>
      🔹 Menisküs Yırtığı – Dizde kilitlenme ve ani ağrı<br>
      🔹 Ön Çapraz Bağ Yaralanması – Spor sırasında dizde kopma hissi<br>
      🔹 Kireçlenme (Osteoartrit) – Sabah tutukluğu ve hareketle artan ağrı<br>
      🔹 Kondromalazi Patella (Koşucu Dizi) – Merdiven çıkarken ağrı<br>
      🔹 Romatoid Artrit – Sabahları sertlik ve şişlik<br>
      🔹 Patellar Tendinit – Diz kapağının altında ağrı<br><br>
      🩺 Ne Yapmalısınız?<br>
      ✔️ Dizi zorlayan hareketlerden kaçının.<br>
      ✔️ Buz uygulayarak şişliği azaltın.<br>
      ✔️ Diz kaslarını güçlendiren egzersizler yapın.<br>
      ✔️ Şikayetler devam ediyorsa bir uzmana danışın!<br><br>
      🔗 Unutmayın: Erken teşhis ile diz sağlığınızı koruyabilirsiniz! 🌟`
    },
    6: {
      img: 'images/sosyal/post6.jpg',
      link: 'https://www.instagram.com/p/DHbUq1VtjiN/',
      content: `💪 Omuz Sağlığınızı Korumak İçin 5 Kritik Bilgi! 🚨 Kaydır ve Öğren! 👇<br><br>
      ⸻<br><br>
      📌 1. Omuz Ağrınız Sürekli mi? Dikkat!<br><br>
      🔹 “Günlük hareketlerden sonra biraz ağrı normaldir” diye düşünüyor olabilirsiniz…<br>
      🔹 Ama tekrarlayan veya geceleri artan ağrılar, rotator manşet yırtığı veya omuz sıkışma sendromu belirtisi olabilir!<br><br>
      ⸻<br><br>
      📌 2. Omuz Sıkışma Sendromu Nedir?<br><br>
      🔹 Kolunuzu yukarı kaldırırken şiddetli ağrı ve güçsüzlük mü hissediyorsunuz?<br>
      🔹 Bu durum, omuz eklemindeki kasların sıkışması sonucu oluşur ve tedavi edilmezse ilerleyebilir!<br>
      🔹 Öneri: Aşırı yüklenmeden kaçının, omuz kaslarınızı güçlendiren egzersizler yapın.<br><br>
      ⸻<br><br>
      📌 3. Omuz Çıkığı Ciddiye Alınmalı mı?<br><br>
      🔹 Tekrar eden omuz çıkıkları, eklem bağlarının zayıflamasıyla kalıcı hale gelebilir!<br>
      🔹 Sporcularda ve aktif yaşam sürenlerde sık görülür, tedavi edilmezse kronik instabiliteye yol açabilir.<br>
      🔹 Öneri: İlk çıkık sonrası mutlaka ortopedi uzmanına danışın ve rehabilitasyonu ihmal etmeyin.<br><br>
      ⸻<br><br>
      📌 4. Donuk Omuz Sendromu: Hareket Kısıtlılığına Dikkat!<br><br>
      🔹 Omuz hareketleriniz zamanla kısıtlanıyor mu? Kolunuzu kaldırırken zorlanıyor musunuz?<br>
      🔹 Donuk omuz, eklem kapsülünün iltihaplanmasıyla hareket kaybına neden olan bir rahatsızlıktır.<br>
      🔹 Öneri: Erken dönemde fizik tedaviye başlamak ve omuzunuzu hareketsiz bırakmamak çok önemlidir!<br><br>
      ⸻<br><br>
      📌 5. Omuz Ağrılarının Çözümü Var mı?<br><br>
      🔹 Fizik tedavi, PRP ve cerrahi müdahale gibi birçok çözüm mevcut!<br>
      🔹 Tedavide geç kalmamak için erken teşhis hayati önem taşır.<br><br>
      ⸻<br><br>
      💬 Omuz ağrıları yaşam kalitenizi düşürmesin! Doğru tedavi ile sağlıklı hareket edin.<br>
      Daha fazla bilgi ve randevu için bizimle iletişime geçin! 🚀<br><br>
      📩 Randevu ve detaylı bilgi için: @op.dr.ersinfidan`
    },
    7: {
      img: 'images/sosyal/post7.jpg',
      link: 'https://www.instagram.com/p/DILeB66tQVC/',
      content: `“Acil Müdahalelerde 7/24 Yanınızdayız! 🚨🩺”<br><br>
      El, bilek, diz ve travma gibi acil durumlarda her saniye önemlidir!<br>
      Bu yüzden 7 gün 24 saat boyunca uzman ekibimizle yanınızdayız.<br><br>
      Ani gelişen kesiler, damar - sinir yaralanmaları, kırıklar, çıkıklar ya da spor yaralanmaları gibi durumlarda zamanında müdahale, uzvun kurtarılmasını, fonksiyonun korunmasını ve iyileşme sürecinin kısalmasını sağlar.<br><br>
      📞 İhtiyacınız olduğunda bir telefon kadar yakınız.`
    }
  };


  window.openInstaModal = function (id) {
    const post = instaData[id];
    if (post) {
      $('#modalInstaImage').attr('src', post.img);
      $('#modalInstaBody').html(post.content);
      $('.insta-modal-btn').attr('href', post.link); // Set specific link
      $('#instaModal').addClass('active');
      $('body').css('overflow', 'hidden');
    }
  };

  window.closeInstaModal = function () {
    $('#instaModal').removeClass('active');
    $('body').css('overflow', '');
  };

  // Close on ESC
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27) closeInstaModal();
  });

  // Instagram Carousel Init
  if ($(".instagram-carousel").length) {
    $(".instagram-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      smartSpeed: 700,
      autoplay: true,
      autoplayTimeout: 4000,
      dots: false,
      responsive: {
        0: { items: 2 },
        600: { items: 3 },
        992: { items: 4 },
        1200: { items: 5 }
      }
    });
  }



  //portfolio horizontal
  if ($(".portfolio-horizontal__carousel").length) {
    $(".portfolio-horizontal__carousel").owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      dots: false,
      navText: [
        '<span class="icon nav-button-left"></span>',
        '<span class="icon nav-button-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 4
        },
        1500: {
          items: 4
        },
        1600: {
          items: 4
        }
      }
    });
  }

  //portfolio horizontal
  if ($(".portfolio-horizontal-two__carousel").length) {
    var myCarousel = $(".portfolio-horizontal-two__carousel");
    var textCountWrap = $(".portfolio-horizontal-two__carousel__count");
    var dotsBlock = $(".portfolio-horizontal-two__carousel__progress");

    myCarousel
      .on("initialized.owl.carousel changed.owl.carousel", function (e) {
        var carousel = e.relatedTarget;
        console.log(carousel);

        if (!e.namespace) {
          return;
        }
        var text =
          '<span class="current-number">' +
          "0" +
          (carousel.relative(carousel.current()) + 1) +
          "</span>" +
          '<span class="sep">/</span>' +
          '<span class="counted-number">' +
          "0" +
          carousel.items().length +
          "</span>";
        textCountWrap.html(text);

        var dotIndex = carousel.relative(carousel.current());
        dotsBlock.find("li").removeClass("active");
        dotsBlock.find("li").eq(dotIndex).addClass("active");
      })
      .owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        smartSpeed: 700,
        autoplay: 5000,
        autoplayTimeout: 5000,
        dots: false,
        navText: [
          '<span class="icon nav-button-left"></span>',
          '<span class="icon nav-button-right"></span>'
        ],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2,
            margin: 30
          },
          992: {
            items: 3,
            margin: 30
          },
          1200: {
            items: 4,
            margin: 40
          },
          1500: {
            items: 4,
            margin: 50
          },
          1600: {
            items: 5,
            margin: 50
          }
        }
      });

    dotsBlock.on("click", "li", function (e) {
      myCarousel.trigger("to.owl.carousel", [$(this).index(), 300]);
    });
  }

  //Team Carousel
  if ($(".team-carousel").length) {
    $(".team-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 4
        },
        1500: {
          items: 4
        },
        1600: {
          items: 5
        }
      }
    });
  }

  //Team Carousel
  if ($(".team-carousel__one-page").length) {
    $(".team-carousel__one-page").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        },
        1500: {
          items: 3
        },
        1600: {
          items: 3
        }
      }
    });
  }

  //Sponsors Carousel
  if ($(".sponsors-carousel").length) {
    $(".sponsors-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        },
        1200: {
          items: 5
        }
      }
    });
  }

  //Project Carousel
  if ($(".project-carousel").length) {
    $(".project-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        },
        1500: {
          items: 4
        },
        1600: {
          items: 4
        }
      }
    });
  }

  //Project Carousel
  if ($(".project-carousel-two").length) {
    $(".project-carousel-two").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        }
      }
    });
  }

  //Testimonial Carousel
  if ($(".testimonials-carousel").length) {
    $(".testimonials-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        768: {
          items: 1
        },
        992: {
          items: 2
        },
        1200: {
          items: 2
        }
      }
    });
  }

  //Testimonial Carousel
  if ($(".testimonials-carousel-two").length) {
    $(".testimonials-carousel-two").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        768: {
          items: 1
        },
        1200: {
          items: 1
        }
      }
    });
  }

  if ($(".testimonials-four-carousel").length) {
    $(".testimonials-four-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      smartSpeed: 700,
      autoplay: 5000,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        768: {
          items: 2
        },
        1200: {
          items: 3
        }
      }
    });
  }

  //Single Item Carousel
  if ($(".single-item-carousel").length) {
    $(".single-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 5000,
      autoplayTimeout: 5000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 1
        },
        1024: {
          items: 1
        }
      }
    });
  }

  // Donation Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
      accY: -50
    }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
      accY: 0
    }
    );
  }

  //Jquery Knob animation
  if ($(".dial").length) {
    $(".dial").appear(
      function () {
        var elm = $(this);
        var color = elm.attr("data-fgColor");
        var perc = elm.attr("value");
        var thickness = elm.attr("data-thickness");

        elm.knob({
          value: 0,
          min: 0,
          max: 100,
          skin: "tron",
          readOnly: true,
          thickness: thickness,
          dynamicDraw: true,
          displayInput: false
        });

        $({
          value: 0
        }).animate({
          value: perc
        }, {
          duration: 2000,
          easing: "swing",
          progress: function () {
            elm.val(Math.ceil(this.value)).trigger("change");
          }
        });
      }, {
      accY: 0
    }
    );
  }

  //Tabs Box
  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  //Product Tabs
  if ($(".project-tab").length) {
    $(".project-tab .product-tab-btns .p-tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).hasClass("actve-tab")) {
        return false;
      } else {
        $(".project-tab .product-tab-btns .p-tab-btn").removeClass(
          "active-btn"
        );
        $(this).addClass("active-btn");
        $(".project-tab .p-tabs-content .p-tab").removeClass("active-tab");
        $(target).addClass("active-tab");
      }
    });
  }

  //Accordion Box
  if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".accordion-box");
      var target = $(this).parents(".accordion");

      if ($(this).next(".acc-content").is(":visible")) {
        //return false;
        $(this).removeClass("active");
        $(this).next(".acc-content").slideUp(300);
        $(outerBox).children(".accordion").removeClass("active-block");
      } else {
        $(outerBox).find(".accordion .acc-btn").removeClass("active");
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc-content").slideDown(300);
      }
    });
  }

  //Custom Seclect Box
  if ($(".custom-select-box").length) {
    $(".custom-select-box")
      .selectmenu()
      .selectmenu("menuWidget")
      .addClass("overflow");
  }

  //Datepicker
  if ($(".date-picker").length) {
    $(".date-picker").datepicker();
  }

  //LightBox / Fancybox
  if ($(".lightbox-image").length) {
    $(".lightbox-image").fancybox({
      openEffect: "fade",
      closeEffect: "fade",
      helpers: {
        media: {}
      }
    });
  }

  //MixitUp Gallery Filters
  if ($(".filter-list").length) {
    $(".filter-list").mixItUp({});
  }

  //Contact Form Validation
  if ($("#contact-form").length) {
    $("#contact-form").validate({
      rules: {
        username: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        subject: {
          required: true
        },
        message: {
          required: true
        }
      }
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate({
        scrollTop: $(target).offset().top
      },
        1000
      );

      return false;
    });
  }

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  // update 18-05-2022
  // Megamenu Popup
  if ($(".megamenu-clickable--toggler > a").length) {
    //Show Popup
    $(".megamenu-clickable--toggler > a").on("click", function (e) {
      $("body").toggleClass("megamenu-popup-active");
      $(".megamenu-clickable > ul").toggleClass("megamenu-clickable--active");
      e.preventDefault();
    });
  }

  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
            scrollTop: $(target.attr("href")).offset().top - headerH + "px"
          },
            1200,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        // grabing section id dynamically
        var sections = $(this).attr("href");
        $(sections).each(function () {
          // checking is scroll bar are in section
          if ($(this).offset().top <= windscroll + 100) {
            // grabing the dynamic id of section
            var Sectionid = $(sections).attr("id");
            // removing current class from others
            $(".one-page-scroll-menu").find("li").removeClass("current");
            // adding current class to related navigation
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  /* ==========================================================================
     When document is Scrollig, do
     ========================================================================== */

  $(window).on("scroll", function () {
    headerStyle();
    OnePageMenuScroll();
    OnePageMenuScrollTwo();
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });

  /* ==========================================================================
     When document is Resized, do
     ========================================================================== */

  $(window).on("resize", function () { });

  /* ==========================================================================
     When document is loading, do
     ========================================================================== */

  $(window).on("load", function () {
    // swiper slider

    const swiperElm = document.querySelectorAll(".thm-swiper__slider");

    swiperElm.forEach(function (swiperelm) {
      const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
      let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
    });

    handlePreloader();

    if ($(".masonary-layout").length) {
      $(".masonary-layout").isotope({
        layoutMode: "masonry",
        itemSelector: ".masonary-item"
      });
    }

    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".has-dynamic-filter-counter").find("li");

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".dynamic-filter-count-layout").find(
          filterElement
        ).length;
        $(this).append("<sup>[" + count + "]</sup>");
        console.log(count);
      });
    }

    if ($(".portfolio-masonary__filters").length) {
      $(".portfolio-masonary__filters").find("li").eq(0).addClass("active");
    }
  });

  /* ==========================================================================
     update 15-08-2024 (Mosharof)
  ========================================================================== */
  if ($(".project-twelev__carousel").length) {
    $(".project-twelev__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: false,
      smartSpeed: 700,
      autoplay: 5000,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        },
        1400: {
          items: 4
        }
      }
    });
  }
  if ($(".service-twelev__carousel").length) {
    $(".service-twelev__carousel").owlCarousel({
      loop: false,
      margin: 0,
      center: false,
      nav: true,
      navText: [
        '<span class="flaticon-left-arrow"></span>',
        '<span class="flaticon-right-arrow"></span>'
      ],
      dots: true,
      smartSpeed: 700,
      autoplay: 5000,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });
  }
  if ($(".testimonial-twelev").length) {
    $('.testimonial-twelev__carousel').slick({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 700,
      fade: true,
      asNavFor: ".testimonial-twelev__thumb",
      slidesToShow: 1,
      slidesToScroll: 1
    });
    $('.testimonial-twelev__thumb').slick({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 700,
      focusOnSelect: true,
      asNavFor: ".testimonial-twelev__carousel",
      slidesToShow: 3,
      slidesToScroll: 1
    });
  }
  /*if ($(".testimonial-twelev__carousel").length) {
    $(".testimonial-twelev__carousel").owlCarousel({
      loop: false,
      margin: 0,
      center: false,
      nav: false,
      dotsContainer: "#testimonial-twelev__thumb",
      dots: true,
      smartSpeed: 700,
      autoplay: 5000,
      items: 1
    });
    let owlCarouselThumb = $(this).data("thumb-elm");
    $(owlCarouselThumb).find(".owl-dot").on("click", function () {
      $(this).trigger('to.owl.carousel', [$(this).index(), 300]);
    });
  }*/
  if ($(".testimonial-thirteen__carousel").length) {
    $(".testimonial-thirteen__carousel").owlCarousel({
      loop: false,
      margin: 0,
      center: false,
      nav: false,
      dots: true,
      smartSpeed: 700,
      autoplay: 5000,
      items: 1
    });
  }
  if ($(".project-thirteen__carousel").length) {
    var $slider = $(".project-thirteen__carousel");
    var $progressBar = $(".project-thirteen__progress");
    var $progressBarLabel = $(".slider__label");
    $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var calc = (nextSlide / (slick.slideCount - 1)) * 100;
      $progressBar
        .css("background-size", "100%" + calc + "%")
        .attr("aria-valuenow", calc);
      $progressBarLabel.text(calc + "% completed");
    });

    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalScrolling: true,
      //adaptiveHeight: true,
      centerMode: true,
      centerPadding: 0,
      arrows: true,
      nextArrow: "<button class=\"next\"><i class=\"flaticon-right-arrow\"></i></button>",
      prevArrow: "<button class=\"prev\"><i class=\"flaticon-left-arrow\"></i></button>",
      speed: 400,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },]
    });
  }
})(window.jQuery);

document.addEventListener('DOMContentLoaded', function () {
  const contactBarHTML = `
        <div class="mobile-contact-bar">
            <a href="tel:05322664335" class="mobile-contact-btn call">
                <i class="fa fa-phone"></i> Hemen Ara
            </a>
            <a href="https://wa.me/905322664335" class="mobile-contact-btn whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Op.+Dr.+Ersin+Fidan+|+Adana+El+Cerrahisi+|+Mikrocerrahi" target="_blank" class="mobile-contact-btn location">
                <i class="fa fa-map-marker-alt"></i> Konum
            </a>
        </div>
    `;

  // Check if bar already exists to avoid duplicates
  if (!document.querySelector('.mobile-contact-bar')) {
    document.body.insertAdjacentHTML('beforeend', contactBarHTML);
  }
});
