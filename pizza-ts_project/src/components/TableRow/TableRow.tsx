import { IPizza } from '../../types/pizza';
import { formatName } from '../../utils/formatName';

import './styles.css';

interface IProps {
  pizza: IPizza;
  onPizzaDelete(id: number): void;
}

export const TableRow = ({ pizza, onPizzaDelete }: IProps) => {
  const onDelete = () => {
    onPizzaDelete(pizza.id);
  }
  return (
    <tr key={pizza.id} className="list-item">
      <td>
        {formatName(pizza.name)}
      </td>
      <td>
        {pizza.size}
      </td>
      <td data-testid="TotalKcal">
        {pizza.ingredients.reduce((acc, item) => acc + item.kcal, 0)}
      </td>
      <td>
        <ul>
          {pizza.ingredients.map((item) => (
            <li key={item.id}>{`${item.name} (ккал ${item.kcal})`}</li>
          ))}
        </ul>
      </td>
      <td onClick={onDelete} className='delete-button'>X</td>
    </tr>
  )
};
