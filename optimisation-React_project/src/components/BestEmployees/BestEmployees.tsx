import React, { useEffect, useState } from "react";
import { IBestEmployees } from "../../api.ts";
import "./styles.css";

interface IBestEmployeesData {
  getApi: () => Promise<IBestEmployees>;
}

interface EmployeeProps {
  employee: IBestEmployees;
}

const Employee = React.memo(({ employee }: EmployeeProps) => {
  return (
    <>
      <h2>Best employee of the year</h2>
      <img src={employee.image} width={400} height={400} alt={employee.name} />
      <p>
        {employee.name}: {employee.position}
      </p>
    </>
  );
});

export const BestEmployees = React.memo(({ getApi }: IBestEmployeesData) => {
  const [employee, setEmployee] = useState<IBestEmployees | null>(null);

  useEffect(() => {
    let mounted = true;
    getApi().then((res) => {
      if (mounted) setEmployee(res);
    });
    return () => {
      mounted = false;
    };
  }, [getApi]);

  if (!employee) return null;

  return <div className="container"><Employee employee={employee} /></div>;
});
