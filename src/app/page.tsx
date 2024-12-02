import Menu from "@/components/menu/menu";
import MovieList from "@/components/movie-list/movie-list";
import { ThemeProvider } from "../context/ThemeContext";
import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <div className="grid grid-cols-12">
          <div className="bg-white col-span-3">
            <Menu />
          </div>
          <div className="col-span-9 movies-list">
            <MovieList />
          </div>
        </div>
      </ThemeProvider>
    </NextUIProvider>
  );
}
