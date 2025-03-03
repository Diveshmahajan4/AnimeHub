import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import NavbarItem from "./NavbarItem"
import { BsBell, BsChevronDown} from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import AccountMenu from "./AccountMenu"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

const TOP_OFFSET = 69;

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  // if(!session){
  //   return{
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     }
  //   }
  // }

  return {
    props: {}
  }
}

const Navbar = () => {
    const [ showMobileMenu, setShowMobileMenu] = useState(false);
    const [ showAccountMenu, setShowAccountMenu] = useState(false);
    const [ showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handelScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        }
        
        window.addEventListener('scroll', handelScroll);

        return () => {
            window.removeEventListener('scroll', handelScroll);
        }
    }, [])

    const toggleMObileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

  return (
    <div className="w-full fixed z-40">
        <div className={`
        px-4
        md:px-10
        py-6
        flex
        items-center
        transition
        duration
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
        `}>
            <img className="h-12 lg:h-16" src="/images/logo.png" alt="Logo" />
            <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home"/>
            <NavbarItem label="Series"/>
            <NavbarItem label="Movies"/>
            <NavbarItem label="New & Popular"/>
            <NavbarItem label="My List"/>
            <NavbarItem label="Manga"/>
            </div>
            <div onClick={toggleMObileMenu} className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                <MobileMenu visible={showMobileMenu}/>
            </div>
            <div className="flex ml-auto gap-7 items-center">
                <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition ">
                    <BiSearch/>
                </div>
                <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition ">
                    <BsBell/>
                </div>
                <div onClick={toggleAccountMenu} className="flex items-center gap-2 cursor-pointer relative">
                    <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/white1.jpg" alt="white" />
                    </div>
                    <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar