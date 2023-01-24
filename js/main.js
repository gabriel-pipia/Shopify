const Api__Url = `https://makeup-api.herokuapp.com/api/v1/products.json?brend=maybelline`;
let Data__Array = [];
let NeW__Data__Array = Data__Array;
let Prodact__Item__Id = JSON.parse(localStorage.getItem('Prodact__Item__Id')) || [];
let Prodact__Item__Id__Arr = Prodact__Item__Id;
let Display__Theme = localStorage.getItem('Theme') || "Light";
let Display__Item = localStorage.getItem('Item') || 12;

const Loading__Contaner = document.querySelector("[Loading__Contaner]");
const Container = document.querySelector("[Container]");
const Root = document.querySelector(":root");

// ======= Header Start ======= //
const Btn__OpanCart = document.querySelector("[Btn__OpanCart]");
const Btn__OpanNav = document.querySelector("[Btn__OpanNav]");
const Cart__Count = document.querySelector("[Cart__Count]");
// ======= Header End ======= //

// ======= Cart Start ======= // 
const Cart__Container = document.querySelector("[Cart__Container]");
const Cart__Item__Wrapper = document.querySelector("[Cart__Item__Wrapper]");
const Total__Price = document.querySelector("[Total__Price]");
// Cart Action Buttons
const Cart__Overlay = document.querySelector("[Cart__Overlay]");
const Btn__CartClose = document.querySelector("[Btn__CartClose]");
const Btn__CartClear = document.querySelector("[Btn__CartClear]");
// ======= Cart End ======= //

// ======= Nav Start ======= // 
const Nav__Container = document.querySelector("[Nav__Container]");
const Nav__Input = document.querySelector("[Nav__Input]");
const Nav__Count__Text = document.querySelector("[Nav__Count__Text]");
const Nav__Theme__Text = document.querySelector("[Nav__Theme__Text]");
// Nav Action Buttons
const Nav__Overlay = document.querySelector("[Nav__Overlay]");
const Btn__NavClose = document.querySelector("[Btn__NavClose]");
const Btn__NavSave = document.querySelector("[Btn__NavSave]");
// Nav Theme Buttons
const Btn__Theme__Item = document.querySelectorAll("[Btn__Theme__Item]");


// ======= Nav End ======= //

// ======= Main Start ======= //
const Main = document.querySelector("[Main]");
const Main__Content__Wrapper = document.querySelector("[Main__Content__Wrapper]");
const Card__Item__Wrapper = document.querySelector("[Card__Item__Wrapper]");
// Select //
const Select__SortBy = document.querySelector("[Select__SortBy]");
// Button //
const Btn__OpanFilter = document.querySelector("[Btn__OpanFilter]");
// ======= Main End ======= //

// ======= Filter Start ======= //
const Filter__Container = document.querySelector("[Filter__Container]");
const Filter__Overlay = document.querySelector("[Filter__Overlay]");
const Filter__Title = document.querySelector("[Filter__Title]");
// input //
const Search__Input = document.querySelector("[Search__Input]");
const PriceFrom__Input = document.querySelector("[PriceFrom__Input]");
const PriceEnd__Input = document.querySelector("[PriceEnd__Input]");
// Select //
const Select__Brend = document.querySelector("[Select__Brend]");
const Select__Category = document.querySelector("[Select__Category]");
const Select__Type = document.querySelector("[Select__Type]");
// Button //
const Btn__Filter = document.querySelector("[Btn__Filter]");
const Btn__FilterClose = document.querySelector("[Btn__FilterClose]");
const Btn__FilterClear = document.querySelector("[Btn__FilterClear]");
// ======= Filter End ======= //

// ======= Aside Start ======= //
const Aside__Container = document.querySelector("[Aside__Container]");
const Aside__Overlay = document.querySelector("[Aside__Overlay]");
const Btn__AsideClose = document.querySelector("[Btn__AsideClose]");
const Aside__Title = document.querySelector("[Aside__Title]");
const Product__Info__Contaner = document.querySelector("[Product__Info__Contaner]");
const Btn__Add__Cart = document.querySelector("[Btn__Add__Cart]");
// ======= Aside End ======= //

