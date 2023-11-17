export const getCatImageFromTags = (tags) => {
    return fetch(`https://cataas.com/cat/says/${tags}?json=true`)
            .then(res => res.json())
            .catch(err => console.dir(err))
}