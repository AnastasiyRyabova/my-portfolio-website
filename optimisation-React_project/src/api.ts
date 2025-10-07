const API_URL = "http://localhost:3000";

export interface ITeam {
  name: string;
  position: string;
  image: string;
}
export interface IData {
  profit: number[];
  team: ITeam[];
}

export interface IBestEmployees {
  id: string;
  name: string;
  position: string;
  image: string;
}

export const fetchData = (): Promise<IData> =>
    fetch(`${API_URL}/data`).then((res) => res.json());

export const fetchBestEmployeesData = (id: number): Promise<IBestEmployees> =>
    fetch(`${API_URL}/bestEmployees/${id}`).then((res) => res.json());