// ======= Image Start ======= //
const Image__Container = document.querySelector("[Image__Container]");
const Image__Overlay = document.querySelector("[Image__Overlay]");
// button //
const Btn__ImageClose = document.querySelector("[Btn__ImageClose]");
// image //
const Product__Image = document.querySelector(".Container .Image__Container img");

// ======= Aside End ======= //


// ======= Pagination Start ======= //
const Pagination__Number__Wrapper = document.querySelector("[Pagination__Number__Wrapper]");
const Btn__Pagination__Prev = document.querySelector("[Btn__Pagination__Prev]");
const Btn__Pagination__Next = document.querySelector("[Btn__Pagination__Next]");
// ======= Pagination End ======= //

// ======= Eventlistener Start ======= //
// Cart Opan Btn
Btn__OpanCart.addEventListener('click', Opan__Cart__Contaner);
// Cart Close Btn
Cart__Overlay.addEventListener('click', Close__Cart__Contaner);
Btn__CartClose.addEventListener('click', Close__Cart__Contaner);

// Nav Opan Btn
Btn__OpanNav.addEventListener('click', Opan__Nav__Contaner);
// Nav Close Btn
Nav__Overlay.addEventListener('click', Close__Nav__Contaner);
Btn__NavClose.addEventListener('click', Close__Nav__Contaner);

Select__SortBy.addEventListener('change', Get__SortBy__Value);
Search__Input.addEventListener('keyup', Get__Search__Value);
Search__Input.addEventListener('change', Get__Search__Value);
// Filter opan Btn
Btn__OpanFilter.addEventListener('click', Opan__Filter__Contaner);
// Filter Close Btn
Btn__FilterClose.addEventListener('click', Opan__Filter__Contaner);
Filter__Overlay.addEventListener('click', Opan__Filter__Contaner);
Btn__Filter.addEventListener('click', Get__All__Filter__Value);
// image Close Btn
Btn__ImageClose.addEventListener('click', Close__Image__Container);
Image__Overlay.addEventListener('click', Close__Image__Container);
// aside Close Btn
Aside__Overlay.addEventListener('click', Close__Aside__Container);
Btn__AsideClose.addEventListener('click', Close__Aside__Container);
// window
window.addEventListener("popstate", Detect__History);
// Cart Clear Btn
Btn__CartClear.addEventListener('click', () => {
  Cart__Item__Wrapper.innerHTML = `<h3 class="Text__Cart__Empty">Cart is Empty</h3>`;
  Prodact__Item__Id__Arr = [];
  localStorage.clear();
  Product__Cart__Item();
});

Btn__Theme__Item.forEach(Btn => {
  Btn.addEventListener('click', () => {
    Btn__Theme__Item.forEach(b => { b.classList.remove('active') });
    let Theme = Btn.getAttribute("Theme");
    Btn.classList.add('active');
    Set__Theme(Theme);
    ActiveRemove__Btn__Theme(Theme);
  });
});

Nav__Count__Text.innerHTML = `${Display__Item} Items`;

Nav__Input.addEventListener('input', () => {
  Nav__Count__Text.innerHTML = `${Nav__Input.value} Items`;
  Check__NavInput(Nav__Input.value, Display__Theme);
});

Btn__NavSave.addEventListener('click', () => {
  localStorage.setItem('Item', Nav__Input.value);
  localStorage.setItem('Theme', Display__Theme);
  ProductOn__Display(Data__Array);

  Check__NavInput(localStorage.getItem('Item'), localStorage.getItem('Theme'));
});

Btn__Add__Cart.addEventListener('click', () => {
  let Item__Id = Btn__Add__Cart.getAttribute("Id");
  Add__ToCart(Item__Id);
});

// ======= Eventlistener End ======= //

