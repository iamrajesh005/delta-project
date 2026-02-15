// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


//dark mode logic
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // 1. Check for saved user preference on page load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if(toggle) toggle.checked = true;
    }

    // 2. Listen for toggle clicks
    if(toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); // Save preference
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light'); // Save preference
            }
        });
    }
