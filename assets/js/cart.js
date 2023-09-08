let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
// Sử dụng reduce để tính tổng
var total = cart1.reduce(function (acc, product) {
  var priceWithoutCommas = parseFloat(
    product.price.replace(/,/g, "").replace(" VND", "")
  );
  var productTotal = priceWithoutCommas * product.amount;
  return acc + productTotal;
}, 0);
document.getElementById("total-amount-cart").innerHTML =
  numberWithCommas(total) + " VND";
document.getElementById("grand-total-amount-cart").innerHTML =
  numberWithCommas(total) + " VND";
document.getElementById("list-cart-product").innerHTML = cart1.map(
  (item) => `
<tr
class="woocommerce-cart-form__cart-item cart_item"
>
<td class="product-remove">
<a
  class="remove"
  aria-label="Xóa sản phẩm này"
  data-product_id="2450"
  data-product_sku=""
  onclick="removeFromCart('${item.productId}')"
  >&times;</a>
</td>

<td class="product-thumbnail">
<a
  href="http://localhost:5500/san-pham/chau-hoa-lan-ho-diep-1809d1/"
  ><img
    width="300"
    height="300"
    alt=""
    sizes="(max-width: 300px) 100vw, 300px"
    class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
    style="aspect-ratio: 1 / 1"
    src=${item.imageUrl} />
  </a>
</td>

<td
class="product-name"
data-title="Sản phẩm"
>
<a
  >${item.name}</a
>
</td>

<td
class="product-price"
data-title="Giá"
>
<span
  class="woocommerce-Price-amount amount"
  >${item.price}<span
    class="woocommerce-Price-currencySymbol"
    ></span
  ></span
>
</td>

<td
class="product-quantity"
data-title="Số lượng"
>
<div class="quantity">
  <label
    class="screen-reader-text"
    for="quantity_64f7044b38ab2"
    >${item.name} số
    lượng</label
  >
  <input
    type="number"
    id="quantity_64f7044b38ab2"
    class="input-text qty text"
    step="1"
    min="0"
    max=""
    name="cart[49d4b2faeb4b7b9e745775793141e2b2][qty]"
    value="1"
    title="SL"
    size="4"
    placeholder=""
    inputmode="numeric"
  />
</div>
</td>

<td
class="product-subtotal"
data-title="Tạm tính"
>
<span
  class="woocommerce-Price-amount amount"
  >${
    item.price.replaceAll(",", "").replaceAll("VND", "") * (item?.amount || 1)
  }<span
    class="woocommerce-Price-currencySymbol"
    >&#8363;</span
  ></span
>
</td>
</tr>
`
);

function removeFromCart(productId) {
  let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
  cart1 = cart1?.filter((item) => item.productId != productId);
  localStorage.setItem("cart", JSON.stringify(cart1));
  document.querySelector(".pp-cart-counter").innerHTML = cart1.length;
  var total = cart1.reduce(function (acc, product) {
    var priceWithoutCommas = parseFloat(
      product.price.replace(/,/g, "").replace(" VND", "")
    );
    var productTotal = priceWithoutCommas * product.amount;
    return acc + productTotal;
  }, 0);
  document.getElementById("total-amount-cart").innerHTML =
    numberWithCommas(total) + " VND";
  document.getElementById("grand-total-amount-cart").innerHTML =
    numberWithCommas(total) + " VND";
  document.getElementById("list-cart-product").innerHTML = cart1.map(
    (item) => `
  <tr
  class="woocommerce-cart-form__cart-item cart_item"
  >
  <td class="product-remove">
    <a
      class="remove"
      aria-label="Xóa sản phẩm này"
      data-product_id="2450"
      data-product_sku=""
      onclick="removeFromCart('${item.productId}')"
      >&times;</a>
  </td>
  
  <td class="product-thumbnail">
    <a
      href="http://localhost:5500/san-pham/chau-hoa-lan-ho-diep-1809d1/"
      ><img
        width="300"
        height="300"
        alt=""
        sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

        class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
        src=${item.imageUrl} />
      </a>
  </td>
  
  <td
    class="product-name"
    data-title="Sản phẩm"
  >
    <a
      >${item.name}</a
    >
  </td>
  
  <td
    class="product-price"
    data-title="Giá"
  >
    <span
      class="woocommerce-Price-amount amount"
      >${item.price}<span
        class="woocommerce-Price-currencySymbol"
        >&#8363;</span
      ></span
    >
  </td>
  
  <td
    class="product-quantity"
    data-title="Số lượng"
  >
    <div class="quantity">
      <label
        class="screen-reader-text"
        for="quantity_64f7044b38ab2"
        >${item.name} số
        lượng</label
      >
      <input
        type="number"
        id="quantity_64f7044b38ab2"
        class="input-text qty text"
        step="1"
        min="0"
        max=""
        name="cart[49d4b2faeb4b7b9e745775793141e2b2][qty]"
        value="1"
        title="SL"
        size="4"
        placeholder=""
        inputmode="numeric"
        oninput="updateCartAmount('${item.productId}', event)"
      />
    </div>
  </td>
  
  <td
    class="product-subtotal"
    data-title="Tạm tính"
  >
    <span
      class="woocommerce-Price-amount amount"
      >7.400.000<span
        class="woocommerce-Price-currencySymbol"
        >&#8363;</span
      ></span
    >
  </td>
  </tr>
  `
  );
}

