import { ButtonWrapper } from './ButtonStyled';

interface Props {
  onHandleClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
  title?: string;
  icon?: string;
  classBtn?: string;
  background?: string;
  className?: string;
}

const Button = ({
  onHandleClick,
  icon = 'add',
  classBtn = 'add',
  background = '',
}: Props) => {
  return (
    <ButtonWrapper>
      <button
        type="button"
        className={`${classBtn} btnCommon`}
        onClick={onHandleClick}
      >
        <span className={`material-icons-outlined icon ${background}Icon`}>
          {icon}
        </span>
      </button>
    </ButtonWrapper>
  );
};
export default Button;
