import { IPizza } from '../../types/pizza';
import { TableRow } from '../TableRow';
import './styles.css';

interface IProps {
  pizzasList: IPizza[];
  onPizzaDelete(id: number): void;
}

export const PizzasList = ({ pizzasList, onPizzaDelete }: IProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Размер</th>
          <th>Калорийность</th>
          <th>Ингредиенты</th>
        </tr>
      </thead>
      <tbody>
        {pizzasList.map((pizza) => <TableRow onPizzaDelete={onPizzaDelete} key={pizza.id} pizza={pizza} />)}
      </tbody>
    </table>
  )
};
