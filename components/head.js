import Head from 'next/head'

export default function HeadObject({children}) {
    const title = "Chailight";
    const description = "To ensure institutions are held accountable for their response to antisemitism and recent attacks in Israel, we seek your assistance in uploading email screenshots illustrating their stance, as this data will be used to compile a report shedding light on any institutions failing to fulfill their responsibility, emphasizing the importance of breaking the silence.";
    const searchBarColor = "#ffffff"; // This is your Safari 15 Search Bar Color in Light Mode
    //const darkSearchBarColor = "#000000"; // This is your Safari 15 Search Bar Color in Dark Mode (optional)
    const keywords = "put some fun keywords here";
    const author = "Abby Fischler";
    const url = "http://localhost:3000"; // This is your og:url or domain (optional but recommended)
    //const image = "/ogimage.png"; // This is your OpenGraph image
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="theme-color" content={searchBarColor} media="(prefers-color-scheme: light)" />
            {/* <meta name="theme-color" content={darkSearchBarColor} media="(prefers-color-scheme: dark)" /> */}
            {url ? <meta property="og:url" content={url} /> : ''}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:image" content={image} /> */}
            {/* Add analytics here */}
            {children}
        </Head>
    )
}
