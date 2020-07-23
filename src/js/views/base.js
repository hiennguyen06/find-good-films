export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class= "loader">
            <svg>
                <use href="img/icons.svg#icon-spinner2"></use>
            </svg>
            <span class="loading"></span>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};