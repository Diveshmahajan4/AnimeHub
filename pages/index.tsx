import AnimeContainer from "@/components/AnimeContainer";
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavLists";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

export default function Home() {
  // const {data : movies = [] } = useMovieList();
  // const {data : favorites = []} = useFavorites();
  const { isOpen , closeModal} = useInfoModal();
  const [animeData, setAnimeData] = useState([]);

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
    <Navbar/>
    <Billboard/>
    <AnimeContainer
          title="Trending Now"
          apiEndpoint="https://api.amvstr.me/api/v2/trending?limit=8"
          isPagination={false}
    />
    <AnimeContainer
          title="Browse All"
          apiEndpoint="https://api.amvstr.me/api/v2/popular"
          isPagination={true}
    />
    </>
  )
}
