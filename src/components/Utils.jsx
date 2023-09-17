import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import '../styles/Utils.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


 export const SelectMod = ({ options, title,onChange,ide }) => {
  const [selectValue, setSelectValue] = useState(title);

  const handleChange = (e) => {
    setSelectValue(e.currentTarget.textContent);
    // eslint-disable-next-line
    const output = onChange(e.currentTarget.textContent);
    const id = document.getElementById(`optionCont${ide}`);
    const icon = document.getElementById(`expandIcon${ide}`);
    icon.classList.toggle("rotate");
    id.classList.toggle("expanded");
  }
  const handleSelect = () => {
    const id = document.getElementById(`optionCont${ide}`);
    const icon = document.getElementById(`expandIcon${ide}`);
    icon.classList.toggle("rotate");
    id.classList.toggle("expanded");
  }
  const handleClickAway = ()=>{
    const id = document.getElementById(`optionCont${ide}`);
    const icon = document.getElementById(`expandIcon${ide}`);
    icon.classList.remove("rotate");
    id.classList.remove("expanded");
  }


  return (
      <ClickAwayListener onClickAway={handleClickAway}>
    <div style={{ position: "relative" }}>
      <div className='selectCont' onClick={handleSelect}>{selectValue} <div className='expandIcon' id={`expandIcon${ide}`}><ExpandMoreIcon /></div> </div>
      <div className='optionCont' id={`optionCont${ide}`} >
        {options?.map((item, key) => (
          <div className='option' id={key} value={item} onClick={handleChange}>{item}</div>
          ))
        }
      </div>
      
    </div>
        </ClickAwayListener>
  )
}

