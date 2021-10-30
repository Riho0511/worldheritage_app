import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const CurrenciesList = (props) => {
    
    // チェックボックスの切り替え
    const handleToggle = (value) => () => {
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else { 
            newChecked.splice(currentIndex, 1);
        }

        props.setChecked(newChecked);
    };
    
    
    return (
        <List component={Paper} elevation={3}>
            {props.currenciesList.map((currency, index) => {
                return (
                    <div key={currency.id}>
                        <ListItem>
                            <ListItemButton onClick={handleToggle(currency)} dense>
                                <ListItemText primary={`${index+1}. ${currency.unit}`} />
                                <ListItemIcon>
                                    <Checkbox 
                                        checked={props.checked.indexOf(currency) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        {props.currenciesList.length-1 !== index &&
                            <Divider />
                        }
                    </div>
                );
            })}
        </List>
    );
};

export default CurrenciesList;