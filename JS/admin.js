let products;
try {
    products = JSON.parse(localStorage.getItem("products")) || [];
} catch {
    localStorage.removeItem("products");
    products = [];
}
//console.log(products)
const formAdd=document.querySelector("#addForm");
const productName=document.querySelector("#addnewProduct");
const productPrice=document.querySelector("#addnewPrice");
const category=document.querySelector("#selectCategory");
const imgLink=document.querySelector("#addURL");
const tbody=document.querySelector("#dataTable #tbody");
let editBtnid=null;//state variable
//add new product and display them in home page
formAdd.addEventListener("submit",(event)=>{
    event.preventDefault();
    if (!productPrice.value||productPrice.value<=0) {
        alert("is invalid value");
        //return;
    }
    if(editBtnid==null){
        let newProduct={
        id:products[products.length-1]?.id+1||1 ,//accsess to id 
        img:imgLink.value ,
        name:productName.value ,
        price: productPrice.value,
        category:category.value
    }
    //lastid++;
    //console.log(lastid)
    products.push(newProduct);
    }else{
        products=products.map(product=>{
            if(product.id==editBtnid){
                return{
                    id:product.id,
                    img:imgLink.value,
                    name:productName.value,
                    price:productPrice.value,
                    category:category.value
                };
            };
            return product;
        })
        editBtnid=null;
    }
    //localStorage.setItem("products", JSON.stringify(newProduct));
    //saveProducts(products)
    //localStorage.setItem("lastid", JSON.stringify(lastid));
    localStorage.setItem("products",JSON.stringify(products));
    imgLink.value='';
    productName.value='';
    productPrice.value='';
    //category.value='';
    readTable();
})
/*function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}*/
//let prevproducts=JSON.parse(localStorage.getItem("products"));
//console.log(prevproducts)
const readTable=()=>{
    tbody.innerHTML=''
    products.forEach(product => {
        tbody.innerHTML+=`
        <tr id="lineinfo${product.id}">
                <td id="info"><div class="prod-name-cell">
                <img src="${product.img}" alt=${product.name} class="table-img" id="info">
                <span id="info">${product.name}</span>
                </div>
                </td>
                <td id="info">${product.price}$</td>
                <td id="info">${product.category}</td>
                <td>
                <button class="editbtn" id="${product.id}" onclick="editbtn(${product.id})">edit</button>
                <button class="deletebtn" id="${product.id}" onclick="deletebtn(${product.id})">delete</button>
                </td>
        </tr>
        `
    });
}
const editbtn=(id)=>{
    //const lineinfo=document.querySelector(`#lineinfo${id} #info`);
    //console.log(lineinfo)
    editBtnid=id;
    const product=products.find(product=>product.id==id);
    //console.log(product)
    productName.value=product.name;
    productPrice.value=product.price;
    imgLink.value=product.img;
    category.value=product.category;
    window.scrollTo({ top: 0, behavior: "smooth" });
    localStorage.setItem("products",JSON.stringify(products))
    readTable();
};
const deletebtn=(id)=>{
products=products.filter(product=>product.id!=id);
localStorage.setItem("products",JSON.stringify(products))
readTable();
}
readTable();
//console.log(products);