import React, { useState } from "react";
import MovieCard from "./movieCard";
import CarouselCustom from "./carouselCustom";
import { Button, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logHimIn, logHimOut } from "../../../slices/loginSlice";

import type { RootState } from "../../../store";

const { TextArea } = Input;

const Dashboard = () => {
  const roleId = useSelector((state: RootState) => state.roleid.value);
  console.log(roleId);
  const [api, contextHolder] = notification.useNotification();

  const [movies, setMovies] = useState([
    {
      Movie: "Inception",
      Year: 2010,
      Rating: 8.8,
      Description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    },
    {
      Movie: "The Dark Knight",
      Year: 2008,
      Rating: 9.0,
      Description:
        "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice when the Joker wreaks havoc on Gotham City.",
    },
    {
      Movie: "Interstellar",
      Year: 2014,
      Rating: 8.6,
      Description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      Movie: "The Matrix",
      Year: 1999,
      Rating: 8.7,
      Description:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    },
    {
      Movie: "The Godfather",
      Year: 1972,
      Rating: 9.2,
      Description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    },
    {
      Movie: "The Shawshank Redemption",
      Year: 1994,
      Rating: 9.3,
      Description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      Movie: "Pulp Fiction",
      Year: 1994,
      Rating: 8.9,
      Description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
    {
      Movie: "Fight Club",
      Year: 1999,
      Rating: 8.8,
      Description:
        "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    },
    {
      Movie: "Forrest Gump",
      Year: 1994,
      Rating: 8.8,
      Description:
        "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    },
    {
      Movie: "The Lord of the Rings: The Return of the King",
      Year: 2003,
      Rating: 8.9,
      Description:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [isAddValid, setIsAddValid] = useState(false);

  const onTitleChange = (e: any) => {
    const value = e.target.value;
    setTitle(value);
  };

  const onYearChange = (e: any) => {
    const value = e.target.value;
    setYear(value);
  };

  const onRatingChange = (e: any) => {
    const value = e.target.value;
    setRating(value);
  };

  const onDescriptionChange = (e: any) => {
    const value = e.target.value;
    setDescription(value);
  };

  const deleteMovie = (index: number) => {
    const newMovies = [...movies];
    newMovies.splice(index, 1);
    setMovies(newMovies);
  };

  const editMovie = (index: number, updatedMovie: any) => {
    const newMovies = [...movies];
    newMovies[index] = updatedMovie;
    setMovies(newMovies);
  };

  const addMovie = () => {
    if (validateAddInputs()) {
      console.log("thru");
      const newMovie = {
        Movie: title,
        Year: parseInt(year),
        Rating: parseFloat(rating),
        Description: description,
      };
      setMovies([newMovie, ...movies]);

      setTitle("");
      setYear("");
      setRating("");
      setDescription("");
    } else {
      api.error({
        message: "Please fill all fields correctly to add Movie...",
        placement: "top",
      });
    }
  };

  const validateAddInputs = () => {
    console.log("passed");
    const isTitleValid = title.length >= 1;
    const isYearValid = year.length === 4;
    const isRatingValid = /^\d$|^\d\.\d$/.test(rating);
    const isDescriptionValid = description.length >= 1;

    return isTitleValid && isYearValid && isRatingValid && isDescriptionValid;
  };

  return (
    <div>
      {contextHolder}
      <div className="bg-[#F5F7F8]  py-4 w-full  sm:p-10">
        <div className="flex flex-col gap-5 sm:gap-0 items-center sm:flex-row sm:items-start   ">
          <div className="sm:w-[50%] w-[90%] mx-auto">
            <div className=" bg-blue-100 shadow-md rounded-md px-10 py-5">
              <p className="text-lg font-medium  text-cyan-800 pb-3">
                Add your favourite movie
              </p>
              <div className="flex flex-col w-full gap-5">
                <div className="sm:w-[70%] text-left">
                  <p>Movie Title</p>
                  <Input
                    value={title}
                    onChange={onTitleChange}
                    placeholder="enter movie name"
                  />
                </div>
                <div className="sm:w-[70%] text-left">
                  <p>Year of release</p>
                  <Input
                    value={year}
                    placeholder="movie release date"
                    onChange={onYearChange}
                  />
                </div>
                <div className="sm:w-[70%] text-left">
                  <p> Rating</p>
                  <Input
                    value={rating}
                    placeholder="imbd ratings"
                    onChange={onRatingChange}
                  />
                </div>
                <div className="w-full text-left">
                  <p> Description</p>
                  <TextArea
                    value={description}
                    onChange={onDescriptionChange}
                    autoSize={{ minRows: 2, maxRows: 2 }}
                    placeholder="Movie desciption"
                  />
                </div>
                <div className="w-full">
                  <Button onClick={addMovie}>Add Movie</Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-xl w-[87%] sm:w-[40%]  sm:ml-auto  border shadow-md overflow-hidden">
            <CarouselCustom />
          </div>
        </div>
        <p className="text-3xl mt-10 text-red-400 font-bold">
          Our All Time Favourites
        </p>
        <div className="w-full flex   mt-8 flex-wrap">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              index={index}
              deleteMovie={deleteMovie}
              editMovie={editMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
