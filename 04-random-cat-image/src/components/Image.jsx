export function Image({ imageUrl }) {
    return (
        <>
            { imageUrl && <img src={imageUrl} alt="Image"/> }
        </>
    )
}