/**
 * PlumbingCareHub - ProPlumb Theme Vanilla JavaScript
 * Zero dependencies, blazing fast, 100% accessible
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
        if (window.scrollY > 30) {
            header?.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        } else {
            header?.classList.remove('shadow-md');
        }
    });

    // 3. Interactive Services Tab Switcher (Matching Reference Design)
    const servicesData = {
        'leak-repair': {
            title: 'Leak Repair & Water Diagnostics',
            desc: 'Stop water leaks before they cause structural wood rot, toxic mold, or expensive floor damage. Our electronic acoustic leak detectors pinpoint hidden leaks behind walls and under concrete slabs with zero unnecessary destruction.',
            bullets: [
                'Instant 30-45 Minute Emergency Response',
                'Long-lasting Copper & PEX Permanent Fixes',
                'Transparent Upfront Flat-Rate Pricing'
            ],
            image: 'assets/images/service-leak-repair.jpg',
            fallback: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'leak-repair'
        },
        'pipe-installation': {
            title: 'Repiping & Pipe Installation',
            desc: 'Whether upgrading corroded galvanized pipes to modern PEX or repairing ruptured underground mains, our licensed master plumbers install code-compliant, durable plumbing systems engineered to last decades.',
            bullets: [
                'Complete Whole-Home Repiping Solutions',
                'Burst & Frozen Pipe Emergency Bypass',
                'Full System Hydrostatic Pressure Testing'
            ],
            image: 'assets/images/hero-technician-2.jpg',
            fallback: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'burst-pipe'
        },
        'bathroom-plumbing': {
            title: 'Bathroom Plumbing & Fixtures',
            desc: 'From overflowing toilets and leaking wax seals to custom shower valve replacements and freestanding bathtub hookups, we deliver immaculate craftsmanship with clean drop cloths and complete debris cleanup.',
            bullets: [
                'Toilet Overflow & Wax Flange Replacement',
                'Shower Valve & Cartridge Leak Fixes',
                'Sink Faucet & Drain Assembly Installs'
            ],
            image: 'assets/images/hero-technician-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'bathroom'
        },
        'water-heater': {
            title: 'Water Heater Repair & Replacement',
            desc: 'No hot water or is your water heater tank actively leaking in the basement? We service and install both high-efficiency tankless water heaters and standard 40/50 gallon traditional gas and electric tanks.',
            bullets: [
                'Same-Day New Tank Haul-Away & Install',
                'Thermostat, Element & Gas Valve Repairs',
                'Top Brands: Rheem, Bradford White, Rinnai'
            ],
            image: 'assets/images/hero-technician-3.jpg',
            fallback: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'water-heater'
        },
        'drain-cleaning': {
            title: 'Hydro-Jetting & Drain Snaking',
            desc: 'Clearing stubborn mainline clogs, tree root intrusions, and multi-drain sewer backups. Using 4,000 PSI high-pressure hydro-jetters and HD fiber-optic video cameras, we scour pipe walls spotlessly clean.',
            bullets: [
                '4,000 PSI Industrial Hydro-Jetting Scour',
                'High-Resolution Fiber-Optic Sewer Camera Scan',
                'Safe Root & Heavy Grease Sludge Clearance'
            ],
            image: 'assets/images/service-drain-cleaning.jpg',
            fallback: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
            serviceCode: 'clogged-drain'
        }
    };

    const serviceTabs = document.querySelectorAll('.service-tab-btn');
    const serviceTitle = document.getElementById('serviceDetailTitle');
    const serviceDesc = document.getElementById('serviceDetailDesc');
    const serviceBullets = document.getElementById('serviceDetailBullets');
    const serviceImg = document.getElementById('serviceDetailImg');
    const serviceBookBtn = document.getElementById('serviceDetailBookBtn');

    if (serviceTabs.length && serviceTitle) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.getAttribute('data-service-key');
                const data = servicesData[key];
                if (!data) return;

                // Update active tab styles
                serviceTabs.forEach(t => {
                    t.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/25');
                    t.classList.add('bg-white', 'text-slate-700', 'hover:bg-blue-50', 'hover:text-blue-600', 'border', 'border-slate-200');
                    const arrow = t.querySelector('.tab-arrow');
                    if (arrow) arrow.classList.add('opacity-0');
                    const icon = t.querySelector('.tab-icon');
                    if (icon) {
                        icon.classList.remove('text-white');
                        icon.classList.add('text-blue-600');
                    }
                });

                tab.classList.remove('bg-white', 'text-slate-700', 'hover:bg-blue-50', 'hover:text-blue-600', 'border', 'border-slate-200');
                tab.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/25');
                const activeArrow = tab.querySelector('.tab-arrow');
                if (activeArrow) activeArrow.classList.remove('opacity-0');
                const activeIcon = tab.querySelector('.tab-icon');
                if (activeIcon) {
                    activeIcon.classList.remove('text-blue-600');
                    activeIcon.classList.add('text-white');
                }

                // Update content panel
                serviceTitle.textContent = data.title;
                serviceDesc.textContent = data.desc;

                if (serviceImg) {
                    serviceImg.src = data.image;
                    serviceImg.onerror = function() {
                        this.onerror = null;
                        this.src = data.fallback;
                    };
                }

                if (serviceBullets) {
                    serviceBullets.innerHTML = data.bullets.map(b => `
                        <li class="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                            <span class="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">✓</span>
                            <span>${b}</span>
                        </li>
                    `).join('');
                }

                if (serviceBookBtn) {
                    serviceBookBtn.setAttribute('data-service', data.serviceCode);
                }
            });
        });
    }

    // 4. Interactive FAQ Accordion (Clean Plus/Minus Toggle)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-toggle-icon');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');

                // Close other faqs
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-toggle-icon');
                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.textContent = '+';
                });

                if (!isOpen) {
                    content.classList.remove('hidden');
                    if (icon) icon.textContent = '−';
                } else {
                    content.classList.add('hidden');
                    if (icon) icon.textContent = '+';
                }
            });
        }
    });

    // 5. Booking Modal Functionality (Triggers on all [data-open-modal])
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

    // 6. Form Submissions with Toast Notification
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
                showToast('Quote Request Received! Our dispatch desk is contacting your nearest technician now. Expect a call in under 90 seconds.');
                form.reset();
                if (modal && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            }, 1000);
        });
    });

    // 7. Custom Toast Notification
    function showToast(message) {
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'globalToast';
            toast.className = 'fixed bottom-20 right-4 z-50 max-w-md bg-white border-2 border-blue-600 text-slate-800 p-4 rounded-2xl shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-start gap-3';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="p-1 bg-blue-100 text-blue-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-sm text-slate-900">Request Confirmed</h4>
                <p class="text-xs text-slate-600 mt-0.5">${message}</p>
            </div>
            <button onclick="this.parentElement.classList.add('opacity-0', 'translate-y-10')" class="text-slate-400 hover:text-slate-700">&times;</button>
        `;

        toast.classList.remove('opacity-0', 'translate-y-10');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-10');
            toast.classList.remove('opacity-100', 'translate-y-0');
        }, 6000);
    }
});