function updateCartAmount(productId, e) {
  console.log(1232);
  cart1 = JSON.parse(localStorage.getItem("cart")) || [];
  cartFind = cart1.find((item) => item.productId == productId);
  cart1 = cart1.filter((item) => item.productId != productId);
  cart1.push({ ...cartFind, amount: e.target.value });
  document.getElementById("list-cart-product").innerHTML = cart1.map(
    (item) => `
  <tr
  class="woocommerce-cart-form__cart-item cart_item"
  >
  <td class="product-remove">
    <a
      class="remove"
      aria-label="Xóa sản phẩm này"
      data-product_id="2450"
      data-product_sku=""
      onclick="removeFromCart('${item.productId}')"
      >&times;</a>
  </td>
  
  <td class="product-thumbnail">
    <a
      href="http://localhost:5500/san-pham/chau-hoa-lan-ho-diep-1809d1/"
      ><img
        width="300"
        height="300"
        alt=""
        sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

        class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
        src=${item.imageUrl} />
      </a>
  </td>
  
  <td
    class="product-name"
    data-title="Sản phẩm"
  >
    <a
      >${item.name}</a
    >
  </td>
  
  <td
    class="product-price"
    data-title="Giá"
  >
    <span
      class="woocommerce-Price-amount amount"
      >${item.price}<span
        class="woocommerce-Price-currencySymbol"
        ></span
      ></span
    >
  </td>
  
  <td
    class="product-quantity"
    data-title="Số lượng"
  >
    <div class="quantity">
      <label
        class="screen-reader-text"
        for="quantity_64f7044b38ab2"
        >${item.name} số
        lượng</label
      >
      <input
        type="number"
        id="quantity_64f7044b38ab2"
        class="input-text qty text"
        step="1"
        min="0"
        max=""
        name="cart[49d4b2faeb4b7b9e745775793141e2b2][qty]"
        value="1"
        title="SL"
        size="4"
        placeholder=""
        inputmode="numeric"
      oninput="updateCartAmount('${item.productId}', event)"
  
      />
    </div>
  </td>
  
  <td
    class="product-subtotal"
    data-title="Tạm tính"
  >
    <span
      class="woocommerce-Price-amount amount"
      >${
        item.price.replaceAll(",", "").replaceAll("VND", "") *
        (item?.amount || 1)
      }<span
        class="woocommerce-Price-currencySymbol"
        >&#8363;</span
      ></span
    >
  </td>
  </tr>
  `
  );

  function removeFromCart(productId) {
    let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
    cart1 = cart1?.filter((item) => item.productId != productId);
    localStorage.setItem("cart", JSON.stringify(cart1));
    document.querySelector(".pp-cart-counter").innerHTML = cart1.length;
    document.getElementById("list-cart-product").innerHTML = cart1.map(
      (item) => `
    <tr
    class="woocommerce-cart-form__cart-item cart_item"
    >
    <td class="product-remove">
      <a
        class="remove"
        aria-label="Xóa sản phẩm này"
        data-product_id="2450"
        data-product_sku=""
        onclick="removeFromCart('${item.productId}')"
        >&times;</a>
    </td>
    
    <td class="product-thumbnail">
      <a
        href="http://localhost:5500/san-pham/chau-hoa-lan-ho-diep-1809d1/"
        ><img
          width="300"
          height="300"
          alt=""
          sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

          class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
          src=${item.imageUrl} />
        </a>
    </td>
    
    <td
      class="product-name"
      data-title="Sản phẩm"
    >
      <a
        >${item.name}</a
      >
    </td>
    
    <td
      class="product-price"
      data-title="Giá"
    >
      <span
        class="woocommerce-Price-amount amount"
        >${item.price}<span
          class="woocommerce-Price-currencySymbol"
          >&#8363;</span
        ></span
      >
    </td>
    
    <td
      class="product-quantity"
      data-title="Số lượng"
    >
      <div class="quantity">
        <label
          class="screen-reader-text"
          for="quantity_64f7044b38ab2"
          >${item.name} số
          lượng</label
        >
        <input
          type="number"
          id="quantity_64f7044b38ab2"
          class="input-text qty text"
          step="1"
          min="0"
          max=""
          name="cart[49d4b2faeb4b7b9e745775793141e2b2][qty]"
          value="1"
          title="SL"
          size="4"
          placeholder=""
          inputmode="numeric"
        />
      </div>
    </td>
    
    <td
      class="product-subtotal"
      data-title="Tạm tính"
    >
      <span
        class="woocommerce-Price-amount amount"
        >7.400.000<span
          class="woocommerce-Price-currencySymbol"
          >&#8363;</span
        ></span
      >
    </td>
    </tr>
    `
    );
  }
}

