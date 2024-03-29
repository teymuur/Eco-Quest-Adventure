window.onload = function() {
    const links = document.querySelectorAll('.link');
    const iframe = document.getElementById('iframe-container');
  
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        links.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        const src = this.getAttribute('href');
        iframe.setAttribute('src', src);
      });
    });
  }