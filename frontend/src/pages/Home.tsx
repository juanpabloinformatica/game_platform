import Footer from "../components/Footer";
import CustomNavbar from "../components/Navbar";

function HomeBody() {
    return (
        <div className="homeBody">
            <div className="message">
                Join us to play a variety of multiplayer games, track your victories and progress,
                and connect with players from all around the world. Register now to start your adventure!
            </div>

        </div>
    );
}
function Page() {
    return (
        <>
            <CustomNavbar />
            <HomeBody />
            <Footer/>
        </>
    );
}
export default Page;
