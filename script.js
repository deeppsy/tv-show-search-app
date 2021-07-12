const form = document.querySelector('#searchForm')
const imgContainer = document.querySelector('.img-container')

// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const searchTerm = form.elements.query.value;

//     const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
//     makeImages(result.data)
//     form.elements.query.value = '';
// })

// The above method works fine but its best not to use that string template literals
// If i had more than one query string to pass in, it would be messy.so, below is a abetter method from axios



form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (imgContainer.children.length !== 0) {
        const images = document.querySelectorAll('.img-container img')
        for (let img of images) {
            img.remove();
        }
    }

    const searchTerm = form.elements.query.value;

    const config = { params: { q: searchTerm, /*isFunny: 'Dipo'*/ }, /*headers: {}*/ };
    // In the line above, i added my own search term and you can verify this in the network tab and also, this method doesn't prevent our headers method that we learnt the other time


    const result = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(result.data)
    form.elements.query.value = '';

})

const makeImages = function (shows) {
    for (const res of shows) {
        if (res.show.image) {
            const img = document.createElement('img');
            img.src = res.show.image.medium;
            imgContainer.append(img);
        }
    }
}