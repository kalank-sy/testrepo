let previewContainer = document.querySelector('.service-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.services .slider .card .img').forEach(img => {
    img.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = img.getAttribute('data-name');
        console.log("name",name);
        previewBox.forEach(preview =>{
            let target = preview.getAttribute('data-target');
            console.log(target);
            if (name == target) {
                preview.classList.add('active');
            }
        });
    };
});

previewBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    };
});