import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName, playQuiz } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const QuizTitle = ({ title, id }) => {
  const selectedQuiz = useRef();

  const dispatch = useDispatch();

  const handelSelected = () => {
    const selected = selectedQuiz.current.checked;

    

    if (!selected) {
      return;
    }

    // dispatching and choosing the quiz to be played //

    dispatch(playQuiz(id));
  };

  return (
    <div className="created-quiz-container d-flex">
      <input
        type="radio"
        name=""
        id=""
        ref={selectedQuiz}
        onClick={handelSelected}
      />
      <p>{title}</p>
    </div>
  );
};

// This is all the logic of Playing quiz page //

export const PlayQuiz = () => {
  const name = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state) => state.reducer.quiz);

  // this handler will handle and route us to play the quiz which has been selected //

  const getNameHandler = () => {
    // if there id no name entered then do nothing except an alert //

    if (name.current.value === "") {
      alert("Please enter a name!");
      return;
    }

    // if there exist a quiz choose the selected one and let us play that quiz with the name entered and route to the play page //

    if (quiz.length > 0) {
      dispatch(getName(name.current.value));
      navigate("/quiz");
    }
  };

  //  if there is no quiz then this empty message will be displayed //

  const emptyMsg = (
    <p style={{ color: "red" }}>
      There are Currently No Quiz! Please make some new quizzes!
    </p>
  );

  return (
    <motion.div
      className="play-quiz-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="play-quiz-main">
        <div className="play-quiz-heading">
          <h1>Go to Quiz </h1>
        </div>

        <div className="quiz-description">
        It is a quiz platform where you enter your name and go to the quiz section.
        </div>

        <div className="input-name">
          <div className="quiz-name">
            <label>Enter Your Name</label>
            <input type="text" ref={name} className="name-input-text" />
          </div>
          <div className="created-quiz">
            {quiz.length === 0
              ? emptyMsg
              : quiz
                  .filter((el) => el.isActive === true)
                  .map((el) => (
                    <QuizTitle title={el.title} key={el.id} id={el.id} />
                  ))}
          </div>
        </div>

        <div className="submti-name-btn">
          <button style={{ margin: 0 }} onClick={getNameHandler}>
            Start Quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
};
