let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
// Sử dụng reduce để tính tổng
var total = cart1.reduce(function (acc, product) {
  var priceWithoutCommas = parseFloat(
    product.price.replace(/,/g, "").replace(" VND", "")
  );
  var productTotal = (priceWithoutCommas * product.amount) || 0;
  return acc + productTotal;
}, 0);
console.log(total)
document.getElementById("total-amount-cart").innerHTML =
  numberWithCommas(total) + " VND";
document.getElementById("grand-total-amount-cart").innerHTML =
  numberWithCommas(total) + " VND";
document.getElementById("list-cart-product").innerHTML = cart1.map(
  (item) => `
  <tr class="cart_item">
      <td class="product-name">
        <div class="cart-img">
          <img
            width="150"
            height="150"
            alt=""
            data-srcset=${item.imageUrl}
            sizes="(max-width: 150px) 100vw, 150px"
            data-src=${item.imageUrl}
            class="attachment-thumbnail size-thumbnail lazyload"
            src=${item.imageUrl}
            style="aspect-ratio: 1 / 1"
          /><noscript
            ><img
              width="150"
              height="150"
              src=${item.imageUrl}
              class="attachment-thumbnail size-thumbnail"
              alt=""
              srcset=${item.imageUrl}
              sizes="(max-width: 150px) 100vw, 150px"
          /></noscript>
          <span class="cart-quantity"
            >${item.amount}</span
          >
          ${item.name}&nbsp;
          <strong
            class="product-quantity"
            >&times;&nbsp;1</strong
          >
        </div>
      </td>
    
      <td class="product-total">
        <span
          class="woocommerce-Price-amount amount"
          >${item.price}<span
            class="woocommerce-Price-currencySymbol"
            ></span
          ></span
        >
      </td>
    </tr>
`
);

function renderCart() {
  const cartContainer = document.getElementById("list-cart-product");
  total = cart1.reduce(function (acc, product) {
    var priceWithoutCommas = parseFloat(
      product.price.replace(/,/g, "").replace(" VND", "")
    );
    var productTotal = priceWithoutCommas * product.amount;
    return acc + productTotal;
  }, 0);
  document.getElementById("grand-total-amount-cart").innerHTML =
    numberWithCommas(total) + " VND";
  document.getElementById("total-amount-cart").innerHTML =
    numberWithCommas(total) + " VND";
  cartContainer.innerHTML = cart1
    .map(
      (item) => `
      <tr class="cart_item">
      <td class="product-name">
        <div class="cart-img">
          <img
            width="150"
            height="150"
            alt=""
            data-srcset=${item.imageUrl}
            sizes="(max-width: 150px) 100vw, 150px"
            data-src=${item.imageUrl}
            class="attachment-thumbnail size-thumbnail lazyload"
            src=${item.imageUrl}
            style="aspect-ratio: 1 / 1"
          /><noscript
            ><img
              width="150"
              height="150"
              src=${item.imageUrl}
              class="attachment-thumbnail size-thumbnail"
              alt=""
              srcset=${item.imageUrl}
              sizes="(max-width: 150px) 100vw, 150px"
          /></noscript>
          <span class="cart-quantity"
            >${item.amount}</span
          >
          ${item.name}&nbsp;
          <strong
            class="product-quantity"
            >&times;&nbsp;1</strong
          >
        </div>
      </td>
    
      <td class="product-total">
        <span
          class="woocommerce-Price-amount amount"
          >${item.price}<span
            class="woocommerce-Price-currencySymbol"
            ></span
          ></span
        >
      </td>
    </tr>
    `
    )
    .join("");
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, newQuantity) {
  // Find the product in the cart by productId
  const productIndex = cart1.findIndex((item) => item.productId == productId);

  // If the product is found in the cart
  if (productIndex !== -1) {
    // Update the quantity of the product
    cart1[productIndex].amount = parseInt(newQuantity);

    // Optionally, update the data in Local Storage
    localStorage.setItem("cart", JSON.stringify(cart1));

    // Update the display (you might need to rerender the cart)
    renderCart();
  }
}

renderCart();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
