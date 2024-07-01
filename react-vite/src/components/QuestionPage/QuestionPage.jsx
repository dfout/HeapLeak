import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";

const Questions = () => {
  const dispatch = useDispatch();

  return (

<div className="create-question-container">
    <div className="main-question">
        <h1 className="question">question</h1>
        <div className="dates">Date Modified</div>
        <div className="body">
            <p>
                Description
            </p>
        </div>
        <div className="tags">
            <p>Tags</p>
        </div>
    </div>
    <div className="answers-container">
        <h2>
             2 Answers
        </h2>
        <div className="answer-tile">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, at similique. Rerum eligendi hic voluptas doloribus impedit minus mollitia eos ex consectetur! Iusto adipisci id eos quam? Quos dolorum rem a qui.</p>
                <div id="user-info">
                    <span>answered on July 1</span>
                    <span>username</span>
                </div>
         </div>
         <div className="answer-tile">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nobis deserunt debitis, similique nihil ea, nulla autem, aliquam neque rem obcaecati officiis voluptatum consequatur sapiente asperiores error!</p>
            <div id="user-info">
                <span>answered on July 1</span>
                <span>username</span>
            </div>
        </div>
        <div className="write-answer">
            <h3>Your Answer</h3>
            <textarea name="Answer" className="texts" id="" rows="10" cols="60"   ></textarea>
            <div className="submit-btn">
                <button className="submit">Submit</button>
            </div>
        </div>
    </div>
</div>


  );
};

export default Questions;
