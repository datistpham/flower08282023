const updateCartBadge= ()=> {
    let cart1 = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector(".pp-cart-counter").innerHTML= (cart1.length);
}

updateCartBadge()