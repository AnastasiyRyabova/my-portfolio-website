import { ChangeEvent, FormEvent } from "react";
import { DOUGHS, INGREDIENTS, SIZES } from "../../constants";
import { TDough, TSize } from "../../types/pizza";

import './styles.css';

interface IProps {
  name: string;
  size: TSize;
  dough: TDough;
  ingredientsIds: string[];
  disabled: boolean;
  handleNameChange(event: ChangeEvent<HTMLInputElement>): void;
  handleSize(event: ChangeEvent<HTMLSelectElement>): void;
  handleDough(event: ChangeEvent<HTMLSelectElement>): void;
  handleIngredients(event: ChangeEvent<HTMLSelectElement>): void;
  onCreate(event: FormEvent<HTMLFormElement>): void;
}

export const CreateForm = ({
  name,
  size,
  dough,
  disabled,
  ingredientsIds,
  handleDough,
  handleIngredients,
  handleNameChange,
  handleSize,
  onCreate,
}: IProps) => {
  return (
    <form onSubmit={onCreate}>
      <div className="form-line">
        <label>
          Название:
          <input data-testid="NameInput" onChange={handleNameChange} value={name} type="text" />
        </label>
        
      </div>

      <div className="form-line">
        <label>
          Тесто:
          <select onChange={handleDough} value={dough}>
            {
              DOUGHS.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))
            }
          </select>
        </label>
      </div>

      <div className="form-line">
        <label>
          Размер:
          <select onChange={handleSize} value={size}>
            {
              SIZES.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))
            }
          </select>
        </label>
      </div>

      <div className="form-line">
        <label>
          Ингредиенты:
          <select onChange={handleIngredients} multiple value={ingredientsIds}>
            {
              INGREDIENTS.map((ingredient, idx) => (
                <option key={idx} value={ingredient.id}>{`${ingredient.name} (ккал ${ingredient.kcal})`}</option>
              ))
            }
          </select>
        </label>
      </div>

      <div className="form-line">
        <button data-testid="CreateButton" type="submit" className="create-button">Создать</button>
      </div>
    </form>  
  )
};
