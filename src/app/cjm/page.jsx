import { Header } from "../../components/header"
import Footer from "../../components/footer"
import Carrusel from "../../components/carrusel"
import NewCollection from "../../components/cardNewCollection"
import CardAllProducts from "../../components/cardAllProducts"
function CjmHome() {

    const images = [
        "ArenaCarrusel3.webp",
        "ArenaCarrusel1.webp",
        "ArenaCarrusel2.webp",
        "1200ARENADUNE01.jpg",
    ]

    const titles = [
        "1200ARENADUNE01.jpg",
        "ArenaCarrusel1.webp",
        "ArenaCarrusel2.webp",
        "ArenaCarrusel3.webp"
    ]

    

    return (
        <>
            <Header />
            <Carrusel images={images}/>
            <body className=" bg-gradient-to-b-from">
                <div className=" flex items-center justify-center h-full">
                    <img src="/logoCJM.png" alt="" className=" lg:w-[20%] lg:h-[20%] w-[30%] h-[30%] max-w-full max-h-full " />
                </div>
            </body>
            <NewCollection images={images} titles={titles}/>
            <CardAllProducts />
            <Footer />
        </>
    )
}
export default CjmHome