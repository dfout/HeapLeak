import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionPage.css";

const Questions = () => {
  const dispatch = useDispatch();

  return (

<div class="container">
    <div class="main-question">
        <h1 class="question">question</h1>
        <div class="dates">Date Modified</div>
        <div class="body">
            <p>
                Description
            </p>
        </div>
        <div class="tags">
            <p>Tags</p>
        </div>
    </div>
    <div class="answers-container">
        <h2>
             2 Answers
        </h2>
        <div class="answer-tile">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, at similique. Rerum eligendi hic voluptas doloribus impedit minus mollitia eos ex consectetur! Iusto adipisci id eos quam? Quos dolorum rem a qui.</p>
                <div id="user-info">
                    <span>answered on July 1</span>
                    <span>username</span>
                </div>
         </div>
         <div class="answer-tile">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nobis deserunt debitis, similique nihil ea, nulla autem, aliquam neque rem obcaecati officiis voluptatum consequatur sapiente asperiores error!</p>
            <div id="user-info">
                <span>answered on July 1</span>
                <span>username</span>
            </div>
        </div>
        <div class="write-answer">
            <h3>Your Answer</h3>
            <textarea name="Answer" class="texts" id="" rows="10" cols="60"   ></textarea>
            <div class="submit-btn">
                <button class="submit">Submit</button>
            </div>
        </div>
    </div>
</div>


  );
};

export default Questions;