window.onload = () => {
  Loading__Contaner.classList.add('active');
  setTimeout(() => {
    Container.classList.add('active');
    Loading__Contaner.classList.remove('active');
  }, 1500);
};

function Check__NavInput(value, Theme) {
  // Nav__Input.value = Display__Item;

  let New__Theme = localStorage.getItem('Theme') || "Light";
  let New__Itme = localStorage.getItem('Item') || 12;

  if (New__Itme != value || New__Theme != Theme) {
    Btn__NavSave.classList.add('active');
  } else {
    Btn__NavSave.classList.remove('active');
  }
}

const Light__theme = () => {
  Root.classList.add("Light__Mode");
  Root.classList.remove("Dark__Mode");
  Root.classList.remove("Dim__Mode");

  localStorage.setItem("Theme", "Light");
};

const Dark__theme = () => {
  Root.classList.remove("Light__Mode");
  Root.classList.add("Dark__Mode");
  Root.classList.remove("Dim__Mode");

  localStorage.setItem("Theme", "Dark");
};

const Dim__theme = () => {
  Root.classList.remove("Light__Mode");
  Root.classList.remove("Dark__Mode");
  Root.classList.add("Dim__Mode");

  localStorage.setItem("Theme", "Dim");
};

if (Display__Theme == "Light") {
  Light__theme();
  ActiveRemove__Btn__Theme(Display__Theme);
  Nav__Theme__Text.textContent = "Light";
  Btn__Theme__Item[0].classList.add("active");
  Btn__Theme__Item[1].classList.remove("active");
  Btn__Theme__Item[2].classList.remove("active");
}
if (Display__Theme == "Dark") {
  Dark__theme();
  ActiveRemove__Btn__Theme(Display__Theme);
  Nav__Theme__Text.textContent = "Dark";
  Btn__Theme__Item[1].classList.add("active");
  Btn__Theme__Item[0].classList.remove("active");
  Btn__Theme__Item[2].classList.remove("active");
}
if (Display__Theme == "Dim") {
  Dim__theme();
  ActiveRemove__Btn__Theme(Display__Theme);
  Nav__Theme__Text.textContent = "Dim";
  Btn__Theme__Item[2].classList.add("active");
  Btn__Theme__Item[1].classList.remove("active");
  Btn__Theme__Item[0].classList.remove("active");
}

function Set__Theme(Theme) {
  Display__Theme = localStorage.getItem('Theme') || "Light";

  Btn__NavSave.addEventListener('click', () => {
    if (Theme == "Light") {
      Light__theme();
      Nav__Theme__Text.textContent = "Light";
    } else if (Theme == "Dark") {
      Nav__Theme__Text.textContent = "Dark";
      Dark__theme();
    } else if (Theme == "Dim") {
      Nav__Theme__Text.textContent = "Dim";
      Dim__theme();
    }
  });
}

function ActiveRemove__Btn__Theme(Theme) {
  Btn__Theme__Item.forEach(Btn => {
    let theme = Btn.getAttribute("Theme");
    if (Theme == theme) {
      Btn.classList.add('active');
      Check__NavInput(Nav__Input.value, theme);
    }
  });
}

function Opan__Nav__Contaner() {
  Nav__Container.classList.add("active");
  window.history.pushState({ id: 1 }, null, `?Setting`);
}

function Close__Nav__Contaner() {
  Nav__Container.classList.remove("active");
}

function Get__Api__Data() {
  Loading__Contaner.classList.add('active');
  Container.classList.remove('active');
  fetch(Api__Url).then(res => res.json()).then(data => {
    for (let i = 0; i < 100; i++) {
      Data__Array.push(data[i]);
    }
    Get__Data()
  }).catch(err => {
    console.log(err);
  });
}
Get__Api__Data();

function Get__Data() {
  Loading__Contaner.classList.remove('active');
  Container.classList.add('active');
  ProductOn__Display(Data__Array);
  Create__Select__Option();
}

