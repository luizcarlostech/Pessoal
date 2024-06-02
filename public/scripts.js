// scripts.js

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.querySelector('.formulario form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = event.target[0].value;
    const email = event.target[1].value;
    const celular = event.target[2].value;
    const mensagem = event.target[3].value;

    const data = { nome, email, celular, mensagem };

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            event.target.reset();
        } else {
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem. Tente novamente.');
    }
});

// Scroll animations
const elements = document.querySelectorAll('.animar');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
});

elements.forEach(element => {
    observer.observe(element);
});
