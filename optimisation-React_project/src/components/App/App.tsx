import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchBestEmployeesData, fetchData, IData } from "../../api.ts";
import { BestEmployees } from "../BestEmployees/BestEmployees.tsx";
import { Team } from "../Team/Team.tsx";
import "./styles.css";

function App() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<IData>();

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const { profit = [], team = [] } = data || {};

  const profitSum = useMemo(() => {
    return month * profit.reduce((acc, i) => acc + i, 0);
  }, [month, profit]);

  const date = useMemo(() => `${month}/${year}`, [month, year]);

  const getApi = useCallback(() => fetchBestEmployeesData(year), [year]);

  const onIncMonth = useCallback(() => {
    setMonth((count) => (count === 12 ? 1 : count + 1));
  }, []);

  const onDecYear = useCallback(() => {
    setYear((count) => (count === 2018 ? 2018 : count - 1));
  }, []);

  return (
    <div>
      <h1>App</h1>
      <div className="buttons">
        <button onClick={onIncMonth}>month is {month}</button>
        <button onClick={onDecYear}>year is {year}</button>
      </div>
      <div className="block">
        <p>Date is: {date}</p>
        <p>Profit sum is: {profitSum} $</p>
      </div>
      <BestEmployees getApi={getApi} />
      <Team team={team} />
    </div>
  );
}

export default App;
