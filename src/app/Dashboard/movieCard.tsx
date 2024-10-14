// components/MovieCard.tsx
import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
const { TextArea } = Input;

interface MovieCardProps {
  movie: {
    Movie: string;
    Year: number;
    Rating: number;
    Description: string;
  };
  index: number;
  deleteMovie: (index: number) => void;
  editMovie: (index: number, updatedMovie: any) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  index,
  deleteMovie,
  editMovie,
}) => {
  const roleId = useSelector((state: RootState) => state.roleid.value);
  console.log(roleId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDesription] = useState("");
  const [isValid, setIsValid] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    validateInputs();
    if (isValid) {
      editMovie(index, {
        Movie: title,
        Year: parseInt(year),
        Rating: parseFloat(rating),
        Description: description,
      });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    setDesription(value);
  };

  const validateInputs = () => {
    const isTitleValid = title.length >= 1;
    const isYearValid = year.length === 4;
    const isRatingValid = rating.length >= 1;
    const isDescriptionValid = description.length >= 1;

    setIsValid(
      isTitleValid && isYearValid && isRatingValid && isDescriptionValid
    );
  };

  useEffect(() => {
    setTitle(movie.Movie);
    setYear(movie.Year.toString());
    setRating(movie.Rating.toString());
    setDesription(movie.Description);
  }, []);

  return (
    <div className="border sm:w-[30%]  p-4 m-2 rounded shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-col w-[50%] text-left">
          <h2 className="text-xl font-bold">{movie.Movie}</h2>
          <p className="mt-5">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="mt-1">
            <strong>Rating:</strong> {movie.Rating}
          </p>
        </div>
        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2">
            <Button type="primary" disabled={roleId === 0} onClick={showModal}>
              Edit
            </Button>
            <Modal
              title="Edit Movie"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <div className="flex flex-col my-10 gap-5  items-center">
                <div className="w-full">
                  <p className="pb-1  ">Movie Title</p>
                  <Input value={title} onChange={onTitleChange} />
                </div>
                <div className="flex w-full justify-center">
                  <div className="w-[28%]">
                    <p className="pb-1">Year of release</p>
                    <Input value={year} onChange={onYearChange} />
                  </div>
                  <div className="w-[28%] ml-10">
                    <p className="pb-1">Rating</p>
                    <Input value={rating} onChange={onRatingChange} />
                  </div>
                </div>
                <div className="w-full">
                  <p className="pb-1">Description</p>
                  <TextArea
                    autoSize
                    value={description}
                    onChange={onDescriptionChange}
                  />
                </div>
              </div>
            </Modal>
            <Button
              danger
              disabled={roleId === 0 || roleId === 1}
              onClick={() => deleteMovie(index)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-5">{movie.Description}</p>
    </div>
  );
};

export default MovieCard;
