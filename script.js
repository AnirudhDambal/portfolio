// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Project Data
const projects = [
    {
        id: "p1",
        title: "Real-Time Customer Support Orchestrator",
        description: "A production-ready intelligent customer support system built using Agentic AI with LangGraph. Uses supervisor-worker architecture, RAG with ChromaDB, and conversation memory context-aware responses.",
        tech: ["Python", "FastAPI", "LangGraph", "GPT-4", "React"],
        repo: "https://github.com/AnirudhDambal/RT-cutomer-support-orchestrator",
        live: ""
    },
    {
        id: "p2",
        title: "AI-Powered Learning Management System",
        description: "Comprehensive LMS enhanced with AI features: automatic video transcription (Whisper), multi-language translation (Gemini), AI notes, quizzes, and personalized recommendations.",
        tech: ["Python", "FastAPI", "MongoDB", "Gemini", "Next.js"],
        repo: "https://github.com/AnirudhDambal/smart-lms",
        live: ""
    },
    {
        id: "p4",
        title: "Connectify - Social Media Platform",
        description: "Full-stack social media app (MERN). Features users connection, posts sharing, likes/comments, secure profile management with JWT and role-protected APIs.",
        tech: ["MongoDB", "Express", "React", "Node", "JWT"],
        repo: "https://github.com/AnirudhDambal/Connectify",
        live: "https://connectify-plum.vercel.app/dashboard"
    }
];

// 2. Populate Projects
const projectContainer = document.getElementById('projects-grid');
projectContainer.innerHTML = ''; // Clear existing content
projects.forEach((proj, index) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    
    // Logic for links
    let linksHtml = '<div class="p-actions">';
    if (proj.repo) linksHtml += `<a href="${proj.repo}" target="_blank" class="icon-link"><i class="fa-brands fa-github"></i></a>`;
    if (proj.live) linksHtml += `<a href="${proj.live}" target="_blank" class="icon-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
    linksHtml += '</div>';

    card.innerHTML = `
        <div class="p-header">
            <span class="p-num">0${index + 1}</span>
            ${linksHtml}
        </div>
        <h3 class="p-title">${proj.title}</h3>
        <p class="p-desc">${proj.description}</p>
        <div class="p-tech">
            ${proj.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
    `;
    
    // Card click leads to available link
    card.addEventListener('click', (e) => {
        // Prevent doubling up if clicking the specific icon
        if (e.target.closest('a')) return;
        const mainLink = proj.live || proj.repo;
        if(mainLink) window.open(mainLink, '_blank');
    });
    
    projectContainer.appendChild(card);
});

// 3. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay (animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Interactions
document.querySelectorAll('a, .project-card, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0,0,0,0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 4. GSAP Animations

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Hero Animation Sequence
const tl = gsap.timeline();

tl.from(".hero-anim", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
})
.from(".hero-image img", {
    scale: 1.5,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out"
}, "-=1");

// Scroll Reveal Animations for Sections
gsap.utils.toArray('[data-scroll]').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Staggered List Animations
gsap.utils.toArray('.timeline-block, .skill-category, .project-card').forEach((element, i) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1
    });
});