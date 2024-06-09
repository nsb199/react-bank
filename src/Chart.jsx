
import { CChart } from "@coreui/react-chartjs";


function Chart({homeValue , monthlyPayment , loanAmount , tenure}) {
  return (
   <>
     <CChart
            type="pie"
            data={{
              labels: ["Principle", "Interest"],
              datasets: [
                {
                  backgroundColor: ["rgba(13, 13, 83, 0.938)", "rgba(22, 112, 134, 0.938)"],
                  data: [homeValue, monthlyPayment * tenure * 12 - loanAmount],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "green",
                  },
                },
              },
            }}
          />
   </>
  )
}

export default Chart