
  
  // Firebase Realtime Database reference
  const db = firebase.database();
  const settingsRef = db.ref("settings");
  
  // DOM elements
  const phone1Element = document.querySelector(".phone-shop-1");
  const phone2Element = document.querySelector(".phone-shop-2");
  const fbPageLinkElement = document.querySelector("#link-page-fb");
  const shopAddressElement = document.querySelector(".shopAddress");
  const contactWholeSale= document.querySelector("#contact-wholesale")
  
  // Sử dụng Firebase để lấy dữ liệu cài đặt và hiển thị vào DOM
  settingsRef.once("value").then((snapshot) => {
    const settings = snapshot.val();
    if (settings) {
      // Hiển thị thông tin cài đặt trong DOM
      phone1Element.textContent = settings.phone1;
      phone2Element.textContent = settings.phone2;
      fbPageLinkElement.setAttribute("href", settings.fbPageLink)
      shopAddressElement.innerText = settings.shopAddress;
      contactWholeSale.onclick= ()=> {
        window.open(settings.fbPageLink, "_blank")
      }
    }
  });
  