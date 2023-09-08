// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANSwlR-gyTKxCBCdhhWHgbB5Fg5-ODJ3c",
  authDomain: "tourism-de1ac.firebaseapp.com",
  projectId: "tourism-de1ac",
  storageBucket: "tourism-de1ac.appspot.com",
  messagingSenderId: "204093368364",
  appId: "1:204093368364:web:88baf7f0e2582e3f4cc989",
  measurementId: "G-XVC8PLLSJF",
  databaseURL:
    "https://tourism-de1ac-default-rtdb.asia-southeast1.firebasedatabase.app",
};
// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
function searchProducts(products, searchString) {
  searchString = searchString.toLowerCase(); // Chuyển chuỗi con thành chữ thường
  return products.filter(function(product) {
    var productName = product.name.toLowerCase(); // Chuyển tên sản phẩm thành chữ thường
    return productName.includes(searchString);
  });
}
// Lưu trữ thông tin sản phẩm trong Firebase Realtime Database
const productList = document.getElementById("list-product-main");
function getProductsFromDatabase() {
  const db = firebase.database();
  const productsRef = db.ref("products");

  productsRef.once("value", (snapshot) => {
    const productsObject = snapshot.val();
    if (productsObject) {
      // Chuyển đổi object thành mảng
      const productsArray = Object.values(productsObject);
      console.log(productsArray)
      if(new URLSearchParams(window.location.search).get("s")?.length > 0 ) {
        const foundProducts = searchProducts(productsArray, new URLSearchParams(window.location.search).get("s"));
        productList.innerHTML= foundProducts.map(
            (item) => `
            <li
            class="product type-product post-2450 status-publish first instock product_cat-bo-suu-tap product_cat-lan-ho-diep has-post-thumbnail downloadable shipping-taxable purchasable product-type-simple"
          >
            <div
              class="box__item__pro"
            >
              <div
                class="box__img__pro"
              >
                <img
                  width="300"
                  height="300"
                  alt=""
                  sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

                  data-src=${item.imageUrl}
                  class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
                  src=${item.imageUrl}
                />
              </div>
              <div
                class="content__pro"
              >
                <h2
                  class="woocommerce-loop-product__title"
                >
                  ${item.name}
                </h2>
                <div
                  class="price"
                >
                  <span
                    >Giá
                    :
                    ${item.price}</span
                  >
                </div>
                <a
                  onclick="addtocart('${item.productId}', '${item.name}', '${item.price}', '${item.imageUrl}')"
                  data-quantity="1"
                  class="button product_type_simple add-to-cart-button"
                  data-product_id=${item.productId}
                  data-product_sku=""
                  aria-label="Thêm &ldquo;${item.name}&rdquo; vào giỏ hàng"
                  rel="nofollow"
                  >Thêm vào giỏ hàng</a
                >
              </div>
            </div>
          </li>
            `
          )
      }
      else {

        productList.innerHTML = productsArray
          .map(
            (item) => `
            <li
            class="product type-product post-2450 status-publish first instock product_cat-bo-suu-tap product_cat-lan-ho-diep has-post-thumbnail downloadable shipping-taxable purchasable product-type-simple"
          >
            <div
              class="box__item__pro"
            >
              <div
                class="box__img__pro"
              >
                <img
                  width="300"
                  height="300"
                  alt=""
                  sizes="(max-width: 300px) 100vw, 300px"
    style="aspect-ratio: 1 / 1"

                  data-src=${item.imageUrl}
                  class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
                  src=${item.imageUrl}
                />
              </div>
              <div
                class="content__pro"
              >
                <h2
                  class="woocommerce-loop-product__title"
                >
                  ${item.name}
                </h2>
                <div
                  class="price"
                >
                  <span
                    >Giá
                    :
                    ${item.price}</span
                  >
                </div>
                <a
                  onclick="addtocart('${item.productId}', '${item.name}', '${item.price}', '${item.imageUrl}')"
                  data-quantity="1"
                  class="button product_type_simple add-to-cart-button"
                  data-product_id=${item.productId}
                  data-product_sku=""
                  aria-label="Thêm &ldquo;${item.name}&rdquo; vào giỏ hàng"
                  rel="nofollow"
                  >Thêm vào giỏ hàng</a
                >
              </div>
            </div>
          </li>
            `
          )
          .join("");
        return productsArray;
      }
    } else {
      console.log("Không có sản phẩm nào.");
      return [];
    }
  });
}

function addtocart(productId, name, price, imageUrl) {
  // Kiểm tra nếu giỏ hàng đã tồn tại trong Local Storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Thêm sản phẩm vào giỏ hàng
  cart.push({ productId, name, price, imageUrl, amount: 1 });

  // Lưu giỏ hàng mới vào Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));
  let cart1 = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelector(".pp-cart-counter").innerHTML= cart1.length;
  // Cập nhật giao diện hoặc thực hiện các công việc khác
  alert("Sản phẩm đã được thêm vào giỏ hàng!");
}
let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector(".pp-cart-counter").innerHTML= (cart1.length);

// Gọi hàm để lấy danh sách sản phẩm
getProductsFromDatabase();
