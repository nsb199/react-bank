import { useState , useEffect } from "react";

import Chart from "./Chart";
import OptionSelect from "./OptionSelect";

function Bank() {
  const [homeValue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(5);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {

    const newDownPayment = Math.floor(homeValue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homeValue - newDownPayment);
  }, [homeValue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);


  return (
    <>
      <div className="container">
        <div className="left-container">
          <div className="content">
            <p>Home Value</p>
            <p>{homeValue} $</p>
            <input
              type="range"
              step={100}
              min={1000}
              max={10000}
              value={homeValue}
              onChange={(e) => {
                setHomeValue(e.target.value);
              }}
            />
            <div className="change">
              <p>$1000</p>
              <p>$10000</p>
            </div>
          </div>

          <div className="content">
            <p>Down Payment</p>
            <p>{homeValue - loanAmount} $</p>
            <input
              onChange={(e) => {
                setDownPayment(parseInt(e.currentTarget.value));
                setLoanAmount(homeValue - parseInt(e.currentTarget.value));
              }}
              type="range"
              min="0"
              max={homeValue}
              value={downPayment}
            />
            <div className="change">
              <p>${0}</p>
              <p>${homeValue}</p>
            </div>
          </div>

          <div className="content">
            <p>Loan Amount</p>
            <p>{homeValue - downPayment} $</p>
            <input
              onChange={(e) => {
                setLoanAmount(parseInt(e.currentTarget.value));
                setDownPayment(homeValue - parseInt(e.currentTarget.value));
              }}
              type="range"
              min="0"
              max={homeValue}
              value={loanAmount}
            />
            <div className="change">
            <p>${0}</p>
            <p>${homeValue}</p>
            </div>
          </div>

          <div className="content">
            <p>Interest Rate</p>
            <p>% {interestRate}</p>
            <input
              onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
              type="range"
              min={2}
              max={18}
             value={interestRate}
            />
            <div className="change">
              <p>2%</p>
              <p>18%</p>
            </div>
          </div>

          <OptionSelect
            tenure={tenure}
            setTenure={setTenure}
          />
        </div>

        <div className="right-container">
          <h3 className="heads">Monthly Payment: $ {monthlyPayment.toFixed(2)}</h3>
          <Chart homeValue={homeValue} monthlyPayment={monthlyPayment} loanAmount={loanAmount} tenure={tenure}/>
        </div>
      </div>
    </>
  );
}

export default Bank;