function Create__Select__Option() {
  let brand__arr = [];
  Select__Brend.innerHTML = "";

  Select__Brend.removeAttribute("disabled");

  for (let Data of Data__Array) {
    brand__arr.push(Data.brand);
  }
  brand__arr = [...new Set(brand__arr)];

  let brand = document.createElement("option")
  brand.setAttribute("value", "");
  brand.innerText = "Brand";

  Select__Brend.appendChild(brand);

  for (const value of brand__arr) {
    let option = document.createElement("option")
    option.setAttribute("value", value);
    option.innerText = value;

    Select__Brend.appendChild(option);
  }
  Select__Brend.addEventListener('change', Create__Category__Option);
  Btn__FilterClear.addEventListener('click', Clear__Filter);
}

function Create__Category__Option() {
  let Brend__Value = Select__Brend.value.toLowerCase();
  let category__arr = [];
  let Temp__Arr = Data__Array.filter(i => i.brand == Brend__Value);
  Select__Category.innerHTML = "";

  if (Brend__Value != "") {
    Select__Category.removeAttribute("disabled");
    Select__Type.removeAttribute("disabled");
    Btn__FilterClear.classList.add('active');
  } else {
    Select__Category.setAttribute("disabled", "");
    Select__Type.setAttribute("disabled", "");
    Btn__FilterClear.classList.remove('active');
  }

  for (let Data of Temp__Arr) {
    category__arr.push(Data.category);
  }

  category__arr = [...new Set(category__arr)];

  let category = document.createElement("option")
  category.setAttribute("value", "");
  category.innerText = "Category";
  Select__Category.prepend(category);

  for (const value of category__arr) {
    if (value !== null) {
      console.log(typeof value);
      let option = document.createElement("option")
      option.setAttribute("value", value);
      option.innerText = value;

      Select__Category.appendChild(option);
    }
  }

  Select__Category.addEventListener('change', Create__Type__Option);
}

function Create__Type__Option() {
  let Category__Value = Select__Category.value.toLowerCase();
  let type__arr = [];
  let Temp__Arr = Data__Array.filter(i => i.category == Category__Value);
  Select__Type.innerHTML = "";

  for (let Data of Temp__Arr) {
    type__arr.push(Data.product_type);
  }
  type__arr = [...new Set(type__arr)];

  let type = document.createElement("option")
  type.setAttribute("value", "");
  type.innerText = "Type";
  Select__Type.prepend(type);

  for (const value of type__arr) {
    if (value != "" || value != null) {
      let option = document.createElement("option")
      option.setAttribute("value", value);
      option.innerText = value;

      Select__Type.appendChild(option);
    }
  }
}

function Clear__Filter() {
  Create__Select__Option();
  Btn__FilterClear.classList.remove('active');
  Search__Input.value = "";
  PriceFrom__Input.value = "";
  PriceEnd__Input.value = "";

  Select__Type.innerHTML = "";
  Select__Category.innerHTML = "";
  let category = document.createElement("option")
  category.setAttribute("value", "");
  category.innerText = "Category";
  let type = document.createElement("option")
  type.setAttribute("value", "");
  type.innerText = "Type";

  Select__Category.prepend(category);
  Select__Type.prepend(type);

  ProductOn__Display(Data__Array);
}

function Get__SortBy__Value() {
  let SortBy__Value = Select__SortBy.value;

  if (SortBy__Value == "") {
    NeW__Data__Array = Data__Array;
    ProductOn__Display(Data__Array)
  }

  if (SortBy__Value == "Defult") {
    NeW__Data__Array = Data__Array;
    ProductOn__Display(Data__Array)
  }

  if (SortBy__Value == "Price") {
    NeW__Data__Array = Data__Array;
    NeW__Data__Array = NeW__Data__Array.sort((a, b) => {
      if (parseInt(a.price) < parseInt(b.price)) {
        return 1
      } else {
        return -1
      }
    });

    ProductOn__Display(NeW__Data__Array)
  }

  if (SortBy__Value == "Name") {
    NeW__Data__Array = Data__Array;
    NeW__Data__Array = NeW__Data__Array.sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a.trim() < b.trim()) {
        return -1
      } else {
        return 1
      }
    });
    ProductOn__Display(NeW__Data__Array)
  }

  ProductOn__Display(NeW__Data__Array)
}

