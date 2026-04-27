import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import SpecialOffer from '../components/SpecialOffer'
import AboutHome from '../components/AboutHome'
import OurHomeMenu from '../components/OurHomeMenu'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <SpecialOffer />
            <OurHomeMenu />
            {/* <AboutHome /> */}
            <Footer />
        </>
    )
}

export default Home
