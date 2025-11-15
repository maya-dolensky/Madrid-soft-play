// Detectar basePath para GitHub Pages
const getBasePath = () => {
  // Si estamos en GitHub Pages con subdirectorio, detectarlo automáticamente
  const path = window.location.pathname;
  // Si la ruta contiene el nombre del repositorio, usarlo como basePath
  const match = path.match(/^\/([^\/]+)\//);
  if (match && match[1] !== '') {
    // Verificar que no sea solo '/' o una ruta de archivo
    const repoName = match[1];
    // Excluir rutas comunes que no son repositorios
    if (!['index.html', 'styles.css', 'script.js', 'public'].includes(repoName)) {
      return `/${repoName}`;
    }
  }
  return '';
};

const BASE_PATH = getBasePath();

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
}

// Smooth scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Accordion functionality
function toggleAccordion(button) {
  const item = button.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const isOpen = content.classList.contains('open');
  
  // Close all accordions
  document.querySelectorAll('.accordion-content').forEach(acc => {
    acc.classList.remove('open');
  });
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Open clicked accordion if it was closed
  if (!isOpen) {
    content.classList.add('open');
    button.classList.add('active');
  }
}

// Form submission handler
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = document.getElementById('submit-btn');
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const formElement = document.getElementById('contact-form');
  
  // Hide previous messages
  formError.classList.add('hidden');
  formSuccess.classList.add('hidden');
  
  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    date: formData.get('date'),
    neighborhood: formData.get('neighborhood'),
    age: formData.get('age'),
    pack: formData.get('pack'),
    message: formData.get('message')
  };
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  
  try {
    // URL del Google Apps Script Web App
    // Obtén la URL siguiendo las instrucciones en GOOGLE-SHEETS-SETUP.md
    const API_URL = 'https://script.google.com/macros/s/TU-URL-AQUI/exec'; // ← Reemplaza con tu URL de Google Apps Script
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    // Verificar el Content-Type de la respuesta
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Response is not JSON:', text.substring(0, 200));
      throw new Error('El servidor devolvió una respuesta inesperada. Por favor, verifica la configuración.');
    }
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Error al enviar el formulario');
    }
    
    // Show success message
    formElement.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.add('hidden');
      formElement.classList.remove('hidden');
    }, 5000);
    
  } catch (error) {
    // Show error message
    formError.textContent = error.message || 'No se pudo enviar el formulario. Por favor, inténtalo de nuevo.';
    formError.classList.remove('hidden');
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Solicitar Información';
  }
}

// Alternative: Use mailto if Formspree is not configured
function handleFormSubmitMailto(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const subject = encodeURIComponent('Solicitud de información - Madrid Soft Play');
  const body = encodeURIComponent(`
Nombre: ${formData.get('name')}
Email: ${formData.get('email')}
Fecha del evento: ${formData.get('date')}
Barrio: ${formData.get('neighborhood')}
Edad del peque: ${formData.get('age')}
Pack: ${formData.get('pack')}
Mensaje: ${formData.get('message') || 'N/A'}
  `);
  
  window.location.href = `mailto:tu-email@ejemplo.com?subject=${subject}&body=${body}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    }
  });
});