function Get__Search__Value() {
  let Search__Value = Search__Input.value.trim();
  let NeW__Data = NeW__Data__Array.filter(i => i.name.toLowerCase().includes(Search__Value.toLowerCase()));

  ProductOn__Display(NeW__Data);
}

function Get__All__Filter__Value() {
  let PriceFrom__Value = PriceFrom__Input.value;
  let PriceEnd__Value = PriceEnd__Input.value;
  let Brend__Value = Select__Brend.value.toLowerCase();
  let Category__Value = Select__Category.value.toLowerCase();
  let Type__Value = Select__Type.value.toLowerCase();

  let Brand = "";
  let Category = "";
  let Type = "";

  let Price = NeW__Data__Array.filter(i => i.price >= PriceFrom__Value && i.price <= PriceEnd__Value);
  if (Price != "") {
    if (PriceFrom__Value < PriceEnd__Value && PriceEnd__Value > PriceFrom__Value) {
      ProductOn__Display(Price);
      if (Price != "") {
        Brand = Price.filter(i => i.brand == Brend__Value);
        if (Brand != "") {
          ProductOn__Display(Brand);
          Category = Brand.filter(i => i.category == Category__Value);
          if (Category != "") {
            ProductOn__Display(Category);
            Type = Category.filter(i => i.product_type == Type__Value);
            if (Type != "") {
              ProductOn__Display(Type);
            }
          }
        }
      }
    }
  } else {
    Brand = NeW__Data__Array.filter(i => i.brand == Brend__Value);
    if (Brand != "") {
      ProductOn__Display(Brand);
      Category = Brand.filter(i => i.category == Category__Value);
      if (Category != "") {
        ProductOn__Display(Category);
        Type = Category.filter(i => i.product_type == Type__Value);
        if (Type != "") {
          ProductOn__Display(Type);
        }
      }
    }
  }
}

