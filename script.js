/**
 * FÉMININ SANTÉ - JavaScript Interactif
 * Animations et interactions optimisées
 * Performance & Accessibilité 2026
 */

// Attente du chargement complet du DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // ANIMATIONS AU SCROLL
    // ===================================
    
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Création de l'observateur
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajout de la classe d'animation
                entry.target.classList.add('animate-visible');
                
                // Animation différée pour effet cascade
                if (entry.target.classList.contains('expertise-card') || 
                    entry.target.classList.contains('category-card') ||
                    entry.target.classList.contains('badge')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Arrêt de l'observation une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observation des éléments à animer
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .category-card, .badge, .hero-text, .hero-image'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===================================
    // NAVIGATION STICKY INTELLIGENTE
    // ===================================
    
    const nav = document.querySelector('.main-nav');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            nav.style.background = 'var(--bg-white)';
            nav.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
    
    // ===================================
    // EFFET PARALLAX SUBTIL SUR HERO
    // ===================================
    
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < 600) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }
    
    // ===================================
    // ANIMATION DES LIENS AU SURVOL
    // ===================================
    
    const links = document.querySelectorAll('a[data-animate]');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===================================
    // LAZY LOADING OPTIMISÉ DES IMAGES
    // ===================================
    
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    } else {
        // Fallback pour anciens navigateurs
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ===================================
    // GESTION DU CLAVIER (ACCESSIBILITÉ)
    // ===================================
    
    document.addEventListener('keydown', (e) => {
        // Navigation au clavier améliorée
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // ===================================
    // PERFORMANCE : DEBOUNCE SUR RESIZE
    // ===================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Gestion du redimensionnement de fenêtre
    const handleResize = debounce(() => {
        // Réinitialisation des animations si nécessaire
        animatedElements.forEach(el => {
            el.classList.remove('animate-visible');
            observer.observe(el);
        });
    }, 250);
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // ===================================
    // ANALYTICS SIMPLE (Optionnel)
    // ===================================
    
    // Tracking des clics sur les liens externes
    const externalLinks = document.querySelectorAll('a[href^="https://femininsante.com"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Données pour analytics
            const linkData = {
                url: this.href,
                text: this.textContent.trim(),
                category: this.closest('.category-card') ? 'category' : 
                         this.closest('.expertise-card') ? 'expertise' : 'general',
                timestamp: new Date().toISOString()
            };
            
            // Envoi des données (à adapter selon votre solution analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'backlink_github',
                    'event_label': linkData.url,
                    'value': linkData.category
                });
            }
            
            console.log('Link clicked:', linkData);
        });
    });
    
    // ===================================
    // PRELOADING STRATÉGIQUE
    // ===================================
    
    // Préchargement des pages importantes au survol
    const importantLinks = document.querySelectorAll('.btn-primary, .btn-large');
    
    importantLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !this.dataset.prefetched) {
                const linkTag = document.createElement('link');
                linkTag.rel = 'prefetch';
                linkTag.href = href;
                document.head.appendChild(linkTag);
                this.dataset.prefetched = 'true';
            }
        }, { once: true });
    });
    
    // ===================================
    // MESSAGE DE BIENVENUE (Optionnel)
    // ===================================
    
    // Affichage d'un message personnalisé pour les nouveaux visiteurs
    const hasVisited = sessionStorage.getItem('femininSanteVisited');
    
    if (!hasVisited) {
        setTimeout(() => {
            console.log('%c🌸 Bienvenue sur Féminin Santé !', 
                'color: #4a6741; font-size: 16px; font-weight: bold;');
            console.log('%cVotre magazine expert en santé féminine et bien-être naturel', 
                'color: #6b7b6c; font-size: 12px;');
        }, 1000);
        
        sessionStorage.setItem('femininSanteVisited', 'true');
    }
    
    // ===================================
    // OPTIMISATION CORE WEB VITALS
    // ===================================
    
    // Détection de la première peinture de contenu (LCP)
    if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            
            // Marquer le chargement comme optimisé
            document.documentElement.classList.add('lcp-optimized');
        });
        
        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Fallback si non supporté
        }
    }
    
    // ===================================
    // GESTION DES ERREURS
    // ===================================
    
    window.addEventListener('error', (e) => {
        console.error('Error on Feminin Sante GitHub page:', e.error);
        // Ici vous pouvez ajouter un système de reporting d'erreurs
    });
    
    // ===================================
    // INITIALISATION COMPLÉTÉE
    // ===================================
    
    console.log('%c✅ Page Féminin Santé chargée avec succès', 
        'color: #4a6741; font-size: 14px; font-weight: bold;');
    console.log('%c🔗 Backlink GitHub optimisé SEO 2026', 
        'color: #d4a373; font-size: 12px;');
    
});

// ===================================
// FONCTIONS UTILITAIRES GLOBALES
// ===================================

/**
 * Fonction pour smooth scroll vers une section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Fonction pour copier l'URL du site
 */
function copySiteUrl() {
    const url = 'https://femininsante.com/';
    navigator.clipboard.writeText(url).then(() => {
        alert('URL copiée dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

// Export des fonctions pour usage global
window.FemininSanteUtils = {
    scrollToSection,
    copySiteUrl
};