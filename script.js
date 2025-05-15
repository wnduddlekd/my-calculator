// 모든 버튼 요소와 디스플레이 요소를 선택
const buttons = document.querySelectorAll("button");
const display = document.getElementsByClassName("calculator-display")[0];

// results-list에 계산 결과 출력
const resultsList = document.querySelector(".results-list");

function addResultItem() {
  const resultItem = document.createElement("div");
  resultItem.className = "result-item";
  resultItem.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
  resultsList.appendChild(resultItem);
}

// 각 버튼에 클릭 이벤트 리스너 추가
buttons.forEach((button) => {
  button.addEventListener("click", clickButton);
});

// 연산기호와 디스플레이 숫자 기억
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let resetDisplay = true;
let percentageValue = false;

// operator 연산함수
function calculate(num1, operator, num2) {
  switch (operator) {
    case "+":
      result = Number(num1) + Number(num2); // 문자열 방지
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  if (result === Infinity) {
    result = 0;
  }
}

// 버튼 클릭 시 해당 버튼의 값을 콘솔에 출력
function clickButton(event) {
  const button = event.currentTarget;
  const text = button.textContent;
  `2`;
  // number 클래스를 디스플레이에 표시
  if (button.classList.contains("number")) {
    // 디스플레이 초기값인 "0"을 지우고 디스플레이에 표시
    if (resetDisplay === true) {
      display.textContent = text;
      resetDisplay = false;
    } else {
      display.textContent += text;
    }
  }

  // 소수점을 디스플레이에 표시
  else if (button.classList.contains("dot")) {
    if (!display.textContent.includes(".")) {
      display.textContent += ".";
      resetDisplay = false; // 디스플레이 리셋 취소
    }
  }

  // 디스플레이 초기화
  else if (button.classList.contains("clear")) {
    display.textContent = "0";

    // reseting
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    resetDisplay = true;
    percentageValue = false;
  }

  // 부호 전환
  else if (button.classList.contains("toggle-sign")) {
    if (display.textContent.includes("-")) {
      display.textContent = display.textContent.slice(1);
    } else {
      display.textContent = "-" + display.textContent;
    }
  }

  // 백분율 계산
  else if (button.classList.contains("percent")) {
    if (!percentageValue) {
      display.textContent = display.textContent / 100;
      percentageValue = true;
    } else {
      display.textContent = display.textContent * 100;
      percentageValue = false;
    }
  }

  // 연산기호 클릭 시 디스플레이의 값, 연산기호 기억
  else if (button.classList.contains("operator")) {
    if (firstOperand === null || firstOperand === 0) {
      firstOperand = display.textContent;
      console.log("firstOperand:", firstOperand);

      operator = button.textContent; // 연산기호 할당, 디스플레이 리셋
      resetDisplay = true;
      console.log("operator:", operator);
    } else {
      // 연산기호를 또 누르는 경우
      secondOperand = display.textContent;
      console.log(secondOperand);

      // 0으로 나누면 에러메세지
      if (secondOperand === "0" && operator === "/") {
        alert("0으로 나눌 수 없습니다.");
        resetDisplay = true;
      } else {
        calculate(firstOperand, operator, secondOperand); // 연산
        display.textContent = result; // 출력
        addResultItem(); // 연산 내역을 list에 저장

        console.log(
          "result:",
          firstOperand,
          operator,
          secondOperand,
          "=",
          result
        );

        firstOperand = result; // 출력한 값을 첫 번째 오퍼랜드에 저장
        console.log(firstOperand);

        operator = button.textContent; // 연산기호 할당, 디스플레이 리셋
        resetDisplay = true;
        console.log(operator);
      }
    }
  }

  // result 버튼 클릭 시 결과값 디스플레이에 출력 and 초기값 reseting
  else if (button.classList.contains("result")) {
    // secondOperand에 값 할당
    secondOperand = display.textContent;
    console.log("secondOperand:", secondOperand);

    // 0으로 나누면 에러메세지
    if (secondOperand === "0" && operator === "/") {
      alert("0으로 나눌 수 없습니다.");
      resetDisplay = true;
    } else {
      calculate(firstOperand, operator, secondOperand); // 연산
      display.textContent = result; // 출력
      addResultItem(); // 연산 내역을 list에 저장

      console.log(
        "result:",
        firstOperand,
        operator,
        secondOperand,
        "=",
        result
      );

      // reseting
      firstOperand = null;
      secondOperand = null;
      operator = null;
      result = null;
      resetDisplay = true;
      percentageValue = false;
    }
  }
}

// 부동소수점, 숫자 무한추가 버그