function ProductOn__Display(Data__Array) {
  Card__Item__Wrapper.innerHTML = "";

  for (const i in Data__Array) {
    let Card__Item = document.createElement('div');
    Card__Item.classList.add('Card__Item');

    Card__Item.innerHTML = `
    <div class="Image__Wrapper" Id="${i}">
      <img src="${Data__Array[i].api_featured_image}" alt="">
    </div>
    <div class="Card__Bottom">
      <h3 class="Card__Title" Index="${i}" Id="${Data__Array[i].id}">${Data__Array[i].name}</h3>
      <span class="price">${Data__Array[i].price}${Data__Array[i].price_sign}</span>
      <button class="Btn Btn__AddCart" Index="${i}" Id="${Data__Array[i].id}">
        <i class="fa fa-shopping-bag"></i>
        <span>Add To Cart</span>
      </button>
    </div>`;

    Card__Item__Wrapper.appendChild(Card__Item);
  }

  document.querySelectorAll(".Card__Item .Card__Bottom .Card__Title").forEach((Title, i) => {
    Title.addEventListener("click", () => {
      let index = Title.getAttribute('Index');
      let id = Title.getAttribute('Id');
      Opan__Aside__Container(index, id, Data__Array);
    });
  });

  document.querySelectorAll(".Card__Item .Image__Wrapper").forEach((Title, i) => {
    Title.addEventListener("click", () => {
      let index = Title.getAttribute('Id')
      Opan__Image__Container(index, Data__Array)
    });
  });

  document.querySelectorAll(".Card__Item .Btn__AddCart").forEach((Btn, i) => {
    let Item__Id = Btn.getAttribute("Id");

    Btn.addEventListener("click", () => {
      Add__ToCart(Item__Id);
    });
  });

  Product__Cart__Item();

  let Card__Item = document.querySelectorAll(".Card__Item");

  let New__Display__Item = localStorage.getItem('Item') || 12;
  let Prodact__Item__Limit = Display__Item == Display__Item ? New__Display__Item : Display__Item;
  let Current__Page = 1;
  let Page__Count = Math.ceil(Data__Array.length / Prodact__Item__Limit);

  Set__Current__Page(1);
  Set__Pagination__Number();
  Active__Pagination__Number();

  function Set__Current__Page(Page__Index) {
    Current__Page = Page__Index;

    Active__Pagination__Number();
    Pagination__Button__Status();

    let Prev__Limit = (Page__Index - 1) * Prodact__Item__Limit;
    let Next__Limit = Page__Index * Prodact__Item__Limit;

    Card__Item.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= Prev__Limit && index < Next__Limit) {
        item.classList.remove("hidden");
      }
    });
  }

  function Active__Pagination__Number() {
    document.querySelectorAll(".Pagination__Number").forEach((button) => {
      let Page__Index = Number(button.getAttribute("Page__Index"));
      button.classList.remove("active");
      if (Page__Index == Current__Page) {
        button.classList.add("active");
      }
    });
  };

  function Pagination__Button__Status() {
    if (Current__Page === 1) {
      Disable__Btn__Pagination(Btn__Pagination__Prev);
    } else {
      Enable__Btn__Pagination(Btn__Pagination__Prev);
    }

    if (Page__Count === Current__Page) {
      Disable__Btn__Pagination(Btn__Pagination__Next);
    } else {
      Enable__Btn__Pagination(Btn__Pagination__Next);
    }
  };

  function Create__Pagination__Number(index) {
    const Pagination__Number = document.createElement("button");
    Pagination__Number.classList.add("Pagination__Number", "Btn");
    Pagination__Number.innerHTML = index;
    Pagination__Number.setAttribute("Page__Index", index);

    Pagination__Number__Wrapper.appendChild(Pagination__Number);
  };

  function Set__Pagination__Number() {
    Pagination__Number__Wrapper.innerHTML = "";
    for (let i = 1; i <= Page__Count; i++) {
      Create__Pagination__Number(i);
    }
  };

  Btn__Pagination__Prev.addEventListener("click", () => {
    Set__Current__Page(Current__Page - 1);
  });

  Btn__Pagination__Next.addEventListener("click", () => {
    Set__Current__Page(Current__Page + 1);
  });

  document.querySelectorAll(".Pagination__Number").forEach((button) => {
    let Page__Index = Number(button.getAttribute("Page__Index"));
    if (Page__Index) {
      button.addEventListener("click", () => {
        Set__Current__Page(Page__Index);
      });
    }
  });
}

function Add__ToCart(Item__Id) {
  let Id = Item__Id;
  Prodact__Item__Id__Arr.push(Id);

  localStorage.setItem("Prodact__Item__Id", JSON.stringify(Prodact__Item__Id__Arr));
  Product__Cart__Item();
}

