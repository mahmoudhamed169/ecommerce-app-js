

const containerCategoriesItem = document.querySelector('.categories-items');
const containerProductItem = document.querySelector('.product-items');
let cards;
let categoriesData;
let productsData;
var catTitle;

const asc = document.querySelector('.asc');
const desc = document.querySelector('.desc');
// console.log(desc, asc)

async function getAllCategories() {
  let response = await fetch('https://fakestoreapi.com/products/categories');
  categoriesData = await response.json();
  await displayCategories(categoriesData);


}
async function displayCategories(categories) {
  containerCategoriesItem.innerHTML = "";
  await categories.forEach(cat => {
    // console.log(cat)
    let icone;
    if (cat === "electronics") {
      icone = "fa-tv"
    }
    else if (cat === "jewelery") {
      icone = "fa-camera"

    }
    else if (cat === "men's clothing") {
      icone = "fa-shirt"
    }
    else {
      icone = "fa-sharp fa-light fa-person-dress"
    }
    const html = `
    <div class="card m-2" style="width: 10rem;">          
    <div class="card-body d-flex align-items-lg-center  flex-column">
      <i class="fa-solid ${icone} mt-2 fa-2x py-2"></i>
      <p class="card-title py-2">${cat}</p>           
      
    </div>
  </div>
    
    `
    containerCategoriesItem.insertAdjacentHTML("afterbegin", html)


  });
  cards = await document.querySelectorAll('.card')
  // console.log(cards)
  await onChangeCat(cards)

}
getAllCategories();




const displayProducts = function (products) {
  containerProductItem.innerHTML = "";
  products.forEach(product => {
    const html = `<div class="col-lg-3 col-md-4 col-sm-6    ">
    <div class="product position-relative my-3">
      <i class=" product-icon-love far fa-heart bg-white rounded-5" ></i>
      <i class="fa-regular fa-eye product-icon-eye bg-white rounded-5"></i>
      <div class="text-center bg-light img-container">
        <img src=${product.image} class="product-img m-5" >
      </div>
      <div class="product-info">
        <h5 class="product-title">${product.title}</h5>
        <p class="product-price">$${product.price}</p>
        <div class="rating">
         ${renderRatingStars(product.rating.rate)}

          <span class="rating-count text-black px-2">(${product.rating.count})</span>
        </div>
      </div>
    </div>
  </div>`
    containerProductItem.insertAdjacentHTML("afterbegin", html)

  })

};

const getAllProducts = async function (key = '') {
  let response = await fetch(`https://fakestoreapi.com/products/${key}`);
  productsData = await response.json();
  console.log(productsData);
  await displayProducts(productsData)
}

getAllProducts()


const sotrtProducts = async function (key = '', sort) {
  let response = await fetch(`https://fakestoreapi.com/products/${key}/?sort=${sort}`);
  productsData = await response.json();
  console.log(productsData);
  await displayProducts(productsData)
}






function onChangeCat(cards) {
  cards.forEach((cat) => {
    cat.addEventListener('click', function (e) {
      
      catTitle = `category/${this.querySelector('p').innerHTML}`;
      console.log(catTitle)
      getAllProducts(catTitle)
    })

  })
}

desc.addEventListener('click', async function (e) {
  // e.defaultPrevented()
  console.log("hi")
  await sotrtProducts(catTitle, 'desc')

})

asc.addEventListener('click', async function (e) {
  // e.defaultPrevented()
  console.log("hi")
  await sotrtProducts(catTitle, 'asc')

})



function renderRatingStars(rating) {
  const filledStarsCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = '';

  for (let i = 0; i < filledStarsCount; i++) {
    starsHTML += '<span class="fa fa-star checked"></span>';
  }
  if (hasHalfStar) {
    starsHTML += '<span class="fa fa-star-half-alt checked"></span>';
  } else {
    const emptyStarsCount = 5 - filledStarsCount - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      starsHTML += '<span class="fa fa-star"></span>';
    }
  }

  return `<div class="rating">${starsHTML}</div>`;
}






























