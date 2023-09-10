const database = firebase.database();
const usersRef = database.ref("payments");

const dataToAdd = {};
const firstName= document.getElementById("firstNameInput")
const lastName= document.getElementById("lastNameInput")
const phoneNumber= document.getElementById("phoneNumberInput")
const address= document.getElementById("addressInput")
const email= document.getElementById("emailInput")
const note= document.getElementById("noteInput")
const method= document.querySelector('input[name="payment_method"]:checked');
const paymentId= new Date().getTime()
const time= new Date()


document.getElementById("payment-order").onclick= (e) => {
    e.preventDefault()
    let cart10 = JSON.parse(localStorage.getItem("cart")) || [];
    dataToAdd["paymentId"]= paymentId
    dataToAdd["firstName"]= firstName.value
    dataToAdd["lastName"]= lastName.value
    dataToAdd["phoneNumber"]= phoneNumber.value
    dataToAdd["address"]= address.value
    dataToAdd["email"]= email.value
    dataToAdd["note"]= note.value
    dataToAdd["time"]= time
    dataToAdd["order"]= cart10
    dataToAdd["method"]= method.value
    const newUserRef = usersRef.push(); // Tạo một ID ngẫu nhiên cho dữ liệu mới
newUserRef
  .set(dataToAdd)
  .then(() => {
    console.log("Dữ liệu đã được thêm vào Firebase thành công!");
  })
  .then(()=> {
    window.location.href= window.location.origin+ "/thanh-toan/order-received?x=" + paymentId
    localStorage.setItem("orderId", paymentId)
    localStorage.removeItem("cart")
  })
  .catch((error) => {
    console.error("Lỗi khi thêm dữ liệu vào Firebase: " + error);
  });

}