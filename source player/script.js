document.addEventListener('DOMContentLoaded', function () {
  // --- DATA ---
  const lessonVideos = [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // Intro
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Setup
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Syntax
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Data Structures
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // Control Flow
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Functions
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', // OOP
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' // Modules
  ];

  // --- ELEMENTS ---
  const tabLinks = document.querySelectorAll('a[data-tab]');
  const panels = {
    materials: document.getElementById('materialsPanel'),
    discussions: document.getElementById('discussionsPanel'),
  };
  const lessonLinks = document.querySelectorAll('[data-lesson]');
  const videoPlayer = document.getElementById('course-video');
  const videoSource = document.getElementById('video-source');

  // --- TABS ---
  function selectTab(name) {
    tabLinks.forEach((link) => {
      const active = link.dataset.tab === name;
      link.setAttribute('aria-current', active ? 'page' : 'false');
      link.classList.toggle('text-blue-600', active);
      link.classList.toggle('border-blue-500', active);
      link.classList.toggle('border-transparent', !active);
      link.classList.toggle('text-gray-500', !active);
      link.classList.toggle('hover:text-gray-700', !active);
      link.classList.toggle('hover:border-gray-300', !active);
    });
    Object.entries(panels).forEach(([key, panel]) => {
      panel.classList.toggle('hidden', key !== name);
    });
  }

  tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      selectTab(link.dataset.tab);
    });
  });

  // --- SIDEBAR & VIDEO ---
  lessonLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Check if the lesson is locked
      const isLocked = link.querySelector('.material-symbols-outlined')?.textContent === 'lock';
      if (isLocked) {
        alert('This content is locked. Please complete the previous lessons to unlock.');
        return;
      }

      // Update active lesson styling
      lessonLinks.forEach((l) => {
        l.classList.remove('bg-blue-50', 'text-blue-600', 'font-semibold');
        l.classList.add('text-gray-700', 'hover:bg-gray-100', 'font-medium');
        const icon = l.querySelector('.material-symbols-outlined');
        if (icon && icon.textContent !== 'lock') {
            icon.classList.add('text-gray-400');
        }
      });
      link.classList.add('bg-blue-50', 'text-blue-600', 'font-semibold');
      link.classList.remove('text-gray-700', 'hover:bg-gray-100', 'font-medium');
      const icon = link.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.classList.remove('text-gray-400');
      }

      // Update video player
      if (lessonVideos[index]) {
        videoSource.setAttribute('src', lessonVideos[index]);
        videoPlayer.load();
        videoPlayer.play();
      }
    });
  });
});
