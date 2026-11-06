/**
 * PlumbingCareHub - Production Vanilla JS Interactive Script
 * Clean Light Theme, Fully Accessible, Blazing Fast
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });

        if (mobileMenuCloseBtn) {
            mobileMenuCloseBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        }

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // 2. Sticky Navbar Shadow Effect on Scroll
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header?.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            header?.classList.remove('bg-white');
        } else {
            header?.classList.remove('shadow-md');
            header?.classList.add('bg-white');
        }
    });

    // 3. Hero Background Image Slider (3-Second Fade In/Out)
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let sliderTimer = null;

    function showSlide(index) {
        if (!heroSlides.length) return;
        
        heroSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('opacity-0', 'pointer-events-none');
                slide.classList.add('opacity-100');
            } else {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        heroDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-white/40', 'w-3');
                dot.classList.add('bg-red-600', 'w-8');
            } else {
                dot.classList.remove('bg-red-600', 'w-8');
                dot.classList.add('bg-white/40', 'w-3');
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        if (!heroSlides.length) return;
        const next = (currentSlide + 1) % heroSlides.length;
        showSlide(next);
    }

    function startSlider() {
        if (sliderTimer) clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, 3000); // 3 seconds fade transition
    }

    if (heroSlides.length > 0) {
        showSlide(0);
        startSlider();

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startSlider();
            });
        });

        // Pause auto-sliding on hover
        const heroSection = document.getElementById('heroSliderSection');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(sliderTimer));
            heroSection.addEventListener('mouseleave', () => startSlider());
        }
    }

    // 4. Modal Functionality (Emergency Request / Get Quote)
    const modal = document.getElementById('bookingModal');
    const openModalButtons = document.querySelectorAll('[data-open-modal]');
    const closeModalButtons = document.querySelectorAll('[data-close-modal]');

    function openModal(serviceType = '') {
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        
        if (serviceType) {
            const select = modal.querySelector('#modalServiceSelect');
            if (select) select.value = serviceType;
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service') || '';
            openModal(service);
        });
    });

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on background click or ESC
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // 5. Interactive FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');

                // Close other faqs
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                });

                if (!isOpen) {
                    content.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // 6. Emergency Diagnostic Triage Selector (Clean Light Theme)
    const triageData = {
        'burst-pipe': {
            title: 'Burst Pipe & Active Gushing Water',
            urgency: 'CRITICAL EMERGENCY (30-Min Dispatch)',
            immediateSteps: [
                'Locate and shut off your property\'s MAIN WATER SHUTOFF VALVE immediately.',
                'Turn on lowest faucets (garden hose or basement sink) to drain remaining water safely.',
                'Switch off electrical circuit breakers for wet rooms to eliminate electrocution risk.',
                'Move valuables and take quick photos of damage for insurance claims.'
            ],
            phoneNotice: 'Master technician is on standby for emergency pipe clamp & replacement.'
        },
        'sewer-backup': {
            title: 'Sewer Line Backup & Overflowing Drain',
            urgency: 'BIOHAZARD EMERGENCY (Same-Day Rapid Dispatch)',
            immediateSteps: [
                'Immediately cease running all toilets, showers, washing machines, and dishwashers.',
                'Keep family and pets completely away from contaminated wastewater areas.',
                'Open windows for air circulation without walking through flooded water.',
                'Do not attempt to flush again—each flush forces contaminated water higher.'
            ],
            phoneNotice: 'Equipped with industrial hydro-jetting and high-resolution sewer cameras.'
        },
        'water-heater': {
            title: 'Water Heater Ruptured or Completely Cold',
            urgency: 'HIGH PRIORITY (Fast Response)',
            immediateSteps: [
                'Shut off the cold water supply valve located on top of the water heater tank.',
                'Turn off power at the electrical circuit breaker or set gas dial to "OFF" or "PILOT".',
                'Place buckets or towels to protect flooring from active tank base leaks.',
                'Avoid contact with scalding hot water or steam vents.'
            ],
            phoneNotice: 'Stocked trucks ready for tank & tankless repair or immediate same-day replacement.'
        },
        'clogged-drain': {
            title: 'Severe Clogged Drain & Standing Water',
            urgency: 'PRIORITY SERVICE (Same-Day Service)',
            immediateSteps: [
                'Do not pour harsh store-bought chemical drain cleaners (they corrode pipes & create toxic splash hazards).',
                'Try gentle manual plunging if it is a single isolated sink or toilet.',
                'If multiple fixtures are gurgling or overflowing simultaneously, shut off main water.',
                'Clear floor space around the fixture for fast plumber access.'
            ],
            phoneNotice: 'Heavy-duty motorized augering and drain snaking with zero pipe damage.'
        }
    };

    const triageButtons = document.querySelectorAll('.triage-tab-btn');
    const triageDisplay = document.getElementById('triageDisplay');

    if (triageButtons.length && triageDisplay) {
        triageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const key = button.getAttribute('data-triage');
                const data = triageData[key];
                if (!data) return;

                // Active style (Clean Light Theme)
                triageButtons.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
                    b.classList.add('bg-white', 'text-slate-800', 'border-slate-200');
                    const subtitle = b.querySelector('.triage-sub');
                    if (subtitle) {
                        subtitle.classList.remove('text-blue-100');
                        subtitle.classList.add('text-slate-500');
                    }
                });

                button.classList.add('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
                button.classList.remove('bg-white', 'text-slate-800', 'border-slate-200');
                const activeSubtitle = button.querySelector('.triage-sub');
                if (activeSubtitle) {
                    activeSubtitle.classList.add('text-blue-100');
                    activeSubtitle.classList.remove('text-slate-500');
                }

                // Render content in clean light theme
                triageDisplay.innerHTML = `
                    <div class="animate-fadeIn">
                        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-5">
                            <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span class="flex h-3 w-3 relative">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                </span>
                                ${data.title}
                            </h3>
                            <span class="text-xs font-bold px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full tracking-wide">
                                ${data.urgency}
                            </span>
                        </div>
                        <p class="text-sm text-amber-800 font-semibold mb-3 flex items-center gap-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            Immediate Safety Action Plan Before Plumber Arrives:
                        </p>
                        <ul class="space-y-3 text-sm text-slate-700 mb-6">
                            ${data.immediateSteps.map(step => `
                                <li class="flex items-start gap-2.5">
                                    <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="text-xs text-slate-700">
                                <span class="font-bold text-slate-900 block">${data.phoneNotice}</span>
                                <span>No overtime fees. Upfront flat-rate quote before any repair starts.</span>
                            </div>
                            <a href="tel:8005552273" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg text-sm whitespace-nowrap">
                                <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z"></path></svg>
                                Call (800) 555-CARE
                            </a>
                        </div>
                    </div>
                `;
            });
        });
    }

    // 7. Zip Code Checker Simulator (Clean Light Theme)
    const zipForm = document.getElementById('zipCheckForm');
    const zipInput = document.getElementById('zipCodeInput');
    const zipResult = document.getElementById('zipResult');

    if (zipForm && zipInput && zipResult) {
        zipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = zipInput.value.trim();
            if (val.length < 5) {
                zipResult.innerHTML = '<span class="text-amber-700 font-medium">Please enter a valid 5-digit US ZIP code.</span>';
                zipResult.classList.remove('hidden');
                return;
            }

            zipResult.innerHTML = `
                <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-sm flex items-center justify-between gap-3 animate-fadeIn">
                    <div class="flex items-center gap-2">
                        <span class="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        <span><strong>ZIP ${val}:</strong> 3 Master Plumbers Active. Estimated arrival: <strong>28-40 Mins</strong>.</span>
                    </div>
                    <a href="tel:8005552273" class="underline font-bold text-emerald-800 hover:text-emerald-900">Call Now</a>
                </div>
            `;
            zipResult.classList.remove('hidden');
        });
    }

    // 8. Form Submissions (Modal Forms)
    const forms = document.querySelectorAll('form[data-ajax-form]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Dispatching Alert...
                `;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                showToast('Priority Request Received! Our dispatch desk is contacting your nearest technician now. Expect a call in under 90 seconds.');
                form.reset();
                if (modal && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            }, 1200);
        });
    });

    // 9. Custom Toast Notification
    function showToast(message) {
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'globalToast';
            toast.className = 'fixed bottom-20 right-4 z-50 max-w-md bg-white border-2 border-emerald-500 text-slate-800 p-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-start gap-3';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="p-1 bg-emerald-100 text-emerald-600 rounded-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-sm text-slate-900">Dispatch Initiated</h4>
                <p class="text-xs text-slate-600 mt-1">${message}</p>
            </div>
            <button onclick="this.parentElement.classList.add('opacity-0', 'translate-y-10')" class="text-slate-400 hover:text-slate-700">&times;</button>
        `;

        toast.classList.remove('opacity-0', 'translate-y-10');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-10');
            toast.classList.remove('opacity-100', 'translate-y-0');
        }, 7000);
    }
});
