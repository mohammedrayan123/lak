/**
 * Secret Garden Scrapbook — Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // --- 3. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 4. Spring Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /*
    // --- 5. Admission Enquiry Popup Logic ---
    const popupHtml = `
        <!-- Floating Trigger -->
        <button class="enquiry-trigger" id="enquiryTrigger" aria-label="Open admission enquiry form">
            <span>🌸</span> Enquire Now
        </button>

        <!-- Modal Wrapper -->
        <div class="enquiry-modal" id="enquiryModal">
            <div class="enquiry-card">
                <button class="enquiry-close" id="enquiryClose" aria-label="Close modal">&times;</button>
                <div class="enquiry-card-inner">
                    <!-- Form State -->
                    <div id="enquiryFormContainer">
                        <div class="enquiry-header">
                            <h2>Admission Enquiry</h2>
                            <p>Let's start your child's magical journey! ✨</p>
                        </div>
                        <form class="enquiry-form" id="enquiryForm" autocomplete="off">
                            <div class="enquiry-form-group">
                                <label for="parentName">Parent's Name *</label>
                                <input type="text" id="parentName" required placeholder="Your full name">
                            </div>
                            <div class="enquiry-form-group">
                                <label for="contactNumber">Contact Number *</label>
                                <input type="tel" id="contactNumber" required placeholder="10-digit mobile number" pattern="[0-9]{10}">
                            </div>
                            <div class="enquiry-form-group">
                                <label for="childName">Child's Name *</label>
                                <input type="text" id="childName" required placeholder="Child's full name">
                            </div>
                            <div class="enquiry-form-group">
                                <label for="childAge">Child's Age (years) *</label>
                                <input type="number" id="childAge" required placeholder="e.g. 3" min="1" max="8">
                            </div>
                            <div class="enquiry-form-group full-width">
                                <label for="programInterest">Program of Interest *</label>
                                <select id="programInterest" required>
                                    <option value="" disabled selected>Select a program</option>
                                    <option value="Playgroup">Playgroup (2 - 2.5 yrs)</option>
                                    <option value="Nursery">Nursery (2.5 - 3.5 yrs)</option>
                                    <option value="Junior KG">Junior KG (3.5 - 4.5 yrs)</option>
                                    <option value="Senior KG">Senior KG (4.5 - 5.5 yrs)</option>
                                </select>
                            </div>
                            <div class="enquiry-form-group full-width">
                                <label for="parentMessage">Message / Questions</label>
                                <textarea id="parentMessage" placeholder="Any specific details you would like to share or ask?"></textarea>
                            </div>
                            <button type="submit" class="enquiry-submit-btn">Send Enquiry ✨</button>
                        </form>
                    </div>

                    <!-- Success State -->
                    <div class="enquiry-success" id="enquirySuccessContainer">
                        <div class="enquiry-success-icon">🎨</div>
                        <h3>Thank You!</h3>
                        <p>We have received your enquiry. Our team will reach out to you shortly to guide you forward! 🌸</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append to body
    const div = document.createElement('div');
    div.innerHTML = popupHtml;
    document.body.appendChild(div);

    // Dom elements
    const trigger = document.getElementById('enquiryTrigger');
    const modal = document.getElementById('enquiryModal');
    const closeBtn = document.getElementById('enquiryClose');
    const form = document.getElementById('enquiryForm');
    const formContainer = document.getElementById('enquiryFormContainer');
    const successContainer = document.getElementById('enquirySuccessContainer');

    // Show modal
    trigger.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form and success state after animation completes
        setTimeout(() => {
            form.reset();
            formContainer.style.display = 'block';
            successContainer.classList.remove('active');
        }, 400);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Submit form handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form field data
        const data = {
            parentName: document.getElementById('parentName').value,
            contactNumber: document.getElementById('contactNumber').value,
            childName: document.getElementById('childName').value,
            childAge: document.getElementById('childAge').value,
            programInterest: document.getElementById('programInterest').value,
            message: document.getElementById('parentMessage').value,
            timestamp: new Date().toISOString()
        };

        // For demonstration/persistence, save locally
        const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
        enquiries.push(data);
        localStorage.setItem('enquiries', JSON.stringify(enquiries));

        // Display Success State
        formContainer.style.display = 'none';
        successContainer.classList.add('active');

        // Automatically close popup after 4 seconds
        setTimeout(() => {
            if (modal.classList.contains('active')) {
                closeModal();
            }
        }, 4000);
    });
    */

});
