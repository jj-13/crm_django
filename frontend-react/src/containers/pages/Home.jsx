import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { Layout } from "../../hocs/layouts/Layout"
import {Header} from "../../components/home/Header"
import {Incentives} from "../../components/home/Incentives"
import {UseCases} from "../../components/home/UseCases"
import {Features} from "../../components/home/Features"
import {CTA} from "../../components/home/CTA"
import {LogoCloud} from "../../components/home/LogoCloud"
import {BlogList} from "../../components/home/BlogList"

export const Home = () => {
  return (
    <Layout>
        <Navbar />
        <div data-scroll-section className="pt-28">
            <Header/>
            <Incentives/>
            <UseCases/>
            <Features/>
            <CTA/>
            <LogoCloud/>
            <BlogList/>
        </div>            
        <Footer />
    </Layout>
  )
}
