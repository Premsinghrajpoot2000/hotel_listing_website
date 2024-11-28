import FooterItems from '../Pages/FooterItems'
import './Footers.css'

function Footer() {
    return (
        <div className='footerDiv'>
            <div className='about'>
                <div className='hr'></div>
                <div className='FooterDivP'>
                    <p>About Us</p>
                </div>
                <div className='hr'></div>
            </div>
            <div>
                <FooterItems />
            </div>
        </div>
    )
}

export default Footer
