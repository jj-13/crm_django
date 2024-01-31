import {motion} from 'framer-motion'

export const Layout = ({children}) => {
  return (
    <motion.div
      initial={{opacity: 0, transition: {duration: 0.3}}}
      animate={{opacity: 1}}
      exit={{opacity: 0, transition: {duration: 0.3}}}
      >
          
      {children}
    </motion.div>
  )
}
