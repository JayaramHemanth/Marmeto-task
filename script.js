document.addEventListener("DOMContentLoaded", function () {
    // Show default category content (Men)
    document.getElementById("Men").classList.add("show");
  });
  
  function openCategory(evt, categoryName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("show");
    }
  
    // Get all elements with class="tablinks" and remove the "active" class
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(categoryName).classList.add("show");
    evt.currentTarget.classList.add("active");
  
    // Clear the content of the current category
    for (i = 0; i < tabcontent.length; i++) {
      if (tabcontent[i].id !== categoryName) {
        tabcontent[i].innerHTML = "";
      }
    }
  
    // Fetch and display data for the selected category
    fetchData(categoryName);
  }
  
  function fetchData(categoryName) {
    // Simulating fetching data from API
    fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    )
      .then((response) => response.json())
      .then((data) => displayCategoryData(data, categoryName))
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  function displayCategoryData(data, categoryName) {
    const categoryData = data.categories.find(
      (category) => category.category_name === categoryName
    );
    const categoryContent = document.getElementById(categoryName);
    categoryContent.innerHTML = ""; // Clear existing content
  
    categoryData.category_products.forEach((product) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <p>Price: ${product.price}</p>
        <h3>${product.title}</h3>
      `;
      categoryContent.appendChild(itemElement);
    });
  }
  