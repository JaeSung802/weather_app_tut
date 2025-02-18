export const addSpinner = (element) => {
    // 애니메이트 버튼
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};
