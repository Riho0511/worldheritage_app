import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            height: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles({
    root: {
        border: "2px solid blue",
        borderRadius: 4,
        height: 55,
        margin: 0,
    },
});


const CountryForm = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    
    
    // 国名入力
    const inputName = event => {
        let error = '';
        if (event.target.value === '') {
            error = '国名を入力してください';
            props.setErrorNameCheck(true);
        } else {
            props.setErrorNameCheck(false);
        }
        props.setErrorNameMessage(error);
        props.setName(event.target.value);
    };
    
    // 正式名称入力
    const inputOfficialName = event => {
        let error = '';
        if (event.target.value === '') {
            error = '正式名称を入力してください';
            props.setErrorOfficialNameCheck(true);
        } else {
            props.setErrorOfficialNameCheck(false);
        }
        props.setErrorOfficialNameMessage(error);
        props.setOfficialName(event.target.value);
    };
    
    // 首都入力
    const inputCapital = event => {
        let error = '';
        if (event.target.value === '') {
            error = '首都を入力してください';
            props.setErrorCapitalCheck(true);
        } else {
            props.setErrorCapitalCheck(false);
        }
        props.setErrorCapitalMessage(error);
        props.setCapital(event.target.value)
    };
    
    // 通貨を選択
    const handleCurrencies = event => {
        const val = event.target.value;
        if (val[val.length-1] === 'other') {
            return false;
        }
        
        const {target: { value }} = event;
        props.setCurrencies(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    // 新しい通貨を入力
    const inputNewCurrencies = event => {
        props.setNewCurrencies(event.target.value);
    };

    // 時差入力
    const inputTimeDifference = event => {
        let error = '';
        if (event.target.value === '') {
            error = '時差を入力してください';
            props.setErrorTimeDifferenceCheck(true);
        } else if (event.target.value < 0 || event.target.value > 24) {
            error = '0〜23の数字で入力してください';
            props.setErrorTimeDifferenceCheck(true);
        } else if (isNaN(event.target.value)) {
            error = '数字を入力してください';
            props.setErrorTimeDifferenceCheck(true);
        } else {
            props.setErrorTimeDifferenceCheck(false);
        }
        props.setErrorTimeDifferenceMessage(error);
        props.setTimeDifference(event.target.value);
    };
    
    // 飛行機時間入力
    const inputPlaneMovement = event => {
        let error = '';
        if (event.target.value === '') {
            error = '飛行機時間を入力してください';
            props.setErrorPlaneMovementCheck(true);
        } else if (event.target.value < 0) {
            error = '0以上の数字で入力してください';
            props.setErrorTimeDifferenceCheck(true);
        } else if (isNaN(event.target.value)) {
            error = '数字を入力してください';
            props.setErrorPlaneMovementCheck(true);
        } else {
            props.setErrorPlaneMovementCheck(false);
        }
        props.setErrorPlaneMovementMessage(error);
        props.setPlaneMovement(event.target.value);
    };
    
    // 州選択
    const handleState = event => {
        props.setState(event.target.value);
    };
        
        
    return (
        <>
            <div className="create_country">
                <div className="mb8">
                    <label className="required">国名</label>
                    <TextField
                        autoComplete='off'
                        autoFocus={true}
                        className={classes.root}
                        error={props.errorNameCheck}
                        fullWidth={true}
                        helperText={props.errorNameMessage}
                        onChange={inputName}
                        required={true}
                        type='text'
                        value={props.name}
                    />
                </div>
                <div className="mb8">
                    <label className="required">正式名称</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        error={props.errorOfficialNameCheck}
                        fullWidth={true}
                        helperText={props.errorOfficialNameMessage}
                        onChange={inputOfficialName}
                        required={true}
                        type='text'
                        value={props.officialName}
                    />
                </div>
                <div className="mb8">
                    <label className="required">首都</label>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        error={props.errorCapitalCheck}
                        fullWidth={true}
                        helperText={props.errorCapitalMessage}
                        onChange={inputCapital}
                        required={true}
                        type='text'
                        value={props.capital}
                    />
                </div>
                <div className="mb8">
                    <label className="required">通貨</label>
                    <FormControl sx={{ m: 0, width: 290, height: 55 }}>
                        <Select
                            className={classes.root}
                            error={props.errorCurrenciesCheck}
                            required
                            multiple
                            value={props.currencies}
                            onChange={handleCurrencies}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ color: 'rgb(255,255,255)' }}
                        >
                            {props.currenciesList.map(currency => (
                                <MenuItem key={currency.unit} value={currency.unit}>
                                    <Checkbox checked={props.currencies.indexOf(currency.unit) > -1} />
                                    <ListItemText primary={currency.unit} />
                                </MenuItem>
                            ))}
                            <MenuItem value='other' onClick={() => setChecked(!checked)} >
                                <Checkbox checked={checked} />
                                <ListItemText primary={'その他'} />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {checked &&
                    <div className="mb8">
                        <label>新たに追加する通貨</label>
                        <p className="warning">複数の通貨を追加する場合はカンマで区切る</p>
                        <TextField
                            autoComplete='off'
                            className={classes.root}
                            fullWidth={true}
                            onChange={inputNewCurrencies}
                            type='text'
                            value={props.newCurrencies}
                        />
                    </div>
                }
                <div className="mb8">
                    <label className="required">時差(時間)</label>
                    <p className="warning">数字入力</p>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        error={props.errorTimeDifferenceCheck}
                        fullWidth={true}
                        helperText={props.errorTimeDifferenceMessage}
                        onChange={inputTimeDifference}
                        required={true}
                        type='number'
                        value={props.timeDifference}
                    />
                </div>
                <div className="mb8">
                    <label className="required">飛行機時間(時間)</label>
                    <p className="warning">数字入力</p>
                    <TextField
                        autoComplete='off'
                        className={classes.root}
                        error={props.errorPlaneMovementCheck}
                        fullWidth={true}
                        helperText={props.errorPlaneMovementMessage}
                        onChange={inputPlaneMovement}
                        required={true}
                        type='number'
                        value={props.planeMovement}
                    />
                </div>
                <div className="mb8">
                    <FormControl component="fieldset" fullWidth={true}>
                        <label className="required">州</label>
                        <RadioGroup name="row-radio-buttons-group" defaultValue={props.stateId} onChange={handleState}>
                            <FormControlLabel value="1" control={<Radio size="small" />} label="アジア" />
                            <FormControlLabel value="2" control={<Radio size="small" />} label="ヨーロッパ" />
                            <FormControlLabel value="3" control={<Radio size="small" />} label="アフリカ" />
                            <FormControlLabel value="4" control={<Radio size="small" />} label="北アメリカ" />
                            <FormControlLabel value="5" control={<Radio size="small" />} label="南アメリカ" />
                            <FormControlLabel value="6" control={<Radio size="small" />} label="オセアニア" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    );
};

export default CountryForm;