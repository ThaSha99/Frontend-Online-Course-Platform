document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const difficultyFilter = document.getElementById('difficultyFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  const coursesGrid = document.getElementById('coursesGrid');

  // Example course data (replace with dynamic data as needed)
  const courses = [
    {
      title: "Introduction to Data Science",
      instructor: "John Doe",
      category: "Development",
      difficulty: "Beginner",
      price: "Paid",
      priceValue: 49.99,
      rating: 4,
      reviews: 1234,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbaa-bEbJLK2CK561xJuADC1K3ZPc3DimZVSt1aMAQfw1R_EOmIAgKZfn4qzThKkrmw_o5KmDSeiIobYyvxWJ62VYEvzhbPhMn4b7e5b2nVfNQJ1rI0eBWZkZUBUhtSTe8Jlymct5yEEPP7ZPlMaIrc1sMY9dlcc-Fd5qDMpV-pXe5pTLNgqQtet-Rq644ljuyYp1PlEAVh5YtIyF9-ehDO4vuApLni1Jx1vmGfpQEUSeTn9VW4CeZYFHfe09QbAi09CO579PcYhCh",
      free: false
    },
    {
      title: "Web Development Bootcamp",
      instructor: "Jane Smith",
      category: "Development",
      difficulty: "Intermediate",
      price: "Paid",
      priceValue: 89.99,
      rating: 4.5,
      reviews: 2456,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuA61Qo_-vEC8_9gFvmEPefvgu-_XoBlAfX4kamniZWaQLOjSHt0mk9vXDN9zj_tfC04pkRb76vjqtUzwvFaY_KltntWj8fK9B3MAEVgi18XLBFr_goZzkm8qu9jlyon3na283VsAnZg3XgMKxPl2w01PnqUPa0terHOEoDvXoX4hrvIjcWAcwwJj3pNY46pnKCQv_EvKLO9rbTlqHcareASrf8V3tcx__fJc_4-piEKtTEKfNfjtHjydpdscYA6ZweyepBaGGbGVwYg",
      free: false
    },
    {
      title: "Digital Marketing Fundamentals",
      instructor: "Alex Johnson",
      category: "Marketing",
      difficulty: "Beginner",
      price: "Free",
      priceValue: 0,
      rating: 4,
      reviews: 987,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgxyB_HZYppfYxcK3OotNBEr8yJvO2M_ThLTr4cun02uivulFdZuAlDvrXlt34VNsudHpQN7UUKAadE3CEFIGeI5GQTC3csRUMMNB_f-tIqj8vMrvGv2bRhRnOHrayu9qU4foZXc0dDvZe9qOZtZcY485LZBL-cecaeMQ6IWO6mGh3qYHvKkUL21T9pASbTM4qPl_rIPmBrSfNjZAdS6GOsq1Q6ll7tZGAehe2Uh9ahb4ypuCb_kocZPJboyZPneKrfBLI-0yKdnSe",
      free: true
    },
    {
      title: "Graphic Design Masterclass",
      instructor: "Emily White",
      category: "Design",
      difficulty: "Advanced",
      price: "Paid",
      priceValue: 99.99,
      rating: 4.5,
      reviews: 3102,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiJ_c0DNvk043b5zzat_TT8EgTk6LxNIJGN3tAVKVBCeCgfhnNsy3TzPjoA77gaNBv9DcdKTtz-PGW0vzpGV_d5lqx7Da-uE2hRygMuvywqDReYnSzjva5RyxD_3gDoBcMdKWja8JWZZrxmtuUv1h5sSVkpxN9YRgdPcOmr9JhCuPjxs_e_WoU1oBRcWVt34nYQCRdPNQg4TgaWrWx_OS6LtyukiRoXkOSn5dK80lclzyXIF9m67tKKXPegerEObj2rdV9-iLhSeUw",
      free: false
    }
  ];

  function renderCourses(filteredCourses) {
    coursesGrid.innerHTML = '';
    if (filteredCourses.length === 0) {
      coursesGrid.innerHTML = `<p class="text-gray-500 col-span-full text-center">No courses found matching your criteria.</p>`;
      return;
    }
    filteredCourses.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = "bg-white rounded-lg shadow-md overflow-hidden group";
      courseElement.innerHTML = `
        <a class="block" href="#">
          <img alt="Course thumbnail" class="w-full h-40 object-cover group-hover:opacity-90 transition-opacity" src="${course.thumbnail}"/>
        </a>
        <div class="p-5">
          <h3 class="font-semibold text-lg h-14"><a class="hover:text-[var(--primary-color)]" href="#">${course.title}</a></h3>
          <p class="text-gray-500 text-sm mb-2">${course.instructor}</p>
          <div class="flex items-center mb-3">
            ${renderStars(course.rating)}
            <span class="text-sm text-gray-500 ml-2">(${course.reviews.toLocaleString()})</span>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-lg font-bold text-gray-900">${course.free ? 'Free' : `$${course.priceValue}`}</p>
            <a class="btn-primary px-4 py-2 rounded-md text-sm font-semibold" href="#">Enroll</a>
          </div>
        </div>
      `;
      coursesGrid.appendChild(courseElement);
    });
  }

  function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += `<span class="text-yellow-500 material-symbols-outlined text-base">star</span>`;
      } else if (i - rating < 1) {
        stars += `<span class="text-yellow-500 material-symbols-outlined text-base">star_half</span>`;
      } else {
        stars += `<span class="text-gray-300 material-symbols-outlined text-base">star</span>`;
      }
    }
    return stars;
  }

  function filterCourses() {
    let search = searchInput.value.toLowerCase();
    let category = categoryFilter.value;
    let difficulty = difficultyFilter.value;
    let price = priceFilter.value;
    let sort = sortFilter.value;

    let filtered = courses.filter(course => {
      let matchesSearch = course.title.toLowerCase().includes(search);
      let matchesCategory = category === "Categories" || course.category === category;
      let matchesDifficulty = difficulty === "Difficulty" || course.difficulty === difficulty;
      let matchesPrice = price === "Price" || (price === "Free" ? course.free : !course.free);
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });

    if (sort === "Sort by: Popularity") {
      filtered.sort((a, b) => b.reviews - a.reviews);
    } else if (sort === "Sort by: Newest") {
      // If you have a date property, sort by date here
    } else if (sort === "Sort by: Rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderCourses(filtered);
  }

  searchInput.addEventListener('input', filterCourses);
  searchBtn.addEventListener('click', filterCourses);
  sortFilter.addEventListener('change', filterCourses);
  applyFiltersBtn.addEventListener('click', filterCourses);

  // Initial render
  filterCourses();
});
