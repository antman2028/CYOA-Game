import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { motion } from 'framer-motion';


export default function Home() {
  return (
      <div>
          <div className="bg-black z-11 flex items-center justify-center w-full h-screen border-8 border-red-800">
          </div>
          <div className="fixed inset-0 z-1 bg-[rgba(255,255,255,0.00001)] backdrop-blur-sm flex justify-center items-center">
               <div className="justify-items-stretch items-center">
                    <h1 className="home-title font-bold" >Hello World</h1>
                    <button className="home-button">
                        Click Me
                        <span><KeyboardDoubleArrowRightIcon /></span>
                    </button>
               </div>
          </div>
    </div>
  )
}
