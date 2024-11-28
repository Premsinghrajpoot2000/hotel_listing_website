import './Header.css'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">IBS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.youtube.com/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.youtube.com/">Contach</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.youtube.com/">About</a>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid formdiv">
                    <form className="d-flex" role="search" action='/view_all'>
                        <input className="form-control me-2" name='search' type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header