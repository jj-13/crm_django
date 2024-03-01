import { useEffect } from "react"
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
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <Layout>
        <Navbar />
        <div data-scroll-section className="pt-28">
          <div className="mx-auto max-w-1700 px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="mx-auto max-w-1700">
              {/* Content goes here */}
              <Header/>
              <Incentives/>
              <UseCases/>
              <Features/>
              <CTA/>
              <LogoCloud/>
              <BlogList/>
            </div>
          </div>
        </div>            
        <Footer />
    </Layout>
  )
}
