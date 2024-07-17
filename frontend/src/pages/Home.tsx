import Container from "react-bootstrap/Container";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"

function HomeBody() {
    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center bg-warning vh-100 p-4 text-center">
            <h1 className="mb-4">Welcome to Our Multiplayer Gaming Platform</h1>
            <p className="lead">
                Join us to play a variety of multiplayer games, track your victories and progress,
                and connect with players from all around the world. Register now to start your adventure!
            </p>
        </Container>
    );
}

function Page() {
    return (
        <>
            <div className="pageWrapper">
                <CustomNavbar />
                <HomeBody />
            </div>
        </>
    );
}
export default Page;
