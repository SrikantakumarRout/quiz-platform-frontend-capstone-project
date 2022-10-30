import React from "react";
import { HomeCard } from "./Ui/HomeCard";




export const Home = () => {
  return (
    <div className="home-container">
      <HomeCard
        color="yellow"
        heading="Create New Quiz"
        path="create-new"
        delay={0.15}
    
        size={"500px"}
      />
      <HomeCard
        color="red"
        heading="My Quizes"
        path="my-quizzes"
        delay={0.25}
      
        size={"700px"}
      />
   
    </div>
  );
};