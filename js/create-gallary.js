import markup from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const closeButtonRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

createGalleryMarkup(markup);

galleryRef.addEventListener('click', openImageHandler);

function createGalleryMarkup(array) { 
    const galleryMarkup = array.reduce((accum, item, index) => accum + `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}"><img class="gallery__image" 
        src="${item.preview}" data-source="${item.original}" alt="${item.description}" data-index="${index}"/></a></li>`
        , '');
    return galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
}

// =======================create markup by using 'createElement()'================================

// function createGalleryMarkup(array) {
//     const resultMarkup = [];
//     array.forEach((item, index ) => {
//         const listItemMarkup = document.createElement('li');
//         listItemMarkup.classList.add('gallery__item');
//         const linkMarkup = document.createElement('a');
//         linkMarkup.classList.add('gallery__link');
//         linkMarkup.setAttribute('href', item.original);
//         const imageMarkup = document.createElement('img');
//         imageMarkup.classList.add('gallery__image');
//         imageMarkup.setAttribute('src', item.preview);
//         imageMarkup.setAttribute('data-source', item.original);
//         imageMarkup.setAttribute('alt', item.description);
//         imageMarkup.setAttribute('data-index', index);
//         listItemMarkup.append(linkMarkup);
//         linkMarkup.append(imageMarkup);
//         resultMarkup.push(listItemMarkup);
//     });
//     return galleryRef.append(...resultMarkup);
// }

//=================================================================================================



function openImageHandler(event) { 
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') { 
        return;
    };
    modalImageRef.src = event.target.dataset.source;
    modalImageRef.alt = event.target.getAttribute('alt');
    modalRef.classList.add('is-open');
    
    window.addEventListener('keydown', keyboardHandler);
    closeButtonRef.addEventListener('click', closeModalHandler);
    overlayRef.addEventListener('click', closeByClickOnOverlayHandler);

    let currentIndex = Number(event.target.dataset.index);

    function keyboardHandler(event) {
        if (event.code === 'ArrowRight') {
            if (currentIndex < markup.length - 1) {
                let newIndex = 0;
                const incrementIndex = () => {
                    newIndex = currentIndex + 1;
                    currentIndex = newIndex;
                    return currentIndex;
                };
                modalImageRef.src = `${markup[incrementIndex()].original}`;
            }
            
        }
        if (event.code === 'ArrowLeft') {
            if (currentIndex !== 0) {
                let newIndex = 0;
                const decrementIndex = () => {
                    newIndex = currentIndex - 1;
                    currentIndex = newIndex;
                    return currentIndex;
                };
                modalImageRef.src = `${markup[decrementIndex()].original}`;
            }
            
        }
        if (event.code === 'Escape') { 
            modalRef.classList.remove('is-open');
            modalImageRef.src = '';
            modalImageRef.alt = '';
            window.removeEventListener('keydown', keyboardHandler);
        }
    }

    function closeModalHandler() { 
        modalRef.classList.remove('is-open');
        modalImageRef.src = '';
        modalImageRef.alt = '';
        window.removeEventListener('keydown', keyboardHandler);
    }

    function closeByClickOnOverlayHandler(event) { 
        if (event.target.nodeName !== 'DIV') { 
            return;
        }
        modalRef.classList.remove('is-open');
        window.removeEventListener('keydown', keyboardHandler);
    }
}
