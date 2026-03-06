const productsData = [
    {
        id: 1,
        name: "قالب كيك حجم كبير",
        price:22,
        image: "img/kekBig.jpg",
        category: "candy1",
        description : "قالب كيك حجم كبير بالكرمل "
    },
    {
        id: 2,
        name: "  طاقية الباشا ",
        price: 14,
        image: "img/kekSade.jpg",
        category: "candy1",
        description: "قالب  طاقية الباشا , يكفي 5 أشخاص"
    },
    {
        id: 3,
        name: "  بقلاوة عربية بالفستق الحلبي",
        price: 30,
        image: "img/knafiFistek.jpg",
        category: "candy3",
        description: "بقلاوة عربية بالفستق الحلبي ,سعر الكيلو 30 يورو "
    },
    {
        id: 4,
        name: " بقلاوة عربية بجوز ",
        price: 30,
        image: "img/knafiSade.jpg",
        category: "candy3",
        description: "بقلاوة عربية بجوز, سحر النكهة , سعر الكيلو 30 يورو "
    },
    {
        id: 5,
        name: "  بيتيفور ",
        price: 10,
        image: "img/betefor.jpg",
        category: "candy2",
        description: "  معجنات العيد , بيتيفور بأشكال مختلفة , سعر الكيلو10 يورو"
    },
    {
        id: 6,
        name: " دونات 😊",
        price: 1,
        image: "img/donat.jpg",
        category: "candy2",
        description: "معجنات , دونات سادة . سعر القطعة 1 يورو"
    },
    {
        id: 7,
        name: " قطايف",
        price: 1.5,
        image: "img/katayef.jpg",
        category: "candy3",
        description: " قطايف , حلويات رمضان وكل يوم , سعر القطعة دولار ونص"
    },
    {
        id: 8,
        name: " بسكويت ",
        price: 7,
        image: "img/bskwet.jpg",
        category: "candy2",
        description: "بسكويت مغطى بجوز الهند أو الفستق الحلبي , سعر الكيلو 7 يورو"
    },
      {
        id: 9,
        name: " بيتيفور ",
        price: 7,
        image: "img/betefor2.jpg",
        category: "candy2",
        description: "بيتيفور مغطى بجوز الهند , سعر الكيلو 7 يورو"
    },
      {
        id: 10,
        name: " حلاوة الجبن ",
        price: 15,
        image: "img/jbn.jpg",
        category: "candy3",
        description: "  حلاوة الجبن , بالقشطة , نظافة تامة مع القطر سعر الكيلو 15 يورو"
    },
      {
        id: 11,
        name: "  بيتيفور بالقرفة ",
        price: 9,
        image: "img/betefor44.jpg",
        category: "candy2",
        description: "   بيتيفور بطعم القرفة, طعمٌ لا ينسى,  سعر الكيلو 9 يورو"
    }
];

// سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تحديث الوقت
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    });
    document.getElementById('timeDisplay').textContent = `التوقيت: ${timeString}`;
}

// عرض المنتجات
function displayProducts(filter = 'all') {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? productsData 
        : productsData.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}€</p>
                <div class="product-buttons">
                    <button class="add-to-cart" data-id="${product.id}">إضافة إلى السلة</button>
                    <button class="view-details" data-id="${product.id}">تفاصيل</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // إضافة مستمعين للأزرار
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', viewProductDetails);
    });
}

// إضافة منتج إلى السلة
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = productsData.find(p => p.id === productId);
    
    // التحقق إذا كان المنتج موجودًا بالفعل في السلة
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // تحديث التخزين المحلي
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث عداد السلة
    updateCartCount();
    
    // عرض رسالة تأكيد
    alert(`تمت إضافة ${product.name} إلى سلة التسوق`);
    
    // تحديث عرض السلة إذا كانت مفتوحة
    if (document.getElementById('cartSidebar').classList.contains('open')) {
        displayCartItems();
    }
}

// عرض تفاصيل المنتج
function viewProductDetails(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = productsData.find(p => p.id === productId);
    
    alert(`${product.name}\nالسعر: ${product.price} € \n\n${product.description}`);
}

// تحديث عداد السلة
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// عرض محتويات السلة
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">سلة التسوق فارغة</p>';
        cartTotal.textContent = '0 €';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} € × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `${total} €`;
    
    // تحديث مستمعين لأزرار الحذف
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    // تحديث رابط واتساب مع تفاصيل الطلب
    updateWhatsAppLink(total);
}

// إزالة منتج من السلة
function removeFromCart(e) {
    const productId = parseInt(e.target.closest('button').dataset.id);
    cart = cart.filter(item => item.id !== productId);
    
    // تحديث التخزين المحلي
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث العداد والعرض
    updateCartCount();
    displayCartItems();
}

// تحديث رابط واتساب مع تفاصيل الطلب
function updateWhatsAppLink(total) {
    let message = "أريد شراء المنتجات التالية:\n\n";
    
    cart.forEach(item => {
        message += `- ${item.name} (${item.quantity}) - ${item.price * item.quantity} € \n`;
    });
    
    message += `\nالمجموع: ${total} €`;
    
    const encodedMessage = encodeURIComponent(message);
    document.getElementById('checkoutBtn').href = `https://wa.me/+4915212872977?text=${encodedMessage}`;
}

// إفراغ السلة
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm("هل تريد إفراغ سلة التسوق؟")) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

// تصفية المنتجات
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            // عرض المنتجات المصفاة
            const filter = this.dataset.filter;
            displayProducts(filter);
        });
    });
}

// إعداد القائمة المتحركة للهواتف
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.width = '200px';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            navLinks.style.borderRadius = '0 0 0 10px';
            
            navLinks.querySelectorAll('li').forEach(li => {
                li.style.margin = '10px 0';
            });
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
            }
        });
    });
}

// إعداد سلة التسوق
function setupCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const clearCartBtn = document.getElementById('clearCart');
    
    // فتح السلة
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('open');
        displayCartItems();
    });
    
    // إغلاق السلة
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });
    
    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target) && cartSidebar.classList.contains('open')) {
            cartSidebar.classList.remove('open');
        }
    });
    
    // إفراغ السلة
    clearCartBtn.addEventListener('click', clearCart);
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث الوقت كل ثانية
    updateTime();
    setInterval(updateTime, 1000);
    
    // عرض جميع المنتجات
    displayProducts();
    
    // تحديث عداد السلة
    updateCartCount();
    
    // إعداد المرشحات
    setupFilters();
    
    // إعداد القائمة المتحركة
    setupMobileMenu();
    
    // إعداد سلة التسوق
    setupCart();
    
    // تحديث تصميم القائمة عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.width = 'auto';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            
            navLinks.querySelectorAll('li').forEach(li => {
                li.style.margin = '0 0 0 25px';
            });
        } else {
            navLinks.style.display = 'none';
        }
    });

});

