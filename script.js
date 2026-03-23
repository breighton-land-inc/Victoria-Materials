function toggleMenu() {
    const nav = document.getElementById("sideNav");
    const burger = document.querySelector(".burger-menu");

    nav.classList.toggle("active");
    if (burger) burger.classList.toggle("open");

    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const nav = document.getElementById("sideNav");
            const burger = document.querySelector(".burger-menu");

            nav.classList.remove("active");
            if (burger) burger.classList.remove("open");
            document.body.style.overflow = "auto";

            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener("scroll", () => {
    const topBtn = document.getElementById("backToTop");
    if (window.pageYOffset > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".desktop-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.top = scrollTop > lastScrollTop ? "-80px" : "0";
    lastScrollTop = scrollTop;
});

function showToast(fileName) {
    const toast = document.getElementById('download-toast');
    const fileNameSpan = document.getElementById('file-name');
    if (toast && fileNameSpan) {
        fileNameSpan.textContent = fileName;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}
function downloadFile(filePath) {
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(filePath.split('/').pop());
}

function viewFile(filePath) {
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('fileViewer');
    viewer.src = filePath;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('fileModal');
    const viewer = document.getElementById('fileViewer');
    viewer.src = '';
    modal.style.display = 'none';
}
let currentSlide = 0;
let activeSlidesContainer = null;

function openGallery(model) {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'flex';

    const alizaSlides = document.getElementById('alizaSlides');
    const samanthaSlides = document.getElementById('samanthaSlides');

    alizaSlides.style.display = 'none';
    samanthaSlides.style.display = 'none';

    if (model === 'aliza') {
        alizaSlides.style.display = 'flex';
        activeSlidesContainer = alizaSlides;
    } else if (model === 'samantha') {
        samanthaSlides.style.display = 'flex';
        activeSlidesContainer = samanthaSlides;
    }

    currentSlide = 0;
    updateSlider();
    updateSliderDots();
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
}

function updateSlider() {
    if (!activeSlidesContainer) return;

    const slides = activeSlidesContainer.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    const dots = document.querySelectorAll('#sliderDots span');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
}

function nextSlide() {
    if (!activeSlidesContainer) return;
    const slides = activeSlidesContainer.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    if (!activeSlidesContainer) return;
    const slides = activeSlidesContainer.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSliderDots() {
    if (!activeSlidesContainer) return;
    const slides = activeSlidesContainer.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    dotsContainer.innerHTML = '';

    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.onclick = () => goToSlide(idx);
        if (idx === currentSlide) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}
let startX = 0;
let endX = 0;

const sliderWrapper = document.getElementById('sliderWrapper');

if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, false);

    sliderWrapper.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, false);

    sliderWrapper.addEventListener('touchend', () => {
        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            prevSlide();
        }
        startX = 0;
        endX = 0;
    }, false);
}
let startY = 0;

const modal = document.getElementById('galleryModal');

if (modal) {
    modal.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    modal.addEventListener('touchend', (e) => {
        let endY = e.changedTouches[0].clientY;

        if (endY - startY > 100) {
            closeGallery(); // swipe down
        }
    });
}
const bottomLinks = document.querySelectorAll(".bottom-nav a");

window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const top = window.scrollY;
        if (top >= section.offsetTop - 200) {
            current = section.getAttribute("id");
        }
    });

    bottomLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
if (window.innerWidth <= 768) {
    let startY = 0;
    const modal = document.getElementById('galleryModal');

    if (modal) {
        modal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        modal.addEventListener('touchend', (e) => {
            let endY = e.changedTouches[0].clientY;

            if (endY - startY > 100) {
                closeGallery();
            }
        });
    }
}