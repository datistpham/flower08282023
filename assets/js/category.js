const database = firebase.database();
const productsRef = database.ref("products");
// Sử dụng Firebase để lấy danh sách sản phẩm có thể loại "hoa lan ghép lũa"
function getProductsByCategory() {
  const productList = document.getElementById("list-product-detail");
  productsRef.orderByChild("category").equalTo("1").once("value", (snapshot) => {
    const productsObject = snapshot.val();
    if (productsObject) {
      const productsArray = Object.values(productsObject);
      productList.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại

      productsArray.reverse().forEach((item, index) => {
        const li = document.createElement("li");
        li.className =
          "product type-product post-1939 status-publish first instock product_cat-lan-ho-diep has-post-thumbnail shipping-taxable purchasable product-type-simple";
        li.innerHTML = `
                <div class="box__item__pro">
                    <a href="https://kingflowers.vn/san-pham/binh-lan-ho-diep-trang-3600/" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                        <div class="box__img__pro">
                            <img width="300" height="300" alt="Bình Lan Hồ Điệp Trắng 3600" data-srcset="https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-300x300.jpg 300w, https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-150x150.jpg 150w, https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-100x100.jpg 100w"
                                sizes="(max-width: 300px) 100vw, 300px" data-src="https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail lazyload"
                                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /><noscript><img width="300" height="300" src="https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Bình Lan Hồ Điệp Trắng 3600" srcset="https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-300x300.jpg 300w, https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-150x150.jpg 150w, https://kingflowers.vn/wp-content/uploads/2020/07/3tr6-1-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" /></noscript>                                                                        </div>

                        <div class="content__pro">
                            <h2 class="woocommerce-loop-product__title">Bình Lan Hồ Điệp Trắng 3600</h2>
                            <div class="price"><span>Giá : 5.100.000 đ</span></div>
                    </a>
                    <a
                  onclick="addtocart('${item.productId}', '${item.name}', '${item.price}', '${item.imageUrl}')"
                  data-quantity="1"
                  class="button product_type_simple add-to-cart-button"
                  data-product_id=${item.productId}
                  data-product_sku=""
                  aria-label="Thêm &ldquo;${item.name}&rdquo; vào giỏ hàng"
                  rel="nofollow"
                  >Thêm vào giỏ hàng
                </a>
                <a
                  onclick="wholesale()"
                  data-quantity="1"
                  class="button product_type_simple add-to-cart-button"
                  data-product_id=${item.productId}
                  data-product_sku=""
                  style="margin-top: 8px"
                  rel="nofollow"
                  >Mua sỉ
                </a>
                    </div>

                </div>

                `;

        productList.appendChild(li);
      });
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

  document.querySelector(".pp-cart-counter").innerHTML = cart1.length;
  // Cập nhật giao diện hoặc thực hiện các công việc khác
  alert("Sản phẩm đã được thêm vào giỏ hàng!");
}  

function wholesale() {
    window.open("https://www.facebook.com/messages/t/100076505828347", "_blank")
}

// Gọi hàm để lấy danh sách sản phẩm có thể loại "hoa lan ghép lũa"
// getProductsByCategory();
getProductsByCategory();
