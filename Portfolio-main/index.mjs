// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Handle project navigation
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.myBtn');
    
    buttons.forEach(button => {
      const modalId = button.getAttribute('data-modal');
      let projectPath;
      
      // Set project paths based on modal ID
      switch(modalId) {
        case 'modal4':
          projectPath = '/projects/bunchies.html';
          break;
        case 'modal1':
          projectPath = '/projects/intarch.html';
          break;
        case 'modal2':
          projectPath = '/projects/rainydays.html';
          break;
        case 'modal3':
          projectPath = '/projects/csm.html';
          break;
        default:
          projectPath = '#';
      }
      
      // Replace button with anchor tag
      const anchor = document.createElement('a');
      anchor.href = projectPath;
      anchor.className = 'myBtn';
      anchor.textContent = 'Read more';
      button.parentNode.replaceChild(anchor, button);
    });

    // Initialize text animation if animation container exists
    initTextAnimation();
});

// Function to initialize the text animation
function initTextAnimation() {
    const animationContainer = document.querySelector('.animation-container');
    if (!animationContainer) return; // Exit if container doesn't exist

    // Create animation elements
    const textAnimation = document.createElement('div');
    textAnimation.className = 'text-animation';
    
    const firstText = document.createElement('span');
    firstText.className = 'text first-text';
    firstText.textContent = "I'm a ";
    
    const secondText = document.createElement('span');
    secondText.className = 'text second-text';
    
    // Add skills/roles
    const skills = ['UX Designer', 'UI Developer', 'Web Creator', 'Digital Artist'];
    skills.forEach(skill => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.textContent = skill;
        secondText.appendChild(wordSpan);
    });
    
    // Assemble the animation
    textAnimation.appendChild(firstText);
    textAnimation.appendChild(secondText);
    animationContainer.appendChild(textAnimation);
    
    // Adjust the height of the container
    setTimeout(() => {
        const words = document.querySelectorAll('.word');
        let maxHeight = 0;
        
        words.forEach(word => {
            const height = word.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        if (maxHeight > 0) {
            secondText.style.height = `${maxHeight}px`;
        }
    }, 100);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const zoomButtons = document.querySelectorAll('.zoom-btn');

    // Open modal when zoom button is clicked
    zoomButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const imgContainer = button.closest('.image-container');
            const img = imgContainer.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
            // Add animation class
            modalImg.classList.add('modal-zoom-in');
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Function to close modal
    function closeModal() {
        modalImg.classList.remove('modal-zoom-in');
        modalImg.classList.add('modal-zoom-out');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalImg.classList.remove('modal-zoom-out');
        }, 300);
    }
});

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // Add animation to project overview items
    const overviewItems = document.querySelectorAll('.overview-item');
    overviewItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('slide-up');
    });
});

// Color swatch hover effect
const colorSwatches = document.querySelectorAll('.color-swatch');
colorSwatches.forEach(swatch => {
    const colorValue = swatch.querySelector('span');
    
    swatch.addEventListener('mouseenter', () => {
        colorValue.style.opacity = '1';
    });
    
    swatch.addEventListener('mouseleave', () => {
        colorValue.style.opacity = '0.7';
    });
});

// Add copy to clipboard functionality for color values
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        const colorValue = swatch.querySelector('span').textContent;
        navigator.clipboard.writeText(colorValue).then(() => {
            // Show feedback
            const feedback = document.createElement('div');
            feedback.className = 'copy-feedback';
            feedback.textContent = 'Color copied!';
            swatch.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        });
    });
});

// Add the following CSS classes to stylesheet for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-up {
        animation: slideUp 0.6s ease-out forwards;
        opacity: 0;
    }

    .modal-zoom-in {
        animation: zoomIn 0.3s ease-out forwards;
    }

    .modal-zoom-out {
        animation: zoomOut 0.3s ease-out forwards;
    }

    .copy-feedback {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        animation: fadeInOut 2s ease-in-out;
    }

    /* Text Animation Styles */
    .animation-container {
        height: 150px;
        display: flex;
        background-color: #FFFFFF;
        align-items: center;
        justify-content: center;
        margin: 5rem 0;
    }

    .text-animation {
        position: relative;
        display: inline-flex;
    }

    .text-animation .text {
        position: relative;
        color: var(--primary-color, #333);
        font-size: 2.5rem;
        font-weight: 600;
    }

    .text-animation .second-text {
        color: var(--accent-color, #7180b9);
        position: relative;
    }

    .text-animation .second-text .word {
        position: absolute;
        opacity: 0;
        overflow: hidden;
        transform: translateY(10px);
        animation: cycleWords 8s ease-in-out infinite;
    }

    .text-animation .second-text .word:nth-child(1) {
        animation-delay: 0s;
    }

    .text-animation .second-text .word:nth-child(2) {
        animation-delay: 2s;
    }

    .text-animation .second-text .word:nth-child(3) {
        animation-delay: 4s;
    }

    .text-animation .second-text .word:nth-child(4) {
        animation-delay: 6s;
    }

    .text-animation::after {
        content: "";
        position: absolute;
        right: -4px;
        top: 50%;
        transform: translateY(-45%);
        height: 30px;
        width: 2px;
        background-color: var(--accent-color, #7180b9);
        animation: blink 0.7s infinite;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes zoomIn {
        from {
            transform: scale(0.95);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes zoomOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.95);
            opacity: 0;
        }
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, 10px); }
        10% { opacity: 1; transform: translate(-50%, 0); }
        90% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -10px); }
    }

    @keyframes cycleWords {
        0%, 5% {
            transform: translateY(10px);
            opacity: 0;
        }
        10%, 20% {
            transform: translateY(0);
            opacity: 1;
        }
        25%, 30% {
            transform: translateY(0);
            opacity: 1;
        }
        35%, 40% {
            transform: translateY(-10px);
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
`;

document.head.appendChild(styleSheet);