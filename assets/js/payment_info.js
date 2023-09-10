const database = firebase.database();
const usersRef = database.ref("payments");
const orderId= localStorage.getItem("orderId") || ""

// Lấy dữ liệu với paymentId là "12231031023"
usersRef.orderByChild("paymentId").equalTo(parseInt(orderId)).once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      // snapshot chứa dữ liệu có paymentId là "12231031023"
      const userData = snapshot.val();
    //   console.log(Object.values(userData));
    const total = Object.values(userData)?.[0].order.reduce(function (acc, product) {
        var priceWithoutCommas = parseFloat(
          product.price.replace(/,/g, "").replace(" VND", "")
        );
        var productTotal = priceWithoutCommas * product.amount;
        return acc + productTotal;
      }, 0);
      document.getElementById("order-id").innerHTML= Object.values(userData)?.[0].paymentId
      document.getElementById("time-send").innerHTML= moment(Object.values(userData)?.[0]?.time_send).format("DD/MM/YYYY HH:mm:ss")
      document.getElementById("total-order").innerHTML= numberWithCommas(total) + " VND"
      document.getElementById("total-order-2").innerHTML= numberWithCommas(total) + " VND"
      document.getElementById("total-order-3").innerHTML= numberWithCommas(total) + " VND"
      if(Object.values(userData)?.[0]?.method== "bacs") {
        document.getElementById("method-payment").innerHTML= "Chuyển khoản ngân hàng"
        document.getElementById("method-payment-2").innerHTML= "Chuyển khoản ngân hàng"
      }
      if(Object.values(userData)?.[0]?.method== "cheque") {
        document.getElementById("method-payment").innerHTML= "Kiểm tra thanh toán"
        document.getElementById("method-payment-2").innerHTML= "Chuyển khoản ngân hàng"

      }
      if(Object.values(userData)?.[0]?.method== "cod") {
        document.getElementById("method-payment").innerHTML= "Trả tiền mặt khi nhận hàng"
        document.getElementById("method-payment-2").innerHTML= "Trả tiền mặt khi nhận hàng"
      }
      document.getElementById("detail-order").innerHTML= Object.values(userData)?.[0].order?.map(item=> `
        <tr class="woocommerce-table__line-item order_item">

            <td class="woocommerce-table__product-name product-name">
                <div >${item.name}</div> <strong class="product-quantity">&times;&nbsp;${item.amount}</strong>                                                                                            </td>

            <td class="woocommerce-table__product-total product-total">
                <span class="woocommerce-Price-amount amount">${item.price}</span>
            </td>

        </tr>
      `)
      
    } else {
      console.log("Không tìm thấy dữ liệu với paymentId là '");
    }
  })
  .catch((error) => {
    console.error("Lỗi khi lấy dữ liệu từ Firebase: " + error);
  });


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }