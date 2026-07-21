/* ==========================================================================
   PERSONAL PORTFOLIO CLIENT INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Custom Preloader Fade-out ---
  const preloader = document.getElementById('preloader');
  const body = document.body;

  let preloaderHidden = false;

  function hidePreloader() {
    if (preloaderHidden) return;
    preloaderHidden = true;
    
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
    if (body) {
      body.style.overflow = 'auto'; // Re-enable scroll
    }
  }

  // Check state and bind load listener
  if (document.readyState === 'complete') {
    // Delay slightly for premium aesthetics
    setTimeout(hidePreloader, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 400);
    });
  }

  // Safety Timeout: Dismiss preloader after 2.5s regardless of window load status
  setTimeout(hidePreloader, 2500);

  // --- 2. Scroll Progress Bar & Back-to-Top Button ---
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollProgress) {
      if (totalScroll > 0) {
        const percentage = (window.pageYOffset / totalScroll) * 100;
        scrollProgress.style.width = percentage + '%';
      } else {
        scrollProgress.style.width = '0%';
      }
    }

    // Toggle Back to Top Visibility
    if (backToTopBtn) {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // Smooth scroll back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. Mobile Navigation Menu Toggle ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when a nav link is clicked
  if (navLinks && hamburgerBtn && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 4. Typewriter Animation ---
  const typewriterText = document.getElementById('typewriter');
  const words = ["Computer Science Student"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting text
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      // Writing text
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Write at standard pace
    }

    // Determine state changes
    if (!isDeleting && charIndex === currentWord.length) {
      if (words.length > 1) {
        // Pause at full word
        typingSpeed = 2000;
        isDeleting = true;
      } else {
        // Single word mode: keep word displayed and stop typing loop
        return;
      }
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Brief pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  // Init typewriter if element exists
  if (typewriterText) {
    setTimeout(type, 1000);
  }

  // --- 5. Intersection Observer Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });

  // --- 6. Scroll-Spy Navigation (Active Nav Item Highlights) ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Scroll spy checks offset margins for active matches
      if (window.pageYOffset >= (sectionTop - 150)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  // --- 7. Statistics Numeric Counters (Scroll Triggered) ---
  const statsElements = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function runCounters() {
    statsElements.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // Counter total time in ms
      const stepTime = Math.max(Math.floor(duration / target), 15);
      let count = 0;
      
      const timer = setInterval(() => {
        count += Math.ceil(target / (duration / stepTime));
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = count;
        }
      }, stepTime);
    });
  }

  // Separate observer for about stats segment
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !countersStarted) {
        runCounters();
        countersStarted = true;
      }
    }, {
      threshold: 0.3
    });
    
    statsObserver.observe(statsSection);
  }

  // Trigger progress bars fill width on scroll
  const progressFills = document.querySelectorAll('.progress-fill');
  const skillsSection = document.querySelector('.skills-grid');
  let skillsTriggered = false;

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !skillsTriggered) {
        progressFills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width');
        });
        skillsTriggered = true;
      }
    }, {
      threshold: 0.15
    });
    
    skillsObserver.observe(skillsSection);
  }

  // --- 8. Button Ripple Click Effect ---
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // --- 9. Contact Form Client-side Validation ---
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;

      // Extract form controls
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMessage');

      // Validation Helper functions
      function validateField(input, errorElementId) {
        const parent = input.parentElement;
        if (!input.value.trim()) {
          parent.classList.add('invalid');
          isFormValid = false;
        } else {
          parent.classList.remove('invalid');
        }
      }

      function validateEmail(emailInput) {
        const parent = emailInput.parentElement;
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailVal || !emailRegex.test(emailVal)) {
          parent.classList.add('invalid');
          isFormValid = false;
        } else {
          parent.classList.remove('invalid');
        }
      }

      // Run validation checks
      validateField(nameInput, 'nameError');
      validateEmail(emailInput);
      validateField(subjectInput, 'subjectError');
      validateField(messageInput, 'messageError');

      if (isFormValid) {
        // Collect form message data
        const newMsg = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        // Mock API submission trigger
        const submitBtn = document.getElementById('btnSubmitForm');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';

        setTimeout(() => {
          // Save message to localStorage inbox
          const stored = getStoredMessages();
          stored.unshift(newMsg);
          saveMessages(stored);
          renderMessages();

          // Success Response
          contactForm.reset();
          successAlert.classList.remove('hide');
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

          // Hide success alert after 5 seconds
          setTimeout(() => {
            successAlert.classList.add('hide');
          }, 5000);
        }, 1200);
      }
    });
    
    // Live validation listener on blur
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.getAttribute('type') === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!input.value.trim() || !emailRegex.test(input.value.trim())) {
            input.parentElement.classList.add('invalid');
          } else {
            input.parentElement.classList.remove('invalid');
          }
        } else {
          if (!input.value.trim()) {
            input.parentElement.classList.add('invalid');
          } else {
            input.parentElement.classList.remove('invalid');
          }
        }
      });
      
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('invalid');
      });
    });
  }

  // --- 10. Received Messages Storage & Display ---
  const messagesList = document.getElementById('messagesList');
  const messageCount = document.getElementById('messageCount');
  const btnClearAllMessages = document.getElementById('btnClearAllMessages');

  function getStoredMessages() {
    try {
      const saved = localStorage.getItem('portfolio_contact_messages');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Initial default message if no storage exists yet
      const initialMsgs = [
        {
          name: "KL University Recruitment Team",
          email: "recruitment@klu.edu.in",
          subject: "Software Engineering Opportunity Inquiry",
          message: "Hello Nohitha! We reviewed your portfolio and project credentials. We would love to discuss software engineering opportunities with you.",
          timestamp: "Jul 21, 2026, 09:30 AM"
        }
      ];
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(initialMsgs));
      return initialMsgs;
    } catch (e) {
      return [];
    }
  }

  function saveMessages(messages) {
    try {
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(messages));
    } catch (e) {}
  }

  function escapeHTML(str) {
    return String(str || '').replace(/[&<>"']/g, match => {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[match];
    });
  }

  function renderMessages() {
    if (!messagesList) return;
    const messages = getStoredMessages();
    if (messageCount) messageCount.textContent = messages.length;

    if (messages.length === 0) {
      if (btnClearAllMessages) btnClearAllMessages.classList.add('hide');
      messagesList.innerHTML = `
        <div class="messages-empty-state">
          <i class="fa-solid fa-envelope-open-text"></i>
          <h4>No Messages Received Yet</h4>
          <p>Fill out the contact form above and send a message from any email. Your message will appear right here!</p>
        </div>
      `;
      return;
    }

    if (btnClearAllMessages) btnClearAllMessages.classList.remove('hide');

    messagesList.innerHTML = messages.map((msg, index) => `
      <div class="message-card">
        <div class="message-card-header">
          <div class="message-sender-info">
            <div class="avatar-circle"><i class="fa-solid fa-user"></i></div>
            <div>
              <h4 class="sender-name">${escapeHTML(msg.name)}</h4>
              <a href="mailto:${escapeHTML(msg.email)}" class="sender-email"><i class="fa-solid fa-envelope"></i> ${escapeHTML(msg.email)}</a>
            </div>
          </div>
          <div class="message-time-badge">
            <i class="fa-solid fa-clock"></i> ${escapeHTML(msg.timestamp)}
          </div>
        </div>
        <div class="message-card-body">
          <h5 class="message-subject"><i class="fa-solid fa-tag"></i> ${escapeHTML(msg.subject)}</h5>
          <p class="message-text">${escapeHTML(msg.message)}</p>
        </div>
        <div class="message-card-footer">
          <button class="btn-delete-msg" onclick="deleteSingleMessage(${index})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </div>
    `).join('');
  }

  window.deleteSingleMessage = function(index) {
    const messages = getStoredMessages();
    messages.splice(index, 1);
    saveMessages(messages);
    renderMessages();
  };

  if (btnClearAllMessages) {
    btnClearAllMessages.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all received messages?')) {
        saveMessages([]);
        renderMessages();
      }
    });
  }

  // Initial render on load
  renderMessages();
});
