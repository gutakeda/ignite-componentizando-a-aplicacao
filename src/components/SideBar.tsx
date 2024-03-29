import { useEffect, useState, memo } from "react";
import { api } from "../services/api";
import "../styles/sidebar.scss";
import { Button } from "./Button";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export const SideBar = memo(
  ({ selectedGenreId, setSelectedGenreId }: SideBarProps) => {
    // Complete aqui
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    function handleClickButton(id: number) {
      setSelectedGenreId(id);
    }

    useEffect(() => {
      api.get<GenreResponseProps[]>("genres").then((response) => {
        setGenres(response.data);
      });
    }, []);

    return (
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    );
  }
);
