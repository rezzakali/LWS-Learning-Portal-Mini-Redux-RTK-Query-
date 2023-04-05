import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuizAnswer } from '../../features/student/quiz/quizSlice';

function QuizForm({ quiz, index }) {
  const { question, options, id } = quiz;
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
    const form = e.target.parentElement.parentElement;

    let formArr = [];
    for (let i = 0; i < form.elements.length; i++) {
      formArr.push({ [form.elements[i].name]: form.elements[i].checked });
    }
    const result = formArr.reduce((prevEl, currectEl) => {
      const key = Object.keys(currectEl)[0];
      return { ...prevEl, [key]: currectEl[key] };
    }, {});

    const getMyOption = options.map((option) => ({
      ['option' + option.id + '_' + 'q' + quiz.id]: option.isCorrect,
    }));

    const reducedResult = getMyOption.reduce((prevOption, curOption) => {
      const myKey = Object.keys(curOption)[0];
      return { ...prevOption, [myKey]: curOption[myKey] };
    }, {});

    function objectsEqual(obj1, obj2) {
      const obj1Keys = Object.keys(obj1);
      const obj2Keys = Object.keys(obj2);

      if (obj1Keys.length !== obj2Keys.length) {
        return false;
      }

      for (let i = 0; i < obj1Keys.length; i++) {
        const key = obj1Keys[i];

        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }

      return true;
    }

    // console.log(objectsEqual(result, reducedResult));

    dispatch(
      addQuizAnswer({
        id,
        [`quiz${id}`]: objectsEqual(result, reducedResult),
      })
    );
  };

  return (
    <React.Fragment>
      <h2>
        Quiz - {index} {question}
      </h2>
      <form className="quizOptions">
        {options.map((option) => (
          <label key={option.id}>
            <input
              type="checkbox"
              id={`option${option.id}_q${index}`}
              name={`option${option.id}_q${index}`}
              onChange={handleChange}
              value={input}
            />
            {option.option}
          </label>
        ))}
      </form>
    </React.Fragment>
  );
}

export default QuizForm;
