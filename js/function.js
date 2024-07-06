(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  /* Preloader Effect */
  $window.on("load", function () {
    setHeaderHeight();
    $(".preloader").fadeOut(600);
  });

  /* Sticky Header */
  $window.on("resize", function () {
    setHeaderHeight();
  });

  function setHeaderHeight() {
    $("header.main-header").css(
      "height",
      $("header .header-sticky").outerHeight()
    );
  }

  $(window).on("scroll", function () {
    var fromTop = $(window).scrollTop();
    setHeaderHeight();
    var headerHeight = $("header .header-sticky").outerHeight();
    $("header .header-sticky").toggleClass(
      "hide",
      fromTop > headerHeight + 100
    );
    $("header .header-sticky").toggleClass("active", fromTop > 600);
  });

  /* Slick Menu JS */
  $("#menu").slicknav({
    label: "",
    prependTo: ".responsive-menu",
  });

  /* Testimonial Carousel JS */
  const testimonial_carousel = new Swiper(".testimonial-slider .swiper", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 500000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
  });

  /* Services Carousel JS */
  const service_carousel = new Swiper(".services-slider .swiper", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 10000, // 10 seconds delay
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
  });

  /* Zoom screenshot */
  $(".project-gallery-items").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom",
    image: {
      verticalFit: true,
    },
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find("img");
      },
    },
  });

  /* Popup Video */
  $(".popup-video").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /* Animated skills Bars */
  $(".our-skills").waypoint(
    function () {
      $(".skillbar").each(function () {
        $(this)
          .find(".count-bar")
          .animate(
            {
              width: $(this).attr("data-percent"),
            },
            2000
          );
      });
    },
    {
      offset: "50%",
    }
  );

  /* Init Counter */
  $(".counter").counterUp({ delay: 5, time: 2000 });

  /* Image Reveal Animation */
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, {
        autoAlpha: 1,
      });
      tl.from(container, 1, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1, {
        xPercent: 100,
        scale: 1,
        delay: -1,
        ease: Power2.out,
      });
    });
  }

  /* Text Effect Animation */
  if ($(".text-anime").length) {
    const animatedElements = document.querySelectorAll(".text-anime");

    animatedElements.forEach((element) => {
      let staggerAmount = 0.05;
      let translateXValue = 20;
      let translateYValue = false;
      let onScrollValue = 1;
      let delayValue = 0.5;
      let easeType = "power2.out";

      if (element.getAttribute("data-stagger")) {
        staggerAmount = element.getAttribute("data-stagger");
      }

      if (element.getAttribute("data-translateX")) {
        translateXValue = element.getAttribute("data-translateX");
      }

      if (element.getAttribute("data-translateY")) {
        translateYValue = element.getAttribute("data-translateY");
      }

      if (element.getAttribute("data-on-scroll")) {
        onScrollValue = element.getAttribute("data-on-scroll");
      }

      if (element.getAttribute("data-delay")) {
        delayValue = element.getAttribute("data-delay");
      }

      if (element.getAttribute("data-ease")) {
        easeType = element.getAttribute("data-ease");
      }

      if (onScrollValue == 1) {
        if (translateXValue > 0 && !translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            x: translateXValue,
            autoAlpha: 0,
            stagger: staggerAmount,
            ease: easeType,
            scrollTrigger: { trigger: element, start: "top 85%" },
          });
        }

        if (translateYValue > 0 && !translateXValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            y: translateYValue,
            autoAlpha: 0,
            ease: easeType,
            stagger: staggerAmount,
            scrollTrigger: { trigger: element, start: "top 85%" },
          });
        }

        if (translateXValue && translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 3,
            delay: delayValue,
            y: translateYValue,
            x: translateXValue,
            autoAlpha: 0,
            ease: easeType,
            stagger: staggerAmount,
            scrollTrigger: { trigger: element, start: "top 85%" },
          });
        }

        if (!translateXValue && !translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            x: 50,
            autoAlpha: 0,
            stagger: staggerAmount,
            ease: easeType,
            scrollTrigger: { trigger: element, start: "top 85%" },
          });
        }
      } else {
        if (translateXValue > 0 && !translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            x: translateXValue,
            ease: easeType,
            autoAlpha: 0,
            stagger: staggerAmount,
          });
        }

        if (translateYValue > 0 && !translateXValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            y: translateYValue,
            autoAlpha: 0,
            ease: easeType,
            stagger: staggerAmount,
          });
        }

        if (translateXValue && translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            y: translateYValue,
            x: translateXValue,
            ease: easeType,
            autoAlpha: 0,
            stagger: staggerAmount,
          });
        }

        if (!translateXValue && !translateYValue) {
          let splitText = new SplitType(element, { type: "chars, words" });
          gsap.from(splitText.chars, {
            duration: 1,
            delay: delayValue,
            ease: easeType,
            x: 50,
            autoAlpha: 0,
            stagger: staggerAmount,
          });
        }
      }
    });
  }

  /* Parallaxie js */
  var $parallaxie = $(".parallaxie");
  if ($parallaxie.length) {
    if ($window.width() > 768) {
      $parallaxie.parallaxie({
        speed: 0.55,
        offset: 0,
      });
    }
  }

  /* Contact form validation */
  var $contactform = $("#contactForm");
  if ($contactform.length) {
    $contactform.validator({ focus: false }).on("submit", function (event) {
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        submitForm();
      }
    });

    function submitForm() {
      /* Initiate Variables With Form Content*/
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var subject = $("#subject").val();
      var message = $("#msg").val();

      $.ajax({
        type: "POST",
        url: "form-process.php",
        data:
          "name=" +
          name +
          "&email=" +
          email +
          "&phone=" +
          phone +
          "&subject=" +
          subject +
          "&message=" +
          message,
        success: function (text) {
          if (text == "success") {
            formSuccess();
          } else {
            submitMSG(false, text);
          }
        },
      });
    }

    function formSuccess() {
      $contactform[0].reset();
      submitMSG(true, "Message Sent Successfully!");
    }

    function submitMSG(valid, msg) {
      if (valid) {
        var msgClasses = "h3 text-success";
      } else {
        var msgClasses = "h3 text-danger";
      }
      $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
  }
  /* Contact form validation end */

  /* Solar form validation */
  var $solarform = $("#solarForm");

  if ($solarform.length) {
    $solarform.validator({ focus: false }).on("submit", function (event) {
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        solarsubmitForm();
      }
    });

    function solarsubmitForm() {
      /* Initiate Variables With Form Content*/
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var bill = $("#bill").val();
      var capacity = $("#capacity").val();

      $.ajax({
        type: "POST",
        url: "solar-form-process.php",
        data:
          "name=" +
          name +
          "&email=" +
          email +
          "&phone=" +
          phone +
          "&bill=" +
          bill +
          "&capacity=" +
          capacity,
        success: function (text) {
          if (text == "success") {
            solarformSuccess();
          } else {
            solarsubmitMSG(false, text);
          }
        },
      });
    }

    function solarformSuccess() {
      $solarform[0].reset();
      solarsubmitMSG(true, "Message Sent Successfully!");
    }

    function solarsubmitMSG(valid, msg) {
      if (valid) {
        var msgClasses = "h3 text-success";
      } else {
        var msgClasses = "h3 text-danger";
      }
      $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
  }
  /* Solar form validation end */

  /* Animated Wow Js */
  new WOW().init();
})(jQuery);

