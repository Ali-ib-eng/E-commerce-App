
const defaultProducts = [
    {
        id: 1,
        img: "./img/jacket.jfif",
        name: "Jacket",
        price: 25,
        category: "clothes"
    },
    {
        id: 2,
        img:"./img/iPhone17promax.jfif",
        name: "iPhone 17 pro max",
        price: 1850,
        category: "Electronical"
    },
    {
        id: 3,
        img: "./img/sunglasses.webp",
        name: "Sunglasses",
        price: 12,
        category: "Accessories"
    },
    {
        id: 4,
        img: "./img/sunglassesonbeach.avif",
        name: "Sunglasses",
        price: 50,
        category: "Accessories"
    }
];
let products;//will put data comes from local storage or default data if local storage is empty or corrupted     
try {
    products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
} catch {
    localStorage.removeItem("products");
    products = defaultProducts;
}

// standalone version of products to be used for filtering and searching without modifying the original data
let displayedProducts = [...products];
//console.log(displayedProducts); 
localStorage.setItem("products", JSON.stringify(products));
const cardscontainer = document.querySelector(".cardscontainer");
const readProducts = (data) => {
    cardscontainer.innerHTML ='';//clear the container before displaying new data
    if (data.length === 0) {
        cardscontainer.innerHTML = `<p>No products found</p>`;
        //return;
    }
    data.forEach(product => {
        cardscontainer.innerHTML += `
        <div class="card" id="${product.id}">
            <img src="${product.img}" alt="product" class="productimgshow">
            <p class="infobox">${product.name}</p>
            <p class="infobox">${product.price}$</p>
            <p class="infobox">${product.category}</p>
        </div>
        `;
    });
};
//default values for search is empty string so it will display all products when the page loads
let searchValue="";
//default values for filters
let selectedValue="all";
let orderValue="unorder";
const form = document.querySelector("form");
const searchInput = document.querySelector(".searchInput");
form.addEventListener("input",() => {
    searchValue = searchInput.value.toLowerCase().trim();
    applyFilters();
});

const selectcategory = document.getElementById("selectcategory");
selectcategory.addEventListener("change", (event) => {
    selectedValue = event.target.value.trim().toLowerCase();
    applyFilters() ;
});
const selectOrder = document.getElementById("selectOrder");
selectOrder.addEventListener("change",(event)=>{
    orderValue=event.target.value.trim().toLowerCase();
    applyFilters();
})

//sort array method edite the original array so we need to create a copy of the original array to sort it without modifying the original data
//like this [...products].sort()
//asc function for price
const asc_sortedprice=()=>{
    return[...displayedProducts].sort((a , b)=> a.price -b.price);   
}
//desc function for price
const desc_sortedprice=()=>{
    return [...displayedProducts].sort((a , b)=> b.price -a.price);
    
}
const applyFilters=()=>{
    //let products=[...products];
    displayedProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );
    if (selectedValue !=="all") {
        displayedProducts = displayedProducts.filter(product =>
        product.category.toLowerCase() === selectedValue);
}
if(orderValue==="asc"){
        displayedProducts=asc_sortedprice();
    }
    else if(orderValue==="desc"){
        displayedProducts=desc_sortedprice();
    }
readProducts(displayedProducts);
readSlider(displayedProducts);
}
const sliders=document.querySelector(".sliders"); 
//const Allsliders=document.querySelectorAll(".sliders"); 
const prevBtn=document.querySelector("#prevBtn");
const nextBtn=document.querySelector("#nextBtn");
let count=0;
let newcount;
    /*displayedProducts.forEach(product=>{
        
            sliders.innerHTML+=`
    <div class="slidecontent" id="${product.id}">
        <img src="${product.img}" alt="product${product.name}" class="showimageinslider">
    </div>
    `  
    })*/
   const readSlider = (data) => {
    sliders.innerHTML = "";
    if (data.length === 0) {
        sliders.innerHTML = `<p>No products</p>`;
        return 0;
    }
    data.forEach(product => {
        sliders.innerHTML += `
        <div class="slidecontent" id="${product.id}">
            <img src="${product.img}" alt="product${product.name}" class="showimageinslider">
            <div class="sliderinfoBox"><p>info list</p><p>${product.name}</p>
            <p>${product.price}$</p>
            </div>
        </div>
        `;
    });

    // reset slider position
    count = 0;
    moveSlides(count);
    //console.log(count)
};
//sliders.style.width = `${products.length * 100}%`;
    prevBtn.addEventListener("click",()=>{
if(count==0){
    count=displayedProducts.length-1;
}
else{
    count--;
} 
moveSlides(count);
console.log("prev",count)
})

    nextBtn.addEventListener("click",()=>{
    if(count==displayedProducts.length-1){
        count=0;}
        else{
            count++;
        } 
        moveSlides(count);
        console.log("next",count)
    })
//clickprevButton();
//clicknextButton();
    const moveSlides = (count) => {
    sliders.style.transform = `translateX(-${count * 100}%)`;
}
//moveSlides()
readProducts(displayedProducts);
readSlider(displayedProducts)