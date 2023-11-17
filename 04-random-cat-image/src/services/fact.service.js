export const getFact = () => {
    return fetch(`https://catfact.ninja/fact`)
            .then(res => res.json())
            .then(data => data.fact)
            .catch(err => console.dir(err))
}