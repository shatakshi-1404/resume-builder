const state = {
  education: [],
  experience: [],
  projects: []
};

let eduCount = 0, expCount = 0, projCount = 0;

function addEntry(type) {
  const container = document.getElementById(`${type}-entries`);
  let id, html;

  if (type === 'education') {
    id = ++eduCount;
    html = `
      <div class="entry-card" id="edu-${id}">
        <button class="remove-btn" onclick="removeEntry('edu-${id}', 'education', ${id})">×</button>
        <div class="field-group">
          <label>Degree / Program</label>
          <input type="text" placeholder="B.Tech in Computer Science (AI/ML)" oninput="captureEntry('education', ${id}, 'degree', this.value)" />
        </div>
        <div class="field-group">
          <label>Institution</label>
          <input type="text" placeholder="VIT Bhopal University" oninput="captureEntry('education', ${id}, 'institution', this.value)" />
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Year</label>
            <input type="text" placeholder="2023 – 2027" oninput="captureEntry('education', ${id}, 'year', this.value)" />
          </div>
          <div class="field-group">
            <label>Score / GPA</label>
            <input type="text" placeholder="CGPA: 8.5 / 10" oninput="captureEntry('education', ${id}, 'score', this.value)" />
          </div>
        </div>
      </div>`;
    state.education.push({ id, degree: '', institution: '', year: '', score: '' });

  } else if (type === 'experience') {
    id = ++expCount;
    html = `
      <div class="entry-card" id="exp-${id}">
        <button class="remove-btn" onclick="removeEntry('exp-${id}', 'experience', ${id})">×</button>
        <div class="field-group">
          <label>Role / Position</label>
          <input type="text" placeholder="Software Development Intern" oninput="captureEntry('experience', ${id}, 'role', this.value)" />
        </div>
        <div class="field-group">
          <label>Company</label>
          <input type="text" placeholder="Acme Technologies" oninput="captureEntry('experience', ${id}, 'company', this.value)" />
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Duration</label>
            <input type="text" placeholder="Jun 2024 – Aug 2024" oninput="captureEntry('experience', ${id}, 'duration', this.value)" />
          </div>
          <div class="field-group">
            <label>Location</label>
            <input type="text" placeholder="Remote / Bengaluru" oninput="captureEntry('experience', ${id}, 'location', this.value)" />
          </div>
        </div>
        <div class="field-group">
          <label>Key Points (one per line)</label>
          <textarea rows="3" placeholder="Built REST APIs reducing response time by 40%&#10;Deployed microservices on AWS EC2" oninput="captureEntry('experience', ${id}, 'bullets', this.value)"></textarea>
        </div>
      </div>`;
    state.experience.push({ id, role: '', company: '', duration: '', location: '', bullets: '' });

  } else if (type === 'projects') {
    id = ++projCount;
    html = `
      <div class="entry-card" id="proj-${id}">
        <button class="remove-btn" onclick="removeEntry('proj-${id}', 'projects', ${id})">×</button>
        <div class="field-group">
          <label>Project Name</label>
          <input type="text" placeholder="SmartQueue — Queue Management System" oninput="captureEntry('projects', ${id}, 'name', this.value)" />
        </div>
        <div class="field-row">
          <div class="field-group">
            <label>Tech Stack</label>
            <input type="text" placeholder="Next.js, Node.js, MongoDB, Socket.io" oninput="captureEntry('projects', ${id}, 'stack', this.value)" />
          </div>
          <div class="field-group">
            <label>Link (GitHub / Live)</label>
            <input type="text" placeholder="github.com/you/project" oninput="captureEntry('projects', ${id}, 'link', this.value)" />
          </div>
        </div>
        <div class="field-group">
          <label>Description (one point per line)</label>
          <textarea rows="3" placeholder="Built real-time queue system for 500+ concurrent users&#10;Reduced wait time by 35% using Socket.io" oninput="captureEntry('projects', ${id}, 'bullets', this.value)"></textarea>
        </div>
      </div>`;
    state.projects.push({ id, name: '', stack: '', link: '', bullets: '' });
  }

  container.insertAdjacentHTML('beforeend', html);
  renderPreview();
}

function captureEntry(type, id, field, value) {
  const item = state[type].find(e => e.id === id);
  if (item) { item[field] = value; renderPreview(); }
}

function removeEntry(elId, type, id) {
  document.getElementById(elId)?.remove();
  state[type] = state[type].filter(e => e.id !== id);
  renderPreview();
}

function v(id) { return (document.getElementById(id)?.value || '').trim(); }

