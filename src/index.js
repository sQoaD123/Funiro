import "./index.html";
import "./index.scss";
import "./js/swipers";
import productsJson from "./json/products.json";

function setupPlaceholders() {
  const inputs = document.querySelectorAll('input[type="text"][data-value]');
  inputs.forEach((input) => {
    const placeholderText = input.getAttribute("data-value");
    input.placeholder = placeholderText;
    input.addEventListener("focus", () => {
      input.placeholder = "";
    });
    input.addEventListener("blur", () => {
      if (input.value === "") {
        input.placeholder = placeholderText;
      }
    });
  });
}
setupPlaceholders();

function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}
ibg();

function isTouchScreen() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function removeClasses(lan, remove) {
  if (lan.length > 0) {
    for (let i = 0; i < lan.length; i++) {
      lan[i].classList.remove(remove);
    }
  }
}

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (window.innerWidth > 768 && isTouchScreen()) {
      if (targetElement.classList.contains("menu__arrow")) {
        targetElement.closest(".menu__item").classList.toggle("_hover");
      }
      if (
        !targetElement.closest(".menu__item") &&
        document.querySelectorAll(".menu__item._hover").length > 0
      ) {
        removeClasses(
          document.querySelectorAll(".menu__item._hover"),
          "_hover"
        );
      }
    } else if (window.innerWidth <= 768) {
      if (targetElement.classList.contains("menu__arrow")) {
        targetElement.closest(".menu__item").classList.toggle("_active");
      }
      if (
        targetElement.classList.contains("menu-footer__title-box") ||
        targetElement.classList.contains("menu-footer__title") ||
        targetElement.classList.contains("menu-footer__title-arrow")
      ) {
        targetElement
          .closest(".menu-footer__column")
          .classList.toggle("_active");
      }
    }
    if (targetElement.classList.contains("search-form__icon")) {
      document.querySelector(".search-form").classList.toggle("_active");
    } else if (
      !targetElement.closest(".search-form") &&
      document.querySelector(".search-form._active")
    ) {
      document.querySelector(".search-form").classList.remove("_active");
    }
    if (targetElement.classList.contains("products__more")) {
      getProducts(targetElement);
      e.preventDefault();
    }
    if (targetElement.classList.contains("actions-product__button")) {
      const productId = targetElement.closest(".item-product").dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }
    if (
      targetElement.classList.contains("cart-header__icon") ||
      targetElement.closest(".cart-header__icon")
    ) {
      if (document.querySelector(".cart-list").children.length > 0) {
        document.querySelector(".cart-header").classList.toggle("_active");
      }
      e.preventDefault();
    } else if (
      !targetElement.closest(".cart-header") &&
      !targetElement.classList.contains("actions-product__button")
    ) {
      document.querySelector(".cart-header").classList.remove("_active");
    }
    if (targetElement.classList.contains("cart-list__delete")) {
      const productId =
        targetElement.closest(".cart-list__item").dataset.cartPid;
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }
  }

  //Header
  const headerElement = document.querySelector(".header");

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove("_scroll");
    } else {
      headerElement.classList.add("_scroll");
    }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);

  async function getProducts(button) {
    if (!button.classList.contains("_hold")) {
      button.classList.add("_hold");
      let result = await productsJson;
      loadProducts(result);
      button.classList.remove("_hold");
      button.remove();
    }
  }

  function loadProducts(data) {
    const productsItem = document.querySelector(".products__items");

    data.products.forEach((item) => {
      const productId = item.id;
      const productUrl = item.url;
      const productImage = item.image;
      const productTitle = item.title;
      const productText = item.text;
      const productPrice = item.price;
      const productOldPrice = item.priceOld;
      const productShareUrl = item.shareUrl;
      const productLikeUrl = item.likeUrl;
      const productLabels = item.labels;

      let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
      let productTemplateEnd = `</article>`;

      let productTemplateLabels = "";
      if (productLabels) {
        let productTemplateLabelsStart = `<div class="item-product__labels">`;
        let productTemplateLabelsEnd = `</div>`;
        let productTemplateLabelsContent = "";

        productLabels.forEach((labelItem) => {
          productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
        });

        productTemplateLabels += productTemplateLabelsStart;
        productTemplateLabels += productTemplateLabelsContent;
        productTemplateLabels += productTemplateLabelsEnd;
      }

      let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="" alt="${productTitle}">
		</a>
	`;
      let imgs = document.querySelectorAll(".imgs__item");
      if (productImage <= imgs.length + 4) {
        for (let i = 0; i < imgs.length; i++) {
          if (i + 5 === productImage) {
            let src = imgs[i].getAttribute("src");
            productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="${src}" alt="${productTitle}">
		</a>
	`;
          }
        }
      }

      let productTemplateBodyStart = `<div class="item-product__body">`;
      let productTemplateBodyEnd = `</div>`;

      let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

      let productTemplatePrices = "";
      let productTemplatePricesStart = `<div class="item-product__prices">`;
      let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
      let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
      let productTemplatePricesEnd = `</div>`;

      productTemplatePrices = productTemplatePricesStart;
      productTemplatePrices += productTemplatePricesCurrent;
      if (productOldPrice) {
        productTemplatePrices += productTemplatePricesOld;
      }
      productTemplatePrices += productTemplatePricesEnd;

      let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`;

      let productTemplateBody = "";
      productTemplateBody += productTemplateBodyStart;
      productTemplateBody += productTemplateContent;
      productTemplateBody += productTemplatePrices;
      productTemplateBody += productTemplateActions;
      productTemplateBody += productTemplateBodyEnd;

      let productTemplate = "";
      productTemplate += productTemplateStart;
      productTemplate += productTemplateLabels;
      productTemplate += productTemplateImage;
      productTemplate += productTemplateBody;
      productTemplate += productTemplateEnd;

      productsItem.insertAdjacentHTML("beforeend", productTemplate);
      ibg();
    });
  }
  function addToCart(productButton, productId) {
    if (!productButton.classList.contains("_hold")) {
      productButton.classList.add("_hold");
      productButton.classList.add("_fly");

      const cart = document.querySelector(".cart-header__icon");
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const productImage = product.querySelector(".item-product__image");

      const productImageFly = productImage.cloneNode(true);

      const productImageFlyWidth = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;
      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;

      productImageFly.setAttribute("class", "_flyImage _ibg");
      productImageFly.style.cssText = `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
      `;

      document.body.append(productImageFly);

      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlyTop = cart.getBoundingClientRect().top;

      productImageFly.style.cssText = `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0px;
      height: 0px;
      opacity: 0;
      `;
      productImageFly.addEventListener("transitionend", function () {
        if (productButton.classList.contains("_fly")) {
          console.log("test");
          productImageFly.remove();
          updateCart(productButton, productId);
          productButton.classList.remove("_fly");
        }
      });
    }
    ibg();
  }

  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector(".cart-header");
    const cartIcon = cart.querySelector(".cart-header__icon");
    const cartQuantity = cartIcon.querySelector("span");
    const cartProduct = document.querySelector(
      `[data-cart-pid="${productId}"]`
    );
    const cartList = document.querySelector(".cart-list");

    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML;
      } else {
        cartIcon.insertAdjacentHTML("beforeend", `<span>1</span>`);
      }
      if (!cartProduct) {
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const cartProductImage = product.querySelector(
          ".item-product__image"
        ).innerHTML;
        const cartProductTitle = product.querySelector(
          ".item-product__title"
        ).innerHTML;
        const cartProductContent = `
        <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
        <div class="cart-list__body">
          <a href="" class="cart-list__title">${cartProductTitle}</a>
          <div class="cart-list__quantity">Quantity: <span>1</span></div>
          <a href="" class="cart-list__delete">Delete</a>
        </div>`;
        cartList.insertAdjacentHTML(
          "beforeend",
          `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`
        );
        ibg();
      } else {
        const cartProductQuantity = cartProduct.querySelector(
          ".cart-list__quantity span"
        );
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      }

      productButton.classList.remove("_hold");
    } else {
      const cartProductQuantity = cartProduct.querySelector(
        ".cart-list__quantity span"
      );
      const cartProductQuantityT = cartProduct.querySelector(
        ".cart-header__icon span"
      );
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
      if (!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove();
      }

      const cartQuantityValue = --cartQuantity.innerHTML;

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue;
      } else {
        cartQuantity.remove();
        cart.classList.remove("_active");
      }
    }
  }

  const furniture = document.querySelector(".furniture__body");
  if (furniture && !isTouchScreen()) {
    const furnitureItems = document.querySelector(".furniture__items");
    const furnitureColumn = document.querySelectorAll(".furniture__column");

    const speed = furniture.dataset.speed;

    let positionX = 0;
    let coordXprocent = 0;

    function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0;
      furnitureColumn.forEach((element) => {
        furnitureItemsWidth += element.offsetWidth;
      });

      const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
      const disX = Math.floor(coordXprocent - positionX);

      positionX = positionX + disX * speed;
      let position = (furnitureDifferent / 200) * positionX;

      furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

      if (Math.abs(disX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        furniture.classList.remove("_init");
      }
    }
    furniture.addEventListener("mousemove", function (e) {
      const furnitureWidth = furniture.offsetWidth;
      const coordX = e.pageX - furnitureWidth / 2;
      coordXprocent = (coordX / furnitureWidth) * 200;

      if (!furniture.classList.contains("_init")) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add("_init");
      }
    });
  }
};

let iconMenu = document.querySelector(".icon-menu");
iconMenu.addEventListener("click", function (e) {
  let menu = document.querySelector(".menu__body");
  menu.classList.toggle("_active");
});
