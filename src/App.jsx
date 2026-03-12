import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Programs     from './components/Programs'
import WhyUs        from './components/WhyUs'
import Testimonials from './components/Testimonials'
import LeadForm     from './components/LeadForm'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <WhyUs />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
