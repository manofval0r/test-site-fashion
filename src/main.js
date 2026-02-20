import "./style.css";

// Custom Cursor
const cursor = document.getElementById("custom-cursor");
const cursorStyle = {
  position: "fixed",
  width: "10px",
  height: "10px",
  backgroundColor: "var(--color-gold)",
  borderRadius: "50%",
  pointerEvents: "none",
  zIndex: "9999",
  transition: "transform 0.1s ease-out, width 0.3s ease, height 0.3s ease",
  transform: "translate(-50%, -50%)",
  mixBlendMode: "difference",
};

Object.assign(cursor.style, cursorStyle);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Hover effect for cursor
const hoverElements = document.querySelectorAll("a, button, .product-card");
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.backgroundColor = "transparent";
    cursor.style.border = "1px solid var(--color-gold)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
    cursor.style.backgroundColor = "var(--color-gold)";
    cursor.style.border = "none";
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth Scroll for Nav Links
document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Product Data
const products = {
  sovereign: {
    title: "The Sovereign Hoodie",
    price: "£120.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    description: "Crafted from 500GSM heavy cotton, featuring gold-threaded embroidery of the DAVES crest. A staple for the modern monarch."
  },
  imperial: {
    title: "Imperial Oxford Shirt",
    price: "£85.00",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=800",
    description: "Premium Italian silk-cotton blend. Tailored fit with mother-of-pearl buttons and a subtle monarch collar."
  },
  heirloom: {
    title: "Heirloom Selvedge Denim",
    price: "£150.00",
    image: "https://images.unsplash.com/photo-1624371414361-e6e8ea7c55d2?auto=format&fit=crop&q=80&w=800",
    description: "Raw Japanese selvedge denim. Reinforced with gold-tone rivets and a signature royal blue inseam."
  }
};

// Modal Logic
const modal = document.getElementById('product-modal');
const modalClose = document.querySelector('.modal-close');
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productId = card.getAttribute('data-product');
    const data = products[productId];
    
    if (data) {
      document.getElementById('modal-image').src = data.image;
      document.getElementById('modal-title').innerText = data.title;
      document.getElementById('modal-price').innerText = data.price;
      document.getElementById('modal-description').innerText = data.description;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Lookbook Drag Scroll
const lookbook = document.querySelector('.lookbook-scroll');
let isDown = false;
let startX;
let scrollLeft;

lookbook.addEventListener('mousedown', (e) => {
  isDown = true;
  lookbook.classList.add('active');
  startX = e.pageX - lookbook.offsetLeft;
  scrollLeft = lookbook.scrollLeft;
});

lookbook.addEventListener('mouseleave', () => {
  isDown = false;
});

lookbook.addEventListener('mouseup', () => {
  isDown = false;
});

lookbook.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - lookbook.offsetLeft;
  const walk = (x - startX) * 2; // Scroll speed
  lookbook.scrollLeft = scrollLeft - walk;
});

// Size Selector Logic
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelector('.active').classList.remove('active');
        this.classList.add('active');
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".product-card, .heritage-text, .heritage-image")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
    observer.observe(el);
  });

// Adding revealed class styles dynamically via JS for simplicity or I could add to CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);