function Product__Cart__Item() {
  let Item__Id = Prodact__Item__Id__Arr;
  let price__Arr = [];
  let Price__Sum = 0;

  Cart__Item__Wrapper.innerHTML = "";

  if (Item__Id != "") {
    for (const Id of Item__Id) {
      let Cart__Item__Arr = Data__Array.filter(i => i.id == parseInt(Id));

      let Cart__Item = document.createElement('div');
      Cart__Item.classList.add("Cart__Item");

      Cart__Item.innerHTML = `
      <span class="Btn__Delete__Items" Id="${Cart__Item__Arr.map(i=> i.id)}"><i class="fa fa-times"></i></span>

      <div class="Cart__Item__Image">
        <img src="${Cart__Item__Arr.map(i=> i.api_featured_image)}" alt="">
      </div>

      <div class="Cart__Item__Content">
        <h3>${Cart__Item__Arr.map(i=> i.name)}</h3>
        <span>${Cart__Item__Arr.map(i=> i.price)}${Cart__Item__Arr.map(i=> i.price_sign)}</span>
      </div>`;

      Cart__Item__Wrapper.appendChild(Cart__Item);

      Cart__Count.textContent = `${Item__Id.length}`;
      Cart__Count.classList.add('active');
      Btn__CartClear.classList.add('active');

      price__Arr.push(Cart__Item__Arr.map(i => i.price));
    }

    document.querySelectorAll(".Btn__Delete__Items").forEach((Btn, i) => {
      let Btn__Id = Btn.getAttribute("Id");
      Btn.addEventListener("click", () => {
        Remove__Cart__Item(Btn__Id);
      });
    });

  } else {
    Total__Price.textContent = 0;
    Cart__Count.textContent = 0;
    Cart__Count.classList.remove('active');
    Btn__CartClear.classList.remove('active');
    Cart__Item__Wrapper.innerHTML = `<h3 class="Text__Cart__Empty">Cart is Empty</h3>`;
  }

  for (const price of price__Arr) {
    Price__Sum += parseInt(price);
  }
  Total__Price.textContent = Price__Sum.toFixed(2);
}

function Remove__Cart__Item(Btn__Id) {
  Prodact__Item__Id__Arr = Prodact__Item__Id__Arr.filter(i => i != Btn__Id);
  localStorage.removeItem("Prodact__Item__Id");
  localStorage.setItem("Prodact__Item__Id", JSON.stringify(Prodact__Item__Id__Arr));
  Product__Cart__Item();
}

function Disable__Btn__Pagination(button) {
  button.setAttribute("disabled", "");
}

function Enable__Btn__Pagination(button) {
  button.removeAttribute("disabled");
}

function Opan__Cart__Contaner() {
  Cart__Container.classList.add('active');
  window.history.pushState({ id: 1 }, null, `?Cart`);
}

function Close__Cart__Contaner() {
  Cart__Container.classList.remove('active');
}

function Opan__Image__Container(i, Data__Array) {
  Image__Container.classList.add('active');
  window.history.pushState({ id: 1 }, null, `?image=${Data__Array[i].api_featured_image}`);

  Product__Image.setAttribute("src", `${Data__Array[i].api_featured_image}`);
}

function Close__Image__Container() {
  Image__Container.classList.remove('active');
}

function Opan__Aside__Container(i, id, Data__Array) {
  Aside__Container.classList.add('active');
  window.history.pushState({ id: 1 }, null, `?Name=${Data__Array[i].name}`);

  Product__Info__Contaner.innerHTML = `
  <div class="Product__Image__Wrapper">
  <img src="${Data__Array[i].api_featured_image}" alt="">
  <div class="Product__Info__Top__Wrapper">
    <h3 class="Product__Title">${Data__Array[i].name}</h3>
    <span class="Product__Price">${Data__Array[i].price}${Data__Array[i].price_sign}</span>
  </div>
</div>

<div class="Product__Info__Bottom__Wrapper">
  <div class="Info__Wrapper">
    <h3 class="Info__Title">Brend: </h3>
    <span class="Info__value">${Data__Array[i].brand}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">category: </h3>
    <span class="Info__value">${Data__Array[i].category}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">type: </h3>
    <span class="Info__value">${Data__Array[i].product_type}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">description: </h3>
    <p class="Info__value">${Data__Array[i].description}</p>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">website link: </h3>
    <a href="${Data__Array[i].product_link}" class="Info__value">${Data__Array[i].product_link}</a>
  </div>
  </div>`;

  Btn__Add__Cart.setAttribute("Id", id);
}

function Close__Aside__Container() {
  Aside__Container.classList.remove('active');
}

function Opan__Filter__Contaner() {
  Main.classList.toggle('active');
}

function Detect__History() {
  Close__Aside__Container();
  Close__Image__Container();
  Close__Cart__Contaner();
  Close__Nav__Contaner();
}

// ======= Function End ======= //