//

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
    <tr
    class="woocommerce-cart-form__cart-item cart_item"
    >
    <td class="product-remove">
    <a
      class="remove"
      aria-label="Xóa sản phẩm này"
      data-product_id="2450"
      data-product_sku=""
      onclick="removeFromCart('${item.productId}')"
      >&times;</a>
    </td>
    
    <td class="product-thumbnail">
    <a
      href="http://localhost:5500/san-pham/chau-hoa-lan-ho-diep-1809d1/"
      ><img
        width="300"
        height="300"
        alt=""
        sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

        class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
        src=${item.imageUrl} />
      </a>
    </td>
    
    <td
    class="product-name"
    data-title="Sản phẩm"
    >
    <a
      >${item.name}</a
    >
    </td>
    
    <td
    class="product-price"
    data-title="Giá"
    >
    <span
      class="woocommerce-Price-amount amount"
      >${item.price}<span
        class="woocommerce-Price-currencySymbol"
        ></span
      ></span
    >
    </td>
    
    <td
    class="product-quantity"
    data-title="Số lượng"
    >
    <div class="quantity">
      <label
        class="screen-reader-text"
        for="quantity_64f7044b38ab2"
        >${item.name} số
        lượng</label
      >
      <input
        type="number"
        id="quantity_64f7044b38ab2"
        class="input-text qty text"
        step="1"
        min="0"
        max=""
        name="cart[49d4b2faeb4b7b9e745775793141e2b2][qty]"
        value="${item.amount || 1}" // Set the initial quantity
        title="SL"
        size="4"
        placeholder=""
        inputmode="numeric"
        oninput="updateQuantity('${
          item.productId
        }', this.value)" // Call updateQuantity on input change
      />
    </div>
    </td>
    
    <td
    class="product-subtotal"
    data-title="Tạm tính"
    >
    <span
      class="woocommerce-Price-amount amount"
      >${numberWithCommas(
        item.price.replaceAll(",", "").replaceAll("VND", "") *
          (item?.amount || 1)
      )}<span
        class="woocommerce-Price-currencySymbol"
        > VND</span
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
