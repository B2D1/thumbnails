const containers = [...document.getElementsByName('blur')];
const setStyle = (elem, className) => {
    if (elem.classList) {
        elem.classList.add(className);
    } else {
        elem.className += ` ${className}`;
    }
};
containers.forEach(elem => {
    const realHeight = elem.dataset.height;
    const realWidth = elem.dataset.width;
    const thumbSrc = elem.dataset.thumb;
    const realSrc = elem.dataset.src;

    elem.style.paddingBottom = `${(realHeight / realWidth) * 100}%`;
    const thumbImg = new Image();
    thumbImg.src = thumbSrc;
    thumbImg.onload = () => {
        setStyle(thumbImg, 'thumb-loaded');
    };
    elem.appendChild(thumbImg);

    const realImg = new Image();
    realImg.src = realSrc;
    realImg.onload = () => {
        setStyle(realImg, 'large-loaded');
        setStyle(thumbImg, 'thumb-hidden');
    };
    elem.appendChild(realImg);
});
