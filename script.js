async function loadProjects() {
    try {
        const res = await fetch('projects/projects.json');
        const projects = await res.json();
        const grid = document.getElementById('projects-grid');
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project card';

            const img = document.createElement('img');
            img.src = p.image || 'https://via.placeholder.com/400x200?text=Project';
            img.alt = p.title;

            const h4 = document.createElement('h4');
            h4.textContent = p.title;

            const desc = document.createElement('p');
            desc.textContent = p.description;

            const meta = document.createElement('div');
            meta.className = 'meta';

            const tech = document.createElement('div');
            tech.className = 'chip';
            tech.textContent = p.tech.slice(0, 3).join(', ');

            const links = document.createElement('div');
            const repo = document.createElement('a');
            repo.href = p.repo || '#';
            repo.textContent = 'Repo';
            repo.target = '_blank';
            repo.style.marginLeft = '8px';

            links.appendChild(repo);
            if (p.live && p.live.trim() !== '') {
                const live = document.createElement('a');
                live.href = p.live;
                live.textContent = 'Live';
                live.target = '_blank';
                live.style.marginLeft = '8px';

                links.appendChild(live);
            }
            meta.appendChild(tech);
            meta.appendChild(links);

            const projectContent = document.createElement('div');
            projectContent.className = 'project-content';
            
            projectContent.appendChild(h4);
            projectContent.appendChild(desc);
            projectContent.appendChild(meta);
            
            card.appendChild(img);
            card.appendChild(projectContent);

            grid.appendChild(card);
        })
    } catch (e) {
        console.error('Failed to load projects', e);
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);
// smooth scroll for top nav links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.top-nav a, .nav-link').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        })
    })

});
