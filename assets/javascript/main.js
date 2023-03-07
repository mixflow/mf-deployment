document.addEventListener('DOMContentLoaded', function() {

  const header = document.querySelector('.site-header');
  let prevScrollPos = window.pageYOffset;

  window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      // User is scrolling up, show the header
      header.classList.add('visible');
    } else {
      // User is scrolling down, hide the header
      header.classList.remove('visible');
    }

    prevScrollPos = currentScrollPos;
  });

  // Add sticky class when header reaches top of container
  const container = document.querySelector('body'); // document.querySelector('.container');
  const containerTop = container.offsetTop;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > containerTop) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky', 'visible');
    }
  });

});