function renderPreview() {
  const name = v('name');
  if (!name && !v('email') && !v('summary') && state.education.length === 0 && state.experience.length === 0 && state.projects.length === 0) {
    document.getElementById('resume-preview').innerHTML = `
      <div class="resume-placeholder">
        <span>Start filling in your details →<br>Your resume will appear here</span>
      </div>`;
    return;
  }

  const email = v('email'), phone = v('phone'), linkedin = v('linkedin'), github = v('github'), portfolio = v('portfolio');
  const summary = v('summary');
  const skillsTech = v('skills-tech'), skillsSoft = v('skills-soft');
  const certs = v('certifications');

  let contactParts = [];
  if (email) contactParts.push(`<a href="mailto:${email}">${email}</a>`);
  if (phone) contactParts.push(`<span>${phone}</span>`);
  if (linkedin) contactParts.push(`<a href="https://${linkedin.replace(/^https?:\/\//, '')}" target="_blank">${linkedin.replace(/^https?:\/\//, '')}</a>`);
  if (github) contactParts.push(`<a href="https://${github.replace(/^https?:\/\//, '')}" target="_blank">${github.replace(/^https?:\/\//, '')}</a>`);
  if (portfolio) contactParts.push(`<a href="https://${portfolio.replace(/^https?:\/\//, '')}" target="_blank">${portfolio.replace(/^https?:\/\//, '')}</a>`);

  let html = '';

  // Name + Contact
  if (name) html += `<div class="rv-name">${esc(name)}</div>`;
  if (contactParts.length) html += `<div class="rv-contact">${contactParts.join('')}</div>`;

  // Summary
  if (summary) {
    html += `<div class="rv-section">
      <div class="rv-section-title">Professional Summary</div>
      <p class="rv-summary">${esc(summary)}</p>
    </div>`;
  }

  // Education
  const edus = state.education.filter(e => e.degree || e.institution);
  if (edus.length) {
    html += `<div class="rv-section"><div class="rv-section-title">Education</div>`;
    edus.forEach(e => {
      html += `<div class="rv-entry">
        <div class="rv-entry-header">
          <div class="rv-title">${esc(e.degree)}</div>
          <div class="rv-date">${esc(e.year)}</div>
        </div>
        <div class="rv-sub">${esc(e.institution)}${e.score ? ` &mdash; ${esc(e.score)}` : ''}</div>
      </div>`;
    });
    html += `</div>`;
  }

  // Experience
  const exps = state.experience.filter(e => e.role || e.company);
  if (exps.length) {
    html += `<div class="rv-section"><div class="rv-section-title">Experience</div>`;
    exps.forEach(e => {
      const bullets = e.bullets ? e.bullets.split('\n').filter(b => b.trim()) : [];
      html += `<div class="rv-entry">
        <div class="rv-entry-header">
          <div class="rv-title">${esc(e.role)}</div>
          <div class="rv-date">${esc(e.duration)}</div>
        </div>
        <div class="rv-sub">${esc(e.company)}${e.location ? ` &mdash; ${esc(e.location)}` : ''}</div>
        ${bullets.length ? `<ul class="rv-bullets">${bullets.map(b => `<li>${esc(b.trim())}</li>`).join('')}</ul>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  // Projects
  const projs = state.projects.filter(p => p.name);
  if (projs.length) {
    html += `<div class="rv-section"><div class="rv-section-title">Projects</div>`;
    projs.forEach(p => {
      const bullets = p.bullets ? p.bullets.split('\n').filter(b => b.trim()) : [];
      const linkHtml = p.link
        ? ` &mdash; <a href="https://${p.link.replace(/^https?:\/\//, '')}" target="_blank" style="color:#2563eb;font-size:8.5pt;">${p.link.replace(/^https?:\/\//, '')}</a>`
        : '';
      html += `<div class="rv-entry">
        <div class="rv-entry-header">
          <div class="rv-title">${esc(p.name)}</div>
        </div>
        <div class="rv-sub">${p.stack ? esc(p.stack) : ''}${linkHtml}</div>
        ${bullets.length ? `<ul class="rv-bullets">${bullets.map(b => `<li>${esc(b.trim())}</li>`).join('')}</ul>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  // Skills
  if (skillsTech || skillsSoft) {
    html += `<div class="rv-section"><div class="rv-section-title">Skills</div><div class="rv-skills-row">`;
    if (skillsTech) html += `<div class="rv-skill-line"><span class="rv-skill-label">Technical: </span>${esc(skillsTech)}</div>`;
    if (skillsSoft) html += `<div class="rv-skill-line"><span class="rv-skill-label">Soft Skills: </span>${esc(skillsSoft)}</div>`;
    html += `</div></div>`;
  }

  // Certifications
  if (certs) {
    const certList = certs.split('\n').filter(c => c.trim());
    if (certList.length) {
      html += `<div class="rv-section"><div class="rv-section-title">Certifications & Achievements</div>
        <ul class="rv-certs-list">${certList.map(c => `<li>${esc(c.trim())}</li>`).join('')}</ul>
      </div>`;
    }
  }

  document.getElementById('resume-preview').innerHTML = html;
}

function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function downloadPDF() {
  window.print();
}

function resetForm() {
  if (!confirm('Clear everything and start over?')) return;
  document.querySelectorAll('input[type="text"], textarea').forEach(el => el.value = '');
  document.getElementById('education-entries').innerHTML = '';
  document.getElementById('experience-entries').innerHTML = '';
  document.getElementById('projects-entries').innerHTML = '';
  state.education = []; state.experience = []; state.projects = [];
  eduCount = 0; expCount = 0; projCount = 0;
  renderPreview();
}