const section = document.querySelector("section"),
  overlay = document.querySelector(".overlay"),
  closeBtn = document.querySelector(".close-btn"),
  container = document.querySelector('.page-team-single');

closeBtn.addEventListener("click", () => {
  section.classList.remove("active");
  container.classList.remove("blur");
});

function showModal() {
  section.classList.add("active");
  container.classList.add("blur");
}

function sendMail(event) {
  event.preventDefault();

  // Collect form data
  const sowCheckboxes = document.querySelectorAll('input[name="sow[]"]:checked');
  const sow = Array.from(sowCheckboxes).map(checkbox => checkbox.value);

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const budgetInput = document.getElementById("budget");
  const sourceLanguageInput = document.getElementById("source_language");
  const targetLanguageInput = document.getElementById("target_language");
  const volumeInput = document.getElementById("volume");
  const noOfTalentsInput = document.getElementById("num_talents");
  const materialsInput = document.getElementById("materials");
  const deliverablesInput = document.getElementById("deliverables");
  const otherDetailsInput = document.getElementById("other_details");

  if (!nameInput || !emailInput || !phoneInput || !budgetInput ||
    !sourceLanguageInput || !targetLanguageInput || !volumeInput ||
    !noOfTalentsInput || !materialsInput || !deliverablesInput || !otherDetailsInput) {
    console.error("One or more form elements could not be found.");
    return;
  }

  // Validate form fields
  if (!nameInput.value || !emailInput.value || !phoneInput.value || !budgetInput.value ||
    !sourceLanguageInput.value || !targetLanguageInput.value || !volumeInput.value ||
    !noOfTalentsInput.value || !materialsInput.value || !deliverablesInput.value || !otherDetailsInput.value) {
    alert("Please fill in all required fields.");
    return;
  }

  const params = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    budget: budgetInput.value,
    sow: sow.join(', '),
    source_language: sourceLanguageInput.value,
    target_language: targetLanguageInput.value,
    volume: volumeInput.value,
    num_talents: noOfTalentsInput.value,
    materials: materialsInput.value,
    deliverables: deliverablesInput.value,
    other_details: otherDetailsInput.value
  };

  const serviceID = "service_96f8mdc";
  const templateID = "template_bcgrqo5";

  document.getElementById("submitBtn").disabled = true;
  document.getElementById("loadingIndicator").classList.remove("hidden");

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      // Reset form fields
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      budgetInput.value = "";
      sowCheckboxes.forEach(checkbox => checkbox.checked = false);
      sourceLanguageInput.value = "";
      targetLanguageInput.value = "";
      volumeInput.value = "";
      noOfTalentsInput.value = "";
      materialsInput.value = "";
      deliverablesInput.value = "";
      otherDetailsInput.value = "";

      // Show custom modal
      showModal();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      document.getElementById("submitBtn").disabled = false;
      document.getElementById("loadingIndicator").classList.add("hidden");
    });
}

document.addEventListener("DOMContentLoaded", function() {
  const marquee = document.querySelector('.logo-marquee');
  const track = document.querySelector('.logo-track');
  
  // Function to clone and append logos
  function cloneAndAppendLogos() {
    const clone = track.cloneNode(true);
    marquee.appendChild(clone);
  }

  // Initial cloning
  cloneAndAppendLogos();

  // Function to check if new images have been added
  function updateMarquee() {
    const tracks = marquee.querySelectorAll('.logo-track');
    if (tracks.length > 1) {
      tracks[1].remove(); // Remove the old clone
    }
    cloneAndAppendLogos(); // Add a new clone with updated logos
  }

  // Check for updates periodically
  setInterval(updateMarquee, 5000); // Check every 5 seconds

  // Adjust animation duration based on content width
  function adjustAnimationDuration() {
    const totalWidth = track.scrollWidth;
    const duration = totalWidth / 50; // Adjust this divisor to change speed
    track.style.animationDuration = `${duration}s`;
    tracks[1].style.animationDuration = `${duration}s`;
  }

  // Initial adjustment and periodic check
  adjustAnimationDuration();
  window.addEventListener('resize', adjustAnimationDuration);
  setInterval(adjustAnimationDuration, 5000);
});