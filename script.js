// document.addEventListener('DOMContentLoaded', function() {
//     const INSTAGRAM_ACCESS_TOKEN = 'IGQWRPUllFdEZABVE1ZAUHkwY1c3WFM1VWlOazZAQTS1mTEVMUDZAyMWFCUldMeGpaUlBkOURoMHlpVWVPRldnUVdBU2JNUWVoUEVZAN1VLaW1mdVJoejdvWkppX1Y1T0thVDlQbUljNWN3QmF5dE1TT2NMWFpjN0tUMWMZD';

//     async function fetchInstagramPosts() {
//         try {
//             if (!INSTAGRAM_ACCESS_TOKEN) {
//                 throw new Error('Token de acesso não fornecido.');
//             }

//             const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
//             if (!response.ok) {
//                 throw new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
//             }
//             const data = await response.json();
//             return data.data;
//         } catch (error) {
//             console.error('Erro ao buscar publicações do Instagram:', error);
//             return [];
//         }
//     }

//     function renderInstagramPosts(posts) {
//         if (!posts || posts.length === 0) {
//             console.error('Nenhuma publicação encontrada');
//             return;
//         }

//         const recentVideoPost = posts
//             .filter(post => post.media_type === 'VIDEO')
//             .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
//             .slice(0, 1);

//         const recentVideoPostContainer = document.getElementById('recent-video-post');
//         recentVideoPost.forEach(post => {
//             const videoElement = document.createElement('div');
//             videoElement.className = 'instagram-reel';
//             videoElement.innerHTML = `
//                 <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
//                     <video class="instagram-post-reel" controls src="${post.media_url}"></video>
//                 </a>
//             `;
//             recentVideoPostContainer.appendChild(videoElement);
//         });

//         const instagramPostsContainer = document.getElementById('instagram-posts');
//         posts.slice(0, 4).forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.className = 'instagram-post';
//             postElement.innerHTML = `
//                 <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
//                     <img class="instagram-post-feed" src="${post.media_url}" alt="${post.caption}">
//                 </a>
//             `;
//             instagramPostsContainer.appendChild(postElement);
//         });
//     }

//     fetchInstagramPosts().then(posts => {
//         renderInstagramPosts(posts);
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    async function fetchData() {
        const response = await fetch('dados.json');
        const data = await response.json();
        return data;
    }

    function fillModalContent(modalId, items) {
        const modalBody = document.getElementById(modalId);
        modalBody.innerHTML = items.map(item => `
            <div class="colecao__modal-container-card">
                <img src="${item.imagem}" alt="${item.nome}" class="img-fluid colecao__modal-container-card-imagem">
                <h4 class="colecao__modal-container-card-titulo">${item.nome}</h4>
                <button class="colecao__modal-container-card-btn">
                    <a class="colecao__modal-container-card-btn-link" href="https://wa.me/5575983332332?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20produtos!">QUERO COMPRAR</a>
                </button>
            </div>
        `).join('');
    }

    fetchData().then(data => {
        fillModalContent('modal-body-camisas', data.camisas);
        fillModalContent('modal-body-calcas', data.calcas);
        fillModalContent('modal-body-bermudas', data.bermudas);
        fillModalContent('modal-body-sapatos', data.sapatos);
        fillModalContent('modal-body-sueteres', data.sueteres);
        fillModalContent('modal-body-blazers', data.blazers);
    }).catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.getElementById('navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    function updateTogglerIcon() {
        if (navbarCollapse.classList.contains('show')) {
            toggler.classList.remove('toggler-icon-fechado');
            toggler.classList.add('toggler-icon-aberto');
        } else {
            toggler.classList.remove('toggler-icon-aberto');
            toggler.classList.add('toggler-icon-fechado');
        }
    }

    toggler.addEventListener('click', function() {
        setTimeout(updateTogglerIcon, 1); 
    });

    const observer = new MutationObserver(updateTogglerIcon);
    observer.observe(navbarCollapse, { attributes: true, attributeFilter: ['class'] });

    updateTogglerIcon();
});