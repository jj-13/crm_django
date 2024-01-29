import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { Layout } from "../../hocs/layouts/Layout"
import {Header} from "../../components/home/Header"

export const Home = () => {
  return (
    <Layout>
        <Navbar />
        <div data-scroll-section className="pt-28">
            <Header/>
        </div>            
        <Footer />
    </Layout>
  )
}
