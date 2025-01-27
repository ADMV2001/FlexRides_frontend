import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <div>
      <h1 className='font-bold border bg-red-300 w-20'>Hello</h1>

      <ProductCard name="Suzuki Alto" image="https://imgd.aeplcdn.com/1920x1080/cw/ec/39013/Maruti-Suzuki-Alto-Right-Front-Three-Quarter-154833.jpg?wm=0&q=80&q=80" 
      description="best fuel efficient on the market" price="2000.00"/>
    </div>
  )
}

export